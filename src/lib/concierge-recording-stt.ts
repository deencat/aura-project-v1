/**
 * Client-side re-encode for concierge STT uploads.
 * Mistral / Voxtral accepts mp3 or wav only. Prefer MP3 (smaller over the wire); fall back to WAV if encoding fails.
 */

function writeString(view: DataView, offset: number, s: string) {
  for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i))
}

function floatTo16BitPCM(samples: Float32Array): Int16Array {
  const out = new Int16Array(samples.length)
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    out[i] = s < 0 ? Math.round(s * 0x8000) : Math.round(s * 0x7fff)
  }
  return out
}

function pcm16MonoWavBuffer(samples: Float32Array, sampleRate: number): ArrayBuffer {
  const pcm = floatTo16BitPCM(samples)
  const numChannels = 1
  const bitsPerSample = 16
  const blockAlign = (numChannels * bitsPerSample) / 8
  const byteRate = sampleRate * blockAlign
  const dataSize = pcm.byteLength
  const buffer = new ArrayBuffer(44 + dataSize)
  const view = new DataView(buffer)
  writeString(view, 0, "RIFF")
  view.setUint32(4, 36 + dataSize, true)
  writeString(view, 8, "WAVE")
  writeString(view, 12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)
  writeString(view, 36, "data")
  view.setUint32(40, dataSize, true)
  new Uint8Array(buffer, 44).set(new Uint8Array(pcm.buffer, pcm.byteOffset, pcm.byteLength))
  return buffer
}

async function decodeResampleTo16kMonoFloat(input: Blob): Promise<Float32Array> {
  const arrayBuffer = await input.arrayBuffer()
  const ctx = new AudioContext()
  let audioBuffer: AudioBuffer
  try {
    if (ctx.state === "suspended") await ctx.resume()
    audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0))
  } finally {
    void ctx.close()
  }

  const targetRate = 16_000
  const length = Math.max(1, Math.ceil(audioBuffer.duration * targetRate))
  const offline = new OfflineAudioContext(1, length, targetRate)
  const srcCopy = offline.createBuffer(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  )
  for (let c = 0; c < audioBuffer.numberOfChannels; c++) {
    srcCopy.copyToChannel(audioBuffer.getChannelData(c), c)
  }
  const source = offline.createBufferSource()
  source.buffer = srcCopy
  source.connect(offline.destination)
  source.start(0)
  const rendered = await offline.startRendering()
  return rendered.getChannelData(0)
}

/** 16 kHz mono speech: 64 kbps MP3 is a good size/quality tradeoff. */
const STT_MP3_KBPS = 64
const LAME_CHUNK = 1152

async function int16MonoToMp3Blob(pcm: Int16Array, sampleRate: number): Promise<Blob> {
  const { Mp3Encoder } = await import("lamejs")
  const enc = new Mp3Encoder(1, sampleRate, STT_MP3_KBPS)
  const chunks: Uint8Array[] = []
  for (let i = 0; i < pcm.length; i += LAME_CHUNK) {
    const block = pcm.subarray(i, Math.min(i + LAME_CHUNK, pcm.length))
    const mp3buf = enc.encodeBuffer(block)
    if (mp3buf.length > 0) chunks.push(new Uint8Array(mp3buf))
  }
  const end = enc.flush()
  if (end.length > 0) chunks.push(new Uint8Array(end))
  return new Blob(chunks, { type: "audio/mpeg" })
}

/**
 * Decode + resample, then MP3 if possible, else WAV (still Mistral-compatible).
 */
export async function encodeRecordingBlobForSttUpload(input: Blob): Promise<{ blob: Blob; filename: string }> {
  const samples = await decodeResampleTo16kMonoFloat(input)
  const pcm = floatTo16BitPCM(samples)
  try {
    const mp3 = await int16MonoToMp3Blob(pcm, 16_000)
    if (mp3.size < 32) throw new Error("empty_mp3")
    return { blob: mp3, filename: "recording.mp3" }
  } catch {
    return {
      blob: new Blob([pcm16MonoWavBuffer(samples, 16_000)], { type: "audio/wav" }),
      filename: "recording.wav",
    }
  }
}
