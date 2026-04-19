# Aura Project (aura-project-v1)

Hong Kong–oriented **tech-forward beauty** marketing site built with **Next.js** (App Router), **Clerk**, **Tailwind**, and **shadcn/ui**. Includes treatment pages, blog, admin CMS-style screens, and Playwright tests.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.local.example` to `.env.local` and set Clerk (and any other) keys. Do not commit `.env` or `.env.local`.

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
