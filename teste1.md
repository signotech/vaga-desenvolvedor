# Teste 1 — Pedidos de compra

## Requisitos

- Node.js 24 e pnpm.
- SQLite é criado automaticamente no primeiro início.

## Executar

Na raiz do projeto:

```bash
pnpm install
pnpm --filter @workspace/api-server run db:setup
```

O fluxo `artifacts/api-server: API Server` também executa migrations e seeds antes de iniciar a API. A interface usa o fluxo `artifacts/purchase-orders: web`.

Para iniciar os serviços manualmente:

```bash
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/purchase-orders run dev
```

## Banco de dados e normalização

As migrations e seeds usam Sequelize CLI. O modelo divide os dados em quatro tabelas:

- `customers`: nome, CPF, e-mail e telefone.
- `products`: SKU, título, preço e estoque.
- `purchase_orders`: cliente, data e status.
- `order_items`: pedido, produto, quantidade e preço unitário registrado na compra.

Clientes e produtos são armazenados uma vez, e os pedidos relacionam-se por chaves estrangeiras. `order_items` resolve o relacionamento muitos-para-muitos entre pedidos e produtos. O preço unitário é preservado no item para manter o valor histórico mesmo se o preço atual do produto mudar.

As validações de campos e status são feitas com os schemas Zod gerados do contrato OpenAPI. CPF, e-mail e SKU são únicos. A exclusão de clientes ou produtos vinculados a pedidos é recusada para preservar o histórico.

## Comandos de banco

```bash
pnpm --filter @workspace/api-server run db:migrate
pnpm --filter @workspace/api-server run db:seed
pnpm --filter @workspace/api-server run db:setup
```

Os factories e seeders criam dados de exemplo para clientes, produtos, pedidos e itens de pedido.
