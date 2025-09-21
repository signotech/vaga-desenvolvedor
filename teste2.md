# 🚀 CRUD Laravel + Next.js + MySQL (Ambiente de Desenvolvimento)

## ⚠️ Aviso Importante
Este projeto está configurado **apenas para ambiente de desenvolvimento**.  

Para rodar em **produção**, será necessário:
- Ajustar variáveis de ambiente (`APP_ENV=production`, `APP_DEBUG=false`, etc.)
- Executar cache/configuração do Laravel (`php artisan config:cache`, `php artisan route:cache`, etc.)
- Criar um `Dockerfile` específico para o frontend (`next build` + `next start`)
- Ajustar segurança (HTTPS, usuários não-root, permissões de arquivos)

> ⚠️ O arquivo **`.env.example`** contém apenas **dados simplificados para dev** (usuário, senha e banco básicos, além de seeds de teste).  
> **Nunca use esse `.env` em produção** — crie um `.env` seguro e sem seeds.

---

## ✅ Requisitos
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/install/)  
- Portas livres:
  - **80** → Nginx (API)
  - **3000** → Next.js (Frontend)
  - **3306** → MySQL (Banco de dados)

---

## 🚀 Setup Automático (Recomendado)

Na raiz do projeto, rode:

```bash
./setup.sh
```

Esse script faz automaticamente:
1. Garante que exista `backend/.env` (copiado de `.env.example` apenas em dev)
2. Sobe todos os containers (`backend`, `frontend`, `nginx`, `mysql`)
3. Instala dependências (`composer install` + `npm install`)
4. Gera `APP_KEY` do Laravel (se não existir)
5. Executa migrations + seeds
6. **Roda a suíte de testes (`php artisan test`) usando SQLite em memória**
7. Inicia o **frontend em modo dev**

🔗 Após execução, acesse:
- **Frontend:** [http://localhost:3000](http://localhost:3000)  
- **API Laravel:** [http://localhost/api/vagas](http://localhost/api/vagas)  
- **API Laravel:** [http://localhost/api/candidatos](http://localhost/api/candidatos)  

---

## 🔧 Alternativa: Comandos Manuais

```bash
# 1) Garantir .env do backend (apenas DEV)
[ -f backend/.env ] || cp backend/.env.example backend/.env

# 2) Subir containers (com build)
docker compose up -d --build

# 3) Backend: instalar dependências e APP_KEY
docker compose exec -w /var/www/html backend composer install --no-interaction --prefer-dist
docker compose exec -w /var/www/html backend php artisan key:generate || true

# 4) Garantir que o MySQL está pronto
docker compose exec mysql mysqladmin ping -h 127.0.0.1 -uroot -prootpass --silent || sleep 5

# 5) Limpar configs e rodar migrations + seeds
docker compose exec -w /var/www/html backend php artisan config:clear
docker compose exec -w /var/www/html backend php artisan migrate:fresh --seed

# 6) Rodar os testes do backend (SQLite em memória)
docker compose exec -e APP_ENV=testing -e DB_CONNECTION=sqlite -e DB_DATABASE=":memory:" -w /var/www/html backend php artisan test --ansi

# 7) Frontend: instalar deps e iniciar em modo dev
docker compose exec -w /usr/src/app frontend npm install
docker compose exec -d -w /usr/src/app frontend sh -lc "npm run dev -- -H 0.0.0.0 -p 3000"
```

---

## 🌐 URLs
- **Frontend (Next.js):** [http://localhost:3000](http://localhost:3000)  
- **API (Laravel):** [http://localhost/api](http://localhost/api)  
- **MySQL:** `localhost:3306`  
  - DB: `appdb`  
  - User: `appuser`  
  - Pass: `apppass`

> O frontend consome a API via `NEXT_PUBLIC_API_URL=http://localhost/api`.

---

## 📌 Comandos Úteis

```bash
# Logs de todos os serviços
docker compose logs -f

# Acessar container do backend
docker compose exec backend bash

# Comandos artisan
docker compose exec backend php artisan route:list
docker compose exec backend php artisan migrate
docker compose exec backend php artisan db:seed

# Rodar novamente a suíte de testes (SQLite em memória)
docker compose exec -e APP_ENV=testing -e DB_CONNECTION=sqlite -e DB_DATABASE=":memory:" backend php artisan test --ansi

# MySQL CLI
docker compose exec mysql mysql -uappuser -papppass appdb -e "SHOW TABLES;"

# Resetar completamente (containers + volumes)
docker compose down -v
./setup.sh
```

---

## 📂 Estrutura Resumida

```
/
├─ backend/         # Laravel API (CRUD de Vagas e Candidatos)
├─ frontend/        # Next.js + Tailwind (UI)
├─ docker/          # Dockerfiles e configs (nginx, backend, etc.)
├─ setup.sh         # Script automático de inicialização
└─ docker-compose.yml
```

---

## 🔄 Fluxo Rápido de Desenvolvimento
1. Execute:  
   ```bash
   ./setup.sh
   ```
2. Acesse:  
   - Frontend → [http://localhost:3000](http://localhost:3000)  
   - API → [http://localhost/api/vagas](http://localhost/api/vagas)  
3. Desenvolva frontend/backend normalmente ✨  
