#!/usr/bin/env bash
# Run WHILE dev:https:local:3003 (or your port) is up. Diagnoses why iPhone might not load.
set -uo pipefail
PORT="${1:-3003}"
IP="${2:-192.168.0.139}"

echo "=== 1) TLS cert files (need both) ==="
for f in certificates/dev-key.pem certificates/dev-cert.pem; do
  if [[ -f "$f" ]]; then echo "OK $f"; else echo "MISSING $f — run: npm run gen:dev-tls-certs -- $IP"; fi
done

echo ""
echo "=== 2) Something listening on :$PORT? ==="
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null | grep -q .; then
  lsof -nP -iTCP:"$PORT" -sTCP:LISTEN
else
  echo "NOTHING listening on $PORT — start HTTPS dev on that port (e.g. npm run dev:https:local:3003 for 3003)."
fi

echo ""
echo "=== 3) HTTPS from this Mac (ignore cert; should see HTTP headers) ==="
if curl -skI --max-time 5 "https://127.0.0.1:${PORT}/concierge" 2>/dev/null | head -8 | grep -q .; then
  echo "--- https://127.0.0.1:${PORT}/concierge ---"
  curl -skI --max-time 5 "https://127.0.0.1:${PORT}/concierge" | head -8
else
  echo "FAIL: no TLS response on loopback. You may be running HTTP-only dev (npm run dev:lan:3003) while Safari uses https://."
fi

echo ""
echo "--- https://${IP}:${PORT}/concierge (same Wi-Fi as this Mac) ---"
curl -skI --max-time 5 "https://${IP}:${PORT}/concierge" | head -8 || echo "FAIL via LAN IP (firewall or wrong IP)."

echo ""
echo "=== 4) iPhone tips ==="
echo "- URL must be exactly: https://${IP}:${PORT}/concierge (no trailing space)."
echo "- Server must be: npm run dev:https:local:3003 (not dev:lan:3003) when using https:// in Safari."
echo "- If curl works here but iPhone fails: check Mac Firewall (allow Node), router 'AP/client isolation', same Wi-Fi."
echo "- Easiest: npm run dev:lan:${PORT} + npm run tunnel:cloudflare:${PORT} and open the trycloudflare.com URL."
