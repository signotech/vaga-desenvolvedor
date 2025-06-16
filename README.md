# Vaga Desenvolvedor

Este projeto é uma aplicação Full Stack para gerenciamento de vagas, candidatos e inscrições. A aplicação permite criar, listar, atualizar e excluir vagas e candidatos, além de realizar inscrições de candidatos nas vagas.

## 🛠️ Tecnologias Utilizadas

### 🔗 Back-end:
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Docker
- Cors
- Dotenv

### 🎨 Front-end:
- React
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Axios
- Shadcn UI

### 🐳 Infraestrutura:
- Docker e Docker Compose
- Prisma Studio

---

## 🚀 Como executar o projeto

### ⚙️ Pré-requisitos:
- Docker instalado e rodando na máquina.
- Node.js instalado.

---

### 📦 Passo a passo

1. **Clone o repositório:**

```bash
git clone https://github.com/sasacampi/vaga-desenvolvedor.git
cd vaga-desenvolvedor
```

- Crie um arquivo .env dentro da pasta /backend com o seguinte conteúdo:

```.env
DATABASE_URL="postgresql://admin:admin123@localhost:6500/meubanco"
```

2. **Suba os containers com Docker:**

```bash
docker-compose up --build
```

- Execute as migrations no banco de dados:

- Abra um terminal no container do backend:

``` bash
docker exec -it backend bash
```
- E dentro do container rode:

```
npx prisma migrate dev --name init
```
- Para popular o banco com dados iniciais (seeds), execute:
```
npx prisma db seed
```

## ✅ Acesso ao projeto:
Frontend: http://localhost:3001/dashboard

Backend (API): http://localhost:3000

Prisma Studio: http://localhost:5555

## 🗄️ Rotas da API
🔹 Vagas (/jobs):
- GET /jobs – Listar vagas

- POST /jobs – Criar vaga

- PUT /jobs/:id – Editar vaga

- DELETE /jobs/:id – Excluir vaga

🔹 Candidatos (/candidates):
- GET /candidates – Listar candidatos

- POST /candidates – Criar candidato

- PUT /candidates/:id – Editar candidato

- DELETE /candidates/:id – Excluir candidato

🔹 Inscrições (/applications):
- GET /applications – Listar inscrições

- POST /applications – Inscrever candidato

- DELETE /applications/:id – Cancelar inscrição


