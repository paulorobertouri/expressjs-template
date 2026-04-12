# expressjs-template

Express API template with TypeScript, JWT authentication, Swagger docs, and automated tests.

## Stack

- Node.js + Express
- TypeScript
- jsonwebtoken
- Vitest + Supertest
- pnpm

## Endpoints

- `GET /health`
- `GET /docs`
- `GET /v1/public`
- `GET /v1/customer`
- `POST /v1/auth/login`
- `GET /v1/private`

## JWT Contract

Login returns:

- Body: `{"token":"..."}`
- Header: `Authorization: Bearer <token>`
- Header: `X-JWT-Token: <token>`

## Commands

- `make install` — install dependencies
- `make install-dev` — install dev dependencies
- `make dev` — start dev server
- `make build` — build for production
- `make test` — run tests
- `make docker-build` — build Docker image
- `make docker-test` — run tests in Docker
- `make docker-curl-test` — run curl integration tests in Docker

## Environment Variables

- `PORT=8000`
- `JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-for-hs256`
- `JWT_ALGORITHM=HS256`
- `JWT_EXPIRATION=3600`
- `NODE_ENV=development`

## Project Structure

```text
.
├── src/
│   ├── main.ts
│   ├── api/routes.ts
│   ├── di/providers.ts
│   ├── domain/models.ts
│   ├── middleware/auth.ts
│   ├── repositories/customer_repo.ts
│   └── services/index.ts
├── tests/
│   ├── unit/services.test.ts
│   ├── e2e/api.test.ts
│   └── docker/
├── scripts/
│   ├── ubuntu/
│   └── windows/
├── docker/
│   ├── build.Dockerfile
│   └── test.Dockerfile
└── Makefile
```

## Architecture

```text
HTTP -> API Routes -> JWT Middleware -> Services -> Repositories -> Domain
```

## Quality Gates

- Tests must pass.
- Build must succeed.
- Docker image builds and tests pass in container.
