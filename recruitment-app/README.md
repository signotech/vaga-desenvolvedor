## Recruitment App

Aplicação Next.js para gestão de vagas de emprego, com fluxo completo para empresas criarem oportunidades e candidatos se candidatarem. Usa Prisma com PostgreSQL, autenticação via JWT, testes automatizados e documentação Swagger.

---

## 📦 Principais recursos

- Dashboard de empresa para criar/editar/desativar vagas
- Dashboard de candidato para listar vagas e enviar candidaturas
- Autenticação com JWT e cookies httpOnly
- Prisma (migrations + seed realista) e testes automatizados (Jest/Supertest)
- Documentação Swagger servida em `/api/docs`
- Ambiente Docker com Next.js + PostgreSQL pronto para desenvolvimento

---

## 🗂 Estrutura do projeto

- `app/` – páginas e rotas API (App Router)
- `components/` – componentes reutilizáveis
- `lib/` – serviços, repositórios, helpers de autenticação, Swagger schema
- `prisma/` – schema, migrations e seed
- `tests/` – testes de integração e unidade
- `docker-compose.yml` – stack de desenvolvimento (app + Postgres)

---

## ⚙️ Pré-requisitos

- Node.js 20+
- pnpm 8+
- Docker Desktop (para usar o fluxo containerizado)
- PostgreSQL 16 (apenas se for rodar fora do Docker)

---

## 🔐 Variáveis de ambiente

1. Copie `env.example` (crie um se ainda não existir) para:
   - `.env.local` (rodar com `pnpm dev`)
   - `.env.docker` (rodar com Docker)
2. Ajuste pelo menos:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (se aplicável)

---

## 🚀 Rodando localmente (Node + pnpm)

```bash
pnpm install
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

Aplicação disponível em http://localhost:3000.

---

## 🐳 Rodando com Docker

```bash
docker compose up --build -d
docker compose exec app pnpm prisma migrate dev
docker compose exec app pnpm prisma db seed
```

- Frontend: http://localhost:3000  
- Postgres: `localhost:5432` (`postgres` / `1234`, banco `vaga-signotech`)

Parar serviços:

```bash
docker compose down
```

Use `docker compose down -v` se quiser apagar o volume do banco.

---

## 👥 Usuários seed

| Papel      | E-mail                     | Senha         |
|-----------|----------------------------|---------------|
| Empresa   | contato@techsolutions.com  | empresa123    |
| Empresa   | talentos@inovarh.com       | empresa123    |
| Candidato | ana.souza@teste.com        | candidato123  |
| Candidato | bruno.oliveira@teste.com   | candidato123  |
| Candidato | carla.lima@teste.com       | candidato123  |

---

## 🧪 Testes

### Docker

```bash
docker compose exec app pnpm test
```

### Local

```bash
pnpm test
```

---

## 🛠 Comandos úteis Prisma

| Ação                | Local                         | Docker                                         |
|---------------------|-------------------------------|------------------------------------------------|
| Aplicar migrations  | `pnpm prisma migrate dev`     | `docker compose exec app pnpm prisma migrate dev` |
| Deploy migrations   | `pnpm prisma migrate deploy`  | `docker compose exec app pnpm prisma migrate deploy` |
| Rodar seed          | `pnpm prisma db seed`         | `docker compose exec app pnpm prisma db seed` |
| Status das migrations | `pnpm prisma migrate status` | `docker compose exec app pnpm prisma migrate status` |

---

## 🧭 Troubleshooting

- **`docker: command not found`** → instale Docker Desktop e reabra o terminal.
- **`service "app" is not running`** → suba os containers com `docker compose up -d`.
- **Arquivo seed sem efeito** → verifique `DATABASE_URL` e rode novamente `pnpm prisma db seed`.
- **Tests falhando por falta de seed** → certifique-se de rodar `pnpm prisma db seed` antes.
- **Porta 3000/5432 ocupada** → altere o mapeamento em `docker-compose.yml` ou libere a porta.

---

## 📞 Suporte rápido

- Logs da aplicação: `docker compose logs -f app`
- Logs do banco: `docker compose logs -f postgres`
- Acesso ao container da aplicação: `docker compose exec app sh`

Pronto! Com esse fluxo, fica fácil clonar o repositório, subir o ambiente e testar o produto sem configurações manuais complexas.
