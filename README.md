# Roll With The Punches E-Commerce: a mock e-commerce site for boxing gear

- project configured to be run in GutHub Codespaces

## Set-up

### Back-end: Express + PostgreSQL

#### Database Schema

_*coming soon...*_

#### API Design

- API documentation can be found at the `/api-docs` endpoint

### Front-end: React + Chakra UI

## How to run

1. start backend

```shell
cd backend
npm install
npm start
```

2. start frontend

```shell
cd frontend
npm install
npm start
```

3. navigate to `localhost:3000` to interact with the UI

## Tips

- To test API locally with Postman, grab the `$GITHUB_TOKEN` via the cli in the Codespace, and set it as `X-Github-Token` header in your Postman requests

- db should only be acessible to external IPs during development

TODOS:

- finish checkout
- implement order history
- remove unneeded routes and db operations > update api spec
