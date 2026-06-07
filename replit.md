# Students Week 2026

A food-ordering website for the Students Week 2026 event. Students enter their name and table number, choose a vendor, customise their meal (main dish + sides + proteins), and submit an order. Admins get a live dashboard to view and manage orders, vendors, menus, and app config.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/students-week run dev` — run the frontend (port 19560)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Neon PostgreSQL connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TailwindCSS + Framer Motion
- API: Express 5
- DB: PostgreSQL (Neon) + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- DB schema: `lib/db/src/schema/` (vendors, menuItems, orders, config)
- API spec: `lib/api-spec/openapi.yaml`
- API routes: `artifacts/api-server/src/routes/` (vendors, menuItems, orders, config)
- Frontend pages: `artifacts/students-week/src/pages/`
- Star background: `artifacts/students-week/src/components/StarfieldBackground.tsx`
- Netlify config: `netlify.toml`

## Architecture decisions

- Frontend-only Netlify deploy: `netlify.toml` builds the Vite app from `artifacts/students-week/`. For the API, deploy the Express server separately (Render/Railway) and update the API base URL.
- User state (name + table number) is stored in sessionStorage under keys `sw_name` and `sw_table`.
- Admin dashboard at `/admin` — no authentication (internal event tool).
- App config (max sides, max proteins, allow multiple mains) is stored in the `app_config` table and editable from the admin panel.
- Complementary sides are auto-selected and locked in the menu UI.

## Product

- **User flow**: Landing → Vendor selection → Menu customisation → Order confirmation
- **Admin flow**: Live orders with status management, vendor CRUD, menu item CRUD, app config

## User preferences

- Dark green accent (#14532D / #166534), NOT neon green
- Obsidian black background (#0B0B0F)
- Animated star field on every page (canvas, mouse parallax)
- Mobile responsive
- Netlify deployable

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml` before touching frontend code.
- The `netlify.toml` points to `artifacts/students-week` as the build root. The API server must be deployed separately for the Netlify frontend to have a working backend.
- Run `pnpm --filter @workspace/db run push` after any schema changes.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
