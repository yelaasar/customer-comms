# CLAUDE.md

Guidance for Claude Code in this repo. Setup and run instructions are in `README.md`; each package has its own README.

## Ground rules

- Prioritise readability and strong typing. Keep scope tight: no auth, database, containerisation or other unrequested infrastructure.
- `backend/` and `frontend/` are independent yarn projects with no workspaces. Run yarn commands from inside each directory.
- Commits get a short one-line message and no attribution trailer.

## Backend (`backend/`, NestJS 10)

- Two modules: `src/users/` (`UsersModule` exports `UsersRepository`, which loads `data.json` once via a factory provider, plus the `User`/`Cat` types) and `src/comms/` (`CommsController` → `CommsService`, templating only). New features go in their own Nest module.
- `data.json` stands in for the database; don't add a DB. Every customer's first cat is active, later cats may be inactive.
- Tests: `yarn test` (jest, `*.spec.ts`). Unit tests build `new UsersRepository(fixtures)`; the controller spec is the e2e check against the real data.
- A customer with no active cats gets a 404 (no upcoming delivery), the same as an unknown user. This is covered by a test.
- CORS origin comes from `FRONTEND_ORIGIN` (default `http://localhost:3000`).

## Frontend (`frontend/`, Next.js 16 App Router, React 19, Tailwind v4)

- Next 16 has breaking changes. Check `frontend/node_modules/next/dist/docs/` before using a Next API rather than relying on memory.
- If `next dev` is started by an agent it recreates `frontend/AGENTS.md` and `frontend/CLAUDE.md`. Delete them; the project doesn't use them.
- One route, `/welcome/[userId]`: a server component fetching through `lib/api/comms.ts`, which returns a discriminated `CommsResult`. `/` redirects to the README example user. Components live in `components/`.
- Brand colours are theme tokens in `app/globals.css` (`brand`, `brand-dark`, `page`, `gift`, `gift-border`, `gift-text`). Use those, not hex classes.
- Backend URL comes from `API_URL` (default `http://localhost:3001`, see `.env.example`).
- Tests: `yarn test` (Vitest, `*.test.ts`, no DOM). Only the API client is tested; components are presentational.
