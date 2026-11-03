# Teste para candidatos à vaga de Desenvolvedor

## Stack

- **Node.js + Express** (API REST JSON)
- **Sequelize** (ORM, migrations e seeders)
- **SQLite**
- **React + TypeScript + Vite** (frontend)
- **Materialize CSS** (UI responsiva)
- **Axios + TanStack Query + React Hook Form + Zod**
- **Playwright** (e2e API + UI)
- **Docker Compose** (deploy local)

## Modelo normalizado (3FN)

A modelagem inicial misturava cliente, produto e pedido em uma única tabela. Foi normalizada assim:

| Tabela | Campos | Relação |
| --- | --- | --- |
| `clientes` | id, nome, cpf, email | 1:N com pedidos |
| `produtos` | id, sku, titulo, preco, estoque | 1:N com itens |
| `pedidos` | id, cliente_id, data_pedido, status, desconto | N:1 cliente; 1:N itens |
| `pedido_itens` | id, pedido_id, produto_id, quantidade, preco_unitario | N:1 pedido; N:1 produto |

**Status do pedido:** `Em Aberto` | `Pago` | `Cancelado`

**Desconto:** campo bônus em `pedidos` (aplicado no seed e no formulário).

## Bônus do enunciado

| Item | Status |
| --- | --- |
| Autenticação de usuário | JWT + tela `/login` (`admin@signotech.com` / `admin123`) |
| Itens por página configurável | Seletor 10/20/50/100 nas listagens |
| Deleção em massa | Checkboxes + `POST /api/{recurso}/bulk-delete` |
| Desconto em pedidos | Campo `desconto` no modelo/API/UI |
| Front Materialize responsivo | App React + Materialize |
| API REST JSON | `/api/clientes`, `/api/produtos`, `/api/pedidos` |
| Docker | `compose.yaml` (app) + profile `test` (e2e) |

## Como executar

### Docker (recomendado para demo)

```bash
docker compose up --build
```

- App: http://localhost:8080 (login: `admin@signotech.com` / `admin123`)  
- API: http://localhost:3000  
- Swagger: http://localhost:3000/api/docs  

Na primeira subida: migrations + seed automático. SQLite persiste no volume `sqlite-data`.

```bash
npm run docker:up     # build + detach
npm run docker:logs
npm run docker:down
```

### Backend (local)

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

API em `http://localhost:3000`.

Swagger UI: `http://localhost:3000/api/docs`  
OpenAPI JSON: `http://localhost:3000/api/docs.json`

### Frontend (local)

```bash
cd frontend
npm install
npm run dev
```

App em `http://localhost:5173` (proxy `/api` → backend).

### Scripts na raiz

| Comando | Descrição |
| --- | --- |
| `npm run dev` / `dev:api` | API com nodemon (`backend/`) |
| `npm run dev:web` | Vite (`frontend/`) |
| `npm run db:migrate` | Migrations |
| `npm run db:seed` | Seed demo (~150 pedidos) |
| `npm run db:reset` | Recria banco + seed |
| `npm start` | API em produção |
| `npm run test:e2e` | Playwright no host (API + web) |
| `npm run test:e2e:docker` | Playwright no Docker (browsers inclusos) |
| `npm run docker:up` | Compose up --build -d |

## Endpoints

Base: `/api` (CRUDs exigem `Authorization: Bearer <token>`)

### Auth `/api/auth`

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/login` | `{ email, senha }` → `{ token, user }` |
| GET | `/me` | Usuário autenticado |

### Clientes `/api/clientes`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Lista (filtro, ordenação, paginação) |
| GET | `/:id` | Detalhe |
| POST | `/` | Cria `{ nome, cpf, email }` |
| PUT | `/:id` | Atualiza |
| DELETE | `/:id` | Remove |
| POST | `/bulk-delete` | Exclusão em massa `{ ids: number[] }` |

### Produtos `/api/produtos`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Lista |
| GET | `/:id` | Detalhe |
| POST | `/` | Cria `{ sku, titulo, preco, estoque? }` |
| PUT | `/:id` | Atualiza |
| DELETE | `/:id` | Remove |
| POST | `/bulk-delete` | Exclusão em massa `{ ids: number[] }` |

### Pedidos `/api/pedidos`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Lista (inclui cliente e itens) |
| GET | `/:id` | Detalhe |
| POST | `/` | Cria pedido com itens |
| PUT | `/:id` | Atualiza (itens opcionais) |
| DELETE | `/:id` | Remove |
| POST | `/bulk-delete` | Exclusão em massa `{ ids: number[] }` |

Exemplo de criação de pedido:

```json
{
  "cliente_id": 1,
  "status": "Em Aberto",
  "desconto": 10,
  "itens": [
    { "produto_id": 1, "quantidade": 2 },
    { "produto_id": 3, "quantidade": 1 }
  ]
}
```

## Query params (listagens)

- `page` — página (default `1`)
- `limit` — itens por página (default `20`, máx. `100`) — bônus
- `sortBy` — qualquer campo da entidade
- `sortOrder` — `ASC` ou `DESC`
- Filtro por campo: `?nome=Ana`, `?status=Pago`, `?sku=NB-001`, etc.
- Busca OR (clientes): `?q=termo` (nome, CPF ou e-mail)

## Estrutura

```
backend/
  src/
    app.js / server.js
    config/database.js
    models/          # Cliente, Produto, Pedido, PedidoItem
    controllers/     # CRUD + factory reutilizável
    routes/
    validators/
    middlewares/
    factories/
    utils/query.js
    docs/            # OpenAPI + Swagger UI
  database/
    migrations/
    seeders/
  Dockerfile
  docker-entrypoint.sh
frontend/
  src/               # feature-based (pages → hooks → stores → services)
  Dockerfile
  nginx.conf         # SPA + proxy /api → backend
e2e/
  api/               # testes HTTP
  web/               # testes de UI
  Dockerfile         # imagem Playwright para CI/local via Compose
compose.yaml         # backend + frontend; profile `test` → serviço e2e
```

## Testes e2e

No host (requer `npx playwright install` após `npm install` na raiz):

```bash
npm run test:e2e          # suíte completa
npm run test:e2e:api      # só API
npm run test:e2e:web      # só UI
```

No Docker (recomendado; Chromium já vem na imagem):

```bash
npm run test:e2e:docker
npm run test:e2e:docker:api
npm run test:e2e:docker:web
```

Projetos: `api` (CRUD REST) e `web` (home, sidebar, cadastros). Banco isolado em `backend/database/e2e.sqlite`; o Playwright sobe API + Vite em portas dedicadas.
