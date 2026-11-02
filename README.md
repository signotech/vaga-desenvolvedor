# SignoTech — Pedidos de Compra

Aplicação de cadastro de pedidos de compra desenvolvida para o teste da SignoTech, com CRUD de clientes, produtos e pedidos, autenticação, API REST e ambiente Docker.

**Stack:** Node.js 24 · Express · Sequelize · SQLite · EJS · Materialize

## Funcionalidades

- CRUD de clientes, produtos e pedidos de compra.
- Filtros, ordenação e paginação com seletor de itens por página.
- Exclusão individual (com confirmação) e em massa.
- Pedidos com status, itens dinâmicos, desconto percentual/fixo e totais calculados.
- Preço unitário congelado no item do pedido (snapshot histórico).
- Autenticação de usuário e proteção das rotas web.
- API REST JSON pública em `/api/v1`.
- Migrations, seeders e factories com Sequelize.
- Docker com volume persistente para o SQLite.

## Como executar

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

Acesse `http://localhost:3000` e entre com:

```text
admin@teste.com / admin123
```

## Docker

```bash
docker compose up --build -d
docker compose logs -f app
```

O entrypoint executa migrations e seeds antes de iniciar a aplicação. Os dados ficam no volume `sqlite-data`.

## Testes

```bash
npm test
```

49 testes com Jest + Supertest usando SQLite em memória.

## Documentação

A documentação completa — variáveis de ambiente, scripts, rotas web, endpoints e exemplos da API, Docker, modelagem normalizada e decisões técnicas — está em [`teste1.md`](teste1.md).
