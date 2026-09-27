# Frontend

Next.js app with a single route, `/welcome/<userId>`, that calls the backend and renders the next-delivery message. See the root [README](../README.md) for the full setup.

```bash
yarn install
yarn dev      # http://localhost:3000, redirects to the example customer
```

The backend URL defaults to `http://localhost:3001`; override it with `API_URL` (see `.env.example`).

```bash
yarn test     # Vitest, covers the API client in lib/api
```
