/**
 * Re-encode recorded blobs (e.g. iOS AAC-in-MP4) to 16-bit PCM WAV at 16 kHz mono.
 * Mistral / Voxtral via OpenRouter rejects non-mp3/wav containers; Whisper still accepts WAV.
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

/**
 * Decode browser recording, resample to 16 kHz mono, return WAV blob.
 */
export async function encodeRecordingBlobAsWav16kMono(input: Blob): Promise<Blob> {
  const arrayBuffer = await input.arrayBuffer()
  const ctx = new AudioContext()
  let audioBuffer: AudioBuffer
  try {
    if (ctx.state === "suspended") await ctx.resume()
    const copy = arrayBuffer.slice(0)
    audioBuffer = await ctx.decodeAudioData(copy)
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
  const samples = rendered.getChannelData(0)

  return new Blob([pcm16MonoWavBuffer(samples, targetRate)], { type: "audio/wav" })
}
