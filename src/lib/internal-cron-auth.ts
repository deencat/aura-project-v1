/**
 * Vercel Cron sends `Authorization: Bearer <CRON_SECRET>` when `CRON_SECRET` is set on the project.
 * External schedulers can call the same paths with `?token=` or `x-internal-cron-token` matching a shared secret.
 */
export function isInternalCronAuthorized(request: Request, tokenSecretCandidates: string[]): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim()
  if (cronSecret) {
    const auth = request.headers.get("authorization")?.trim()
    if (auth === `Bearer ${cronSecret}`) return true
  }

  const url = new URL(request.url)
  const token =
    url.searchParams.get("token")?.trim() ||
    request.headers.get("x-internal-cron-token")?.trim() ||
    ""

  if (!token) return false
  return tokenSecretCandidates.some((s) => {
    const t = s?.trim()
    return Boolean(t) && token === t
  })
}
