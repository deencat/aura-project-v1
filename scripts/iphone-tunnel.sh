#!/usr/bin/env bash
# Reliable HTTPS URL for iPhone testing (no LAN IP / self-signed TLS).
# Usage:
#   Terminal 1:  npm run dev:lan:3003
#   Terminal 2:  npm run iphone:tunnel
# Then open the printed https://*.trycloudflare.com/concierge on the phone.
set -uo pipefail

PORT="${1:-3003}"

echo ""
echo "============================================================"
echo "  iPhone / Safari — use Cloudflare Quick Tunnel (HTTPS)"
echo "============================================================"
echo ""
echo "  1) In ANOTHER terminal, keep this running:"
echo "       npm run dev:lan:${PORT}"
echo ""
echo "  2) Wait until you see a line like:"
echo "       https://something-random.trycloudflare.com"
echo ""
echo "  3) On iPhone Safari open:"
echo "       https://THAT-HOST/concierge"
echo ""
echo "  4) If the page loads but Clerk/sign-in breaks: Clerk Dashboard →"
echo "     configure allowed origins for your tunnel host (URL changes each run)."
echo ""
echo "  (LAN https://192.168.x.x:3003 often fails on iOS — use this tunnel.)"
echo "------------------------------------------------------------"
echo ""

if ! command -v cloudflared >/dev/null 2>&1; then
  echo "cloudflared is not installed. On Mac:"
  echo "  brew install cloudflare/cloudflare/cloudflared"
  echo ""
  exit 1
fi

exec cloudflared tunnel --url "http://127.0.0.1:${PORT}"
