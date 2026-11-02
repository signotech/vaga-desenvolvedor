# Purchase Orders

A Portuguese-language purchase-order app for managing customers, products, and orders with searchable, sortable, paginated lists.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — runs Sequelize migrations/seeds, builds, and starts the Express API.
- `pnpm --filter @workspace/purchase-orders run dev` — starts the web interface.
- `pnpm --filter @workspace/api-server run db:setup` — applies migrations and seeds demo data.
- `pnpm --filter @workspace/api-spec run codegen` — regenerates the API client and Zod schemas.
- `pnpm run typecheck` — type-checks the workspace.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5 + Sequelize 6
- Database: SQLite, stored in `artifacts/api-server/data/`
- Migrations, factories, and seeders: Sequelize CLI under `artifacts/api-server/database/`
- API contract: `lib/api-spec/openapi.yaml`; generated Zod schemas and React Query hooks
- Frontend: React, Vite, Wouter, and TanStack Query

## Where things live

- `artifacts/api-server/src/routes/` — dashboard, customer, product, and order API routes.
- `artifacts/api-server/src/lib/database.ts` — Sequelize models and associations.
- `artifacts/api-server/database/` — migrations, demo factories, and seeders.
- `artifacts/purchase-orders/src/` — app routes and interface.
- `lib/api-spec/openapi.yaml` — API source of truth.

## Architecture decisions

- Customers and products are normalized into independent tables; `order_items` models products within each purchase order.
- Each order item stores the unit price from the time of purchase so later product price changes do not rewrite order history.
- Deleting a customer or product referenced by an order returns a conflict instead of removing historical records.
- Order totals are calculated from order items rather than stored as duplicate order data.

## Product

- Manage customers and products.
- Create, edit, view, filter, sort, paginate, and delete purchase orders with `open`, `paid`, and `canceled` statuses.
- Dashboard shows counts, paid value, and recent orders.

- API responses and request validation are generated from the OpenAPI spec; regenerate after changing the contract.
