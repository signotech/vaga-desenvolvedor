# Frontend — Signo Pedidos

React + TypeScript + Vite + Materialize CSS.

## Stack de dados/formulários

- **Axios** — cliente HTTP centralizado (`src/config/api.config.ts`)
- **TanStack Query** — cache e mutations (`src/config/query.config.ts`)
- **React Hook Form + Zod** — formulários e validação (`schemas/` + modais)
- **Zustand** — estado de UI (sidebar) e filtros de listagem
- **Lucide React** — ícones da navegação
- **Recharts** — gráficos do dashboard

## Setup

```bash
npm install
npm run dev
```

App em `http://localhost:5173`. O Vite faz proxy de `/api` para `http://localhost:3000` (ou `VITE_API_PROXY`).

### Variáveis de ambiente

| Variável | Default | Descrição |
| --- | --- | --- |
| `VITE_API_URL` | `/api` | Base URL da API |
| `VITE_API_TIMEOUT_MS` | `15000` | Timeout das requisições |
| `VITE_API_PROXY` | `http://localhost:3000` | Target do proxy no Vite (dev/e2e) |

## Docker

A imagem de produção é buildada pelo `compose.yaml` na raiz: Nginx serve o `dist` e encaminha `/api` ao serviço `backend`.

```bash
# na raiz do monorepo
docker compose up --build
```

App: http://localhost:8080
