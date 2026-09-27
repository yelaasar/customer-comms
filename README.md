# Customer comms

A channel-agnostic templating API that builds personalised customer messages, plus a single-page frontend that renders one of them. Each package has its own README with details: [`backend/README.md`](backend/README.md) and [`frontend/README.md`](frontend/README.md).

## Requirements

Node 22 (see `.nvmrc`; anything from 20.9 works) and yarn. `backend/` and `frontend/` are separate yarn projects, so run commands from inside each.

## Run it

```bash
# terminal 1
cd backend && yarn install && yarn start      # http://localhost:3001

# terminal 2
cd frontend && yarn install && yarn dev       # http://localhost:3000
```

Then open <http://localhost:3000>, which redirects to the README's example customer.

## Tests and checks

```bash
# terminal 1
cd backend && yarn test && yarn lint

# terminal 2
cd frontend && yarn test && yarn lint && yarn build
```
