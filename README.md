# Nx Shop

A full-stack e-commerce project built to practice senior-level architecture decisions — not just to ship features.

**Stack:** Nx monorepo · Angular (SSR, zoneless, signals) · NestJS + GraphQL (code-first) · Prisma + PostgreSQL

## What is this?

A pet shop e-commerce app used as a learning ground. The goal is to experience real-world challenges: module boundaries, GraphQL N+1, idempotent Stripe webhooks, race conditions on stock, and more.

Progress and decisions are tracked in [roadmap.md](roadmap.md). Key architectural decisions live in `docs/adr/`.

## Structure

```
apps/
  web/        # Angular storefront (SSR)
  backend/    # NestJS GraphQL API
libs/
  web/        # web feature & data-access libs
  backend/    # backend domain libs (products, ...)
  shared/     # platform-agnostic libs (prisma client, ...)
prisma/       # schema, migrations, seed
```

## Quick Start

Requirements: Node 22+, Docker Desktop

```sh
git clone <repo-url> && cd nx-shop
cp .env.example .env
npm install    # postinstall runs prisma generate
npm run setup  # starts postgres, runs migrations, seeds data
npm run dev    # backend (:3000) + web (:4200) in parallel
```

## Useful commands

```sh
npm run docker:down     # stop postgres
npm run prisma:studio   # browse the database
npx nx graph            # project dependency graph
npm run lint:affected   # lint only what changed
npm run test:affected   # test only what changed
```
