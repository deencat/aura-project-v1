# Information architecture & redirects (living)

**Purpose:** Track overlapping routes (e.g. `/treatments/new-doublo` vs `/new-doublo`) and planned `next.config.js` redirects. **Do not add permanent redirects** until product confirms the canonical URL for each treatment hub.

**Status:** Audit pending — no automatic redirects committed yet (avoid breaking intentional dual entry points).

| Topic | Paths involved | Notes |
|-------|----------------|--------|
| New Doublo hub | `/treatments/new-doublo`, `/new-doublo` | Different page implementations; pick one canonical before 308 redirect |
| Booking CTAs | Various treatment pages | Align footer + header + homepage cards after IA pass |

**When ready:** add `async redirects()` in `next.config.js` and test affected internal links.
