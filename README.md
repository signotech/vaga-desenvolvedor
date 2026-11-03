# Signo Pedidos

Monorepo do teste técnico Signotech: API REST (Express + Sequelize + SQLite) e frontend (React + TypeScript + Vite + Materialize).

## Estrutura

```
backend/     API, migrations, seeders e SQLite
frontend/    App React (Vite)
e2e/         Testes Playwright (API + UI) + Dockerfile
compose.yaml Docker Compose (API + Nginx; profile test → e2e)
```

Detalhes do enunciado, modelo e endpoints: [`teste1.md`](./teste1.md).

## Desenvolvimento local

### Backend

```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

API: http://localhost:3000  
Swagger: http://localhost:3000/api/docs  
Login demo: `admin@signotech.com` / `admin123`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: http://localhost:5173 (`/api` → proxy para o backend).

### Pela raiz

```bash
npm install                 # Playwright
npm --prefix backend install
npm --prefix frontend install

npm run db:reset           # migrate + seed (backend)
npm run dev                # API com nodemon
npm run dev:web            # Vite
npm run test:e2e           # Playwright no host
npm run test:e2e:docker    # Playwright no Docker
```

## Docker

Com Docker Desktop / OrbStack em execução:

```bash
docker compose up --build
```

| Serviço   | URL |
| --- | --- |
| Frontend  | http://localhost:8080 |
| API       | http://localhost:3000 |
| Swagger   | http://localhost:3000/api/docs |

O frontend (Nginx) faz proxy de `/api` para o serviço `backend`.  
O SQLite fica no volume `sqlite-data`; na primeira subida o entrypoint roda migrations + seed.

```bash
npm run docker:up      # up --build -d
npm run docker:logs
npm run docker:down
```

## Testes e2e

No host (precisa de `npx playwright install`):

```bash
npm run test:e2e        # suíte completa
npm run test:e2e:api    # só API
npm run test:e2e:web    # só UI
```

No Docker (browsers inclusos na imagem Playwright):

```bash
npm run test:e2e:docker       # suíte completa
npm run test:e2e:docker:api   # só API
npm run test:e2e:docker:web   # só UI
```

Usa banco isolado (`backend/database/e2e.sqlite`) e sobe API/Vite em portas dedicadas.
