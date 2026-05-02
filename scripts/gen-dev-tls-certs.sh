#!/usr/bin/env bash
# Generate self-signed TLS files for local HTTPS without mkcert / without sudo.
# Usage:
#   npm run gen:dev-tls-certs -- 192.168.0.139
# Then:
#   npm run dev:https:local
set -euo pipefail

LAN_IP="${1:-127.0.0.1}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CERT_DIR="${ROOT}/certificates"
mkdir -p "${CERT_DIR}"

CONF="$(mktemp)"
cleanup() { rm -f "${CONF}"; }
trap cleanup EXIT

cat > "${CONF}" <<EOF
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = aura-dev-local

[v3_req]
subjectAltName = @alt_names

[alt_names]
IP.1 = ${LAN_IP}
IP.2 = 127.0.0.1
DNS.1 = localhost
EOF

openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout "${CERT_DIR}/dev-key.pem" \
  -out "${CERT_DIR}/dev-cert.pem" \
  -days 825 \
  -config "${CONF}"

echo "OK: ${CERT_DIR}/dev-key.pem and dev-cert.pem (SAN: ${LAN_IP}, 127.0.0.1, localhost)"
echo "Run: npm run dev:https:local       (HTTPS on :3000)"
echo "     npm run dev:https:local:3003   (HTTPS on :3003 — same port as dev:lan:3003)"
echo "     npm run dev:https:local:3443   if 3000 is busy"
echo "On your phone use the SAME port, e.g. https://${LAN_IP}:3003/concierge (accept cert warning)."
