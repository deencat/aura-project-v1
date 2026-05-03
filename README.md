# Aura Project (aura-project-v1)

Hong Kong–oriented **tech-forward beauty** marketing site built with **Next.js** (App Router), **Clerk**, **Tailwind**, and **shadcn/ui**. Includes treatment pages, blog, admin CMS-style screens, and Playwright tests.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` and set Clerk (and any other) keys. Do not commit `.env` or `.env.local`.

### Tests (Playwright)

With the dev server running, execute `npx playwright test`. The default `baseURL` is `http://localhost:3000`; if you use another port (e.g. `npm run dev:lan:3003`), set **`PLAYWRIGHT_BASE_URL`** (for example `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3003 npx playwright test`). Smoke tests: `tests/concierge.spec.ts`, `tests/trends.spec.ts` (public `/trends`).

## Deploy to VPS later (Hostinger / Ubuntu) — checklist

This project works fine on a generic Linux VPS. The minimum production pieces are:
- Node.js (LTS)
- Postgres (managed or self-hosted)
- Environment variables (Clerk + DB + OpenRouter, plus concierge ops vars)
- Running Prisma migrations during deploy

### Dependency manifest (Node.js, not Python)

- There is **no** `requirements.txt` (that file is for Python). All app libraries are declared in **`package.json`** and pinned in **`package-lock.json`**.
- On the VPS, install **Node.js LTS** and **npm**, clone the repo, then run **`npm ci`** (recommended for production) or **`npm install`** — that installs every dependency the app needs, including **`lamejs`** (client-side MP3 encoding for mic uploads).
- You do **not** need to install the system **`lame`** CLI, **ffmpeg**, or similar for concierge **Voice-1** STT: encoding happens in the browser; the server only forwards audio to OpenRouter.
- **`cloudflared`** is optional and only for **local** iPhone HTTPS tunneling (`npm run iphone:tunnel`); production VPS traffic uses your real domain + TLS as usual.

### 1) Set environment variables

Use `.env.local.example` as the source of truth. On VPS, configure env vars via your process manager (systemd / pm2 / Docker), not by committing `.env`.

**Public trend summaries (KB-3):** `/trends` lists AI-generated rollups from the Knowledge Bank (same data as concierge “trends” context). Detail: `/trends/<rollupId>`.

Concierge ops (recommended):
- `CONCIERGE_RATE_LIMIT_WINDOW_SECONDS`
- `CONCIERGE_RATE_LIMIT_MAX`
- `CONCIERGE_RATE_LIMIT_USER_MAX`
- `CONCIERGE_LOG_HASH_SALT` (**required** for stable hashed IP logging)
- `CONCIERGE_RETENTION_DAYS` (recommended: `180`)
- `CONCIERGE_RETENTION_SECRET` (**required** to run retention cleanup)

### 2) Install dependencies and build

```bash
npm ci
npm run build
```

### 3) Database migrations (required on deploy)

Run migrations against your VPS/managed Postgres:

```bash
npx prisma migrate deploy
```

### 4) Start the app

```bash
npm run start
```

## Ops: concierge retention cleanup (scheduled)

Chat history and concierge request events are retained for `CONCIERGE_RETENTION_DAYS` (default **180** in `.env.local.example`) and can be cleaned up by calling:

- `GET` or `POST /api/concierge/retention/run?token=...` (or header `x-internal-token: ...`)

Auth options:

- **Vercel Cron:** set `CRON_SECRET` on the project; Vercel sends `Authorization: Bearer <CRON_SECRET>` (see `vercel.json` — weekly schedule on this repo).
- **Token:** `CONCIERGE_RETENTION_SECRET` (or legacy `INTERNAL_CRON_SECRET`) must match `?token=` / `x-internal-token`.

### Hostinger VPS cron example (weekly or daily)

Set `CONCIERGE_RETENTION_SECRET` in your server environment, then configure a cron job that calls your production domain.

Example:

```bash
15 4 * * 0 curl -fsS -X POST "https://YOUR_DOMAIN/api/concierge/retention/run?token=$CONCIERGE_RETENTION_SECRET" >/dev/null 2>&1
```

**Admin (signed in):** open `/admin/concierge` and use **立即執行 retention 清理** — calls `POST /api/admin/concierge/retention/run` (same DB logic as the cron endpoint; no token in the browser).

Notes:
- The endpoint returns `401` if the token is missing/wrong.
- The endpoint deletes old:
  - `ConciergeMessage` (by `createdAt`)
  - `ConciergeThread` (by `updatedAt`)
  - `ConciergeRequestEvent` (by `createdAt`)
  - old `RateLimitCounter` rows (keeps only a few days for debugging)
- Keep the token secret. Prefer passing it via an env var on the server (as above).

## Ops: Knowledge Bank (KB-1) RSS ingestion (scheduled)

