# Backend

NestJS API that builds personalised customer messages. It exposes one endpoint and reads `data.json` in place of a database. See the root [README](../README.md) for the full setup.

```bash
yarn install
yarn start    # http://localhost:3001
```

## Endpoint

`GET /comms/your-next-delivery/<userId>`, for example `/comms/your-next-delivery/ff535484-6880-4653-b06e-89983ecf4ed5`, returns:

```json
{
  "title": "Your next delivery for Dorian and Ocie",
  "message": "Hey Kayleigh! In two days' time, we'll be charging you for your next order for Dorian and Ocie's fresh food.",
  "totalPrice": 134,
  "freeGift": true
}
```

Only cats with an active subscription are named and priced. `freeGift` is true when the total exceeds £120. An unknown user, or one with no active cats, gets a 404.

```bash
yarn test     # jest: unit specs for the service and repository, plus a supertest check of the controller against data.json
yarn lint
```