Raw HK beauty “news/trends” sources should ingest into **Tier `T3` + Status `staging`** only (no auto-publish). Trigger ingestion by calling:

- `POST /api/knowledge/ingest/run?token=...`

Set `KB_INGEST_CRON_SECRET` in your server environment.

### Run manually (admin)

If you are signed in (Clerk) and have access to `/admin/knowledge`, you can trigger ingestion without exposing the cron secret:

- `POST /api/knowledge/ingest/admin/run`

## Ops: Knowledge Bank (KB-1) HTML ingestion (scheduled)

For HK beauty sites that don’t publish RSS feeds (she.com / ELLE HK / Cosmo HK / U Beauty / TopBeauty), trigger HTML ingestion by calling:

- `POST /api/knowledge/ingest/html/run?token=...`

Or run manually when signed in:

- `POST /api/knowledge/ingest/html/admin/run`

### Promotion / approval (governance)

Ingestion writes **Tier `T3` + Status `staging`**. To publish anything from staging, use the admin UI (`/admin/knowledge`) or call:

- Activate staged doc: `POST /api/knowledge/documents/:id/promote/activate`
- Approve raw T3 doc into curated T2: `POST /api/knowledge/documents/:id/promote/approve-t3-to-t2`

### Hostinger VPS cron example (daily)

```bash
20 3 * * * curl -fsS -X POST "https://YOUR_DOMAIN/api/knowledge/ingest/run?token=$KB_INGEST_CRON_SECRET" >/dev/null 2>&1
```

## Ops: Knowledge Bank (KB-3) rollup generation (scheduled)

Trend rollups summarize recent **active** T2/T3 documents (same logic as `/admin/trends` → `POST /api/knowledge/rollups/generate`). For production automation:

- `GET` or `POST /api/knowledge/rollups/cron/run`
- **Vercel:** add `CRON_SECRET` to the project (matches `vercel.json` daily schedule) **or** call with `?token=` equal to `KB_ROLLUP_CRON_SECRET` or `KB_INGEST_CRON_SECRET`.
- Optional: `KB_ROLLUP_TOPICS_JSON` — JSON array of `{ "topic", "language?", "days?" }` (max 12). If unset, a default `zh-HK` topic is used.

## Concierge: voice & TTS

- Set `NEXT_PUBLIC_CONCIERGE_VOICE_UI=true` (default in `.env.local.example`) to show **mic** + **朗讀** on `/concierge` and the floating widget.
- **Voice-0:** Web Speech API where the browser supports it (e.g. desktop Chrome).
- **Voice-1 (iPhone / Safari):** the mic **records** audio; on stop, audio is sent to `POST /api/concierge/transcribe`. With **`OPENROUTER_API_KEY`** only, STT uses OpenRouter **chat completions** + **`mistralai/voxtral-small-24b-2507`** ([audio input](https://openrouter.ai/docs/guides/overview/multimodal/audio)) — not the OpenAI-only Whisper STT catalog. Optional **`OPENAI_API_KEY`** still uses direct Whisper. Safari needs **HTTPS** (or a tunnel). While developing:
  - **LAN HTTPS:** `npm run gen:dev-tls-certs -- YOUR_LAN_IP` then e.g. `npm run dev:https:local` (port **3000**) or **`npm run dev:https:local:3003`** if you normally use **`npm run dev:lan:3003`**. On the phone the URL must use the **same port**: `https://YOUR_LAN_IP:3003/concierge`. This is **not** tunneling—same Wi‑Fi and firewall rules apply.
  - **Tunnel (recommended for iPhone):** `https://192.168.x.x:3003` + self-signed certs is often **blocked by Safari**. Use: Terminal 1 **`npm run dev:lan:3003`**, Terminal 2 **`npm run iphone:tunnel`** (needs [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/)). Open **`https://…trycloudflare.com/concierge`** from the tunnel output—not the LAN IP.

## Documentation

- **Strategic / Hermes Agent revamp:** [.documentation/Hermes-Agent-Integration-and-Revamp-Plan.md](.documentation/Hermes-Agent-Integration-and-Revamp-Plan.md)
- **Project management & task history:** [.documentation/Project Management Plan.md](.documentation/Project%20Management%20Plan.md)
- **Product:** [.documentation/Aura-Project - Product Requirements Document.md](.documentation/Aura-Project%20-%20Product%20Requirements%20Document.md)

## Memory MCP (developer tooling)

The memory server runs on port **3100** and stores project context in `memory.json`. See scripts in `package.json` (`memory-stub`, `memory-init`, etc.) and the **Memory Architecture** section in the Project Management Plan.

## Git milestone

Baseline before the Beauty × Tech / concierge revamp is tagged **`pre-revamp`** on GitHub.

## License / private

Repository visibility and license follow your GitHub org settings.
