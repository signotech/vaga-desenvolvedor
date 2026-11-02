<div align="center">
  <img src="https://signotech.com.br/wp-content/uploads/2023/03/SignoTech.webp" width="20%" />
</div>

# Teste para candidatos à vaga de Desenvolvedor

Nesse teste analisaremos seu conhecimento geral e inclusive velocidade de desenvolvimento. Abaixo explicaremos tudo o que será necessário.

## Instruções

O desafio consiste em implementar uma aplicação Web utilizando o framework PHP Laravel OU NodeJS + Express, e um banco de dados relacional SQLite, MySQL ou Postgres, a partir de uma modelagem de dados inicial desnormalizada, que deve ser normalizada para a implementação da solução.

Você vai criar uma aplicação de cadastro de pedidos de compra, a partir de uma modelagem inicial, com as seguintes funcionalidades:

- CRUD de clientes.
- CRUD de produtos.
- CRUD de pedidos de compra, com status (Em Aberto, Pago ou Cancelado).
- Cada CRUD:
  - deve ser filtrável e ordenável por qualquer campo, e possuir paginação de 20 itens.
  - deve possuir formulários para criação e atualização de seus itens.
  - deve permitir a exclusão de qualquer item de sua lista, importante conter uma mensagem de confirmação.
- Barra de navegação entre os CRUDs.
- Links para os outros CRUDs nas listagens (Ex: link para o detalhe do cliente da compra na lista de pedidos de compra)

## Modelo de dados

A modelagem inicial para a implementação solução é a seguinte:

![](banco.png)

Você deve alterar esta modelagem para que a mesma cumpra com as três primeiras formas normais.

Além disso, a implementação deste modelo em um banco de dados relacional deve ser realizada levando em consideração os seguintes requisitos:

- O banco de dados deve ser criado utilizando Migrations do framework Laravel, e também utilizar Seeds e Factorys para popular as informações no banco de dados. Se o seu projeto for em NodeJS solicitamos o uso do ORM Sequelize para a criação das migrations.
- Implementação das validações necessárias na camada que julgar melhor.

## Tecnologias a serem utilizadas

Devem ser utilizadas as seguintes tecnologias:

- HTML
- CSS
- Javascript
- Framework Laravel (PHP) ou NodeJS+Express
- Docker (construção do ambiente de desenvolvimento) (Adicional não obrigatório)

## Entrega

- Para iniciar o teste, faça um fork deste repositório; **Se você apenas clonar o repositório não vai conseguir fazer push.**
- Crie uma branch com o seu nome completo;
- Altere o arquivo teste1.md com as informações necessárias para executar o seu teste (comandos, migrations, seeds, etc);
- Depois de finalizado, envie-nos o pull request;

## Bônus

- Implementar autenticação de usuário na aplicação.
- Permitir que o usuário mude o número de itens por página.
- Permitir deleção em massa de itens nos CRUDs.
- Implementar aplicação de desconto em alguns pedidos de compra.
- Implementar a camada de Front-End utilizando a biblioteca javascript Materialize e ser responsiva.
- API Rest JSON para todos os CRUDS listados acima.

## O que iremos analisar

- Organização do código;
- Aplicação de design patterns;
- Separação de módulos e componentes;
- Legibilidade;
- Criação do ambiente com Docker.

### Boa sorte!

---

# Implementação do teste

Aplicação de cadastro de pedidos de compra em **Node.js 24 + Express + Sequelize + SQLite**, com interface server-side em **EJS + Materialize** (pt-BR).

Branch de desenvolvimento: `murilo-zimerman-fortaleza`.

## Requisitos

- Node.js 24 (ou `>= 20`)
- npm
- Docker + Docker Compose (opcional)

## Execução local

```bash
# 1. Instalar dependências
npm install

# 2. Criar o arquivo de ambiente
cp .env.example .env

# 3. Criar as tabelas
npm run db:migrate

# 4. Popular o banco (idempotente)
npm run db:seed

# 5. Iniciar a aplicação
npm run dev     # com recarga automática
# ou
npm start
```

Acesse `http://localhost:3000`.

**Credenciais de acesso:**

```text
E-mail: admin@teste.com
Senha:  admin123
```

O `npm start` não executa migrations/seeds automaticamente (isso é feito pelo entrypoint do Docker). Para recriar o banco local:

```bash
npm run db:reset
```

### Variáveis de ambiente

| Variável | Padrão | Descrição |
|---|---|---|
| `NODE_ENV` | `development` | Ambiente da aplicação |
| `PORT` | `3000` | Porta HTTP |
| `APP_NAME` | `SignoTech - Pedidos de Compra` | Nome exibido na interface |
| `DB_DIALECT` | `sqlite` | Dialeto do Sequelize |
| `DB_STORAGE` | `src/database/database.sqlite` | Arquivo SQLite |
| `DB_LOGGING` | `false` | Loga as queries SQL |
| `SESSION_SECRET` | valor de exemplo | Chave de assinatura da sessão; **troque em produção** |

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe a aplicação com `nodemon` |
| `npm start` | Sobe a aplicação com `node` |
| `npm run db:migrate` | Executa as migrations |
| `npm run db:migrate:undo` | Reverte a última migration |
| `npm run db:seed` | Executa todos os seeders |
| `npm run db:reset` | Reverte tudo, migra e popula novamente |
| `npm test` | Executa a suíte Jest + Supertest |

## Docker

O `Dockerfile` usa build multi-stage com `node:24-alpine` e instala as dependências nativas exigidas pelo `sqlite3`. O `docker-compose.yml` mantém o banco em um volume nomeado e configura healthcheck em `/health`.

```bash
# Construir e subir
docker compose up --build -d

# Acompanhar os logs
docker compose logs -f app

# Parar (mantendo os dados)
docker compose down

# Parar e apagar o volume do banco
docker compose down -v
```

Ao iniciar, o `docker-entrypoint.sh` executa `db:migrate` e `db:seed:all` (idempotentes) e só então inicia a aplicação. O SQLite fica persistido em `/app/data/database.sqlite`.

Para definir uma chave de sessão própria:

```bash
SESSION_SECRET="uma-chave-forte" docker compose up --build -d
```

## Funcionalidades

- CRUD completo de clientes, produtos e pedidos de compra.
- Filtros, ordenação e paginação em todas as listagens (20 itens por padrão).
- Seletor de itens por página (10, 20, 50 ou 100).
- Exclusão individual com modal de confirmação e exclusão em massa.
- Formulários de criação/edição com validação no servidor e mensagens por campo.
- Links cruzados: pedido → cliente, pedido → produto, cliente/produto → pedidos relacionados.
- Pedidos com status **Em Aberto**, **Pago** e **Cancelado**.
- Itens dinâmicos no formulário de pedido, com preço unitário e subtotal.
- Desconto por percentual ou valor fixo, com total recalculado e nunca negativo.
- Autenticação de usuário com sessão, logout e proteção das rotas web.
- API REST JSON pública para os três CRUDs.
- Tratamento centralizado de erros de validação, unicidade e chaves estrangeiras.

## Rotas web

Todas as rotas abaixo (exceto `/login`) exigem sessão autenticada. As operações de atualização e exclusão são enviadas via `POST` com `_method=PUT` ou `_method=DELETE` (method override).

| Método | Rota | Ação |
|---|---|---|
| `GET` | `/login` | Formulário de login |
| `POST` | `/login` | Autenticar |
| `POST` | `/logout` | Encerrar sessão |
| `GET` | `/` | Página inicial |
| `GET` | `/clients` | Listagem de clientes |
| `GET` | `/clients/new` | Formulário de criação |
| `POST` | `/clients` | Criar cliente |
| `GET` | `/clients/:id` | Detalhe do cliente |
| `GET` | `/clients/:id/edit` | Formulário de edição |
| `PUT` | `/clients/:id` | Atualizar cliente |
| `DELETE` | `/clients/:id` | Excluir cliente |
| `POST` | `/clients/bulk-delete` | Excluir clientes em massa |
| — | `/products/...` | Mesmas rotas do CRUD de produtos |
| `GET` | `/orders` | Listagem de pedidos |
| `GET` | `/orders/new` | Formulário de criação |
| `POST` | `/orders` | Criar pedido |
| `GET` | `/orders/:id` | Detalhe do pedido |
| `GET` | `/orders/:id/edit` | Formulário de edição |
| `PUT` | `/orders/:id` | Atualizar pedido |
| `DELETE` | `/orders/:id` | Excluir pedido e seus itens |
| `POST` | `/orders/bulk-delete` | Excluir pedidos em massa |
| `GET` | `/health` | Healthcheck (JSON) |

### Filtros e ordenação

Parâmetros comuns: `page`, `per_page` (1 a 100; padrão 20), `sort` e `dir` (`asc`/`desc`).

| Recurso | Filtros | Campos de ordenação |
|---|---|---|
| Clientes | `name`, `cpf`, `email`, `created_from`, `created_to` | `id`, `name`, `cpf`, `email`, `created_at` |
| Produtos | `sku`, `title`, `min_price`, `max_price`, `min_stock`, `max_stock`, `created_from`, `created_to` | `id`, `sku`, `title`, `price`, `stock`, `created_at` |
| Pedidos | `client` (nome), `client_id`, `status`, `discount_type`, `ordered_from`, `ordered_to` | `id`, `client`, `status`, `ordered_at`, `total` |

## API REST

Base: `/api/v1`. A API é pública e responde em JSON.

| Recurso | Endpoints |
|---|---|
| Clientes | `GET /clients`, `POST /clients`, `GET /clients/:id`, `PUT /clients/:id`, `PATCH /clients/:id`, `DELETE /clients/:id`, `DELETE /clients/bulk` |
| Produtos | `GET /products`, `POST /products`, `GET /products/:id`, `PUT /products/:id`, `PATCH /products/:id`, `DELETE /products/:id`, `DELETE /products/bulk` |
| Pedidos | `GET /orders`, `POST /orders`, `GET /orders/:id`, `PUT /orders/:id`, `PATCH /orders/:id`, `DELETE /orders/:id`, `DELETE /orders/bulk` |

Listagens retornam:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 0,
    "lastPage": 1,
    "from": 0,
    "to": 0
  }
}
```

Os mesmos filtros, ordenação e paginação da interface web são aceitos na API (`per_page`, `page`, `sort`, `dir`). `perPage` também é aceito como apelido.

### Exemplos

Criar cliente:

```bash
curl -X POST http://localhost:3000/api/v1/clients \
  -H 'Content-Type: application/json' \
  -d '{"name":"Maria Silva","cpf":"52998224725","email":"maria@teste.com"}'
```

Criar pedido (aceita `camelCase` e `snake_case`):

```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "clientId": 1,
    "status": "open",
    "orderedAt": "2026-03-01T09:00:00.000Z",
    "discountType": "percent",
    "discountValue": 10,
    "items": [
      { "product_id": 1, "quantity": 2 },
      { "productId": 2, "quantity": 1 }
    ]
  }'
```

O pedido retornado inclui `subtotal`, `discountAmount`, `total` e o `unitPrice` congelado de cada item.

Excluir em massa (JSON ou query string):

```bash
curl -X DELETE http://localhost:3000/api/v1/products/bulk \
  -H 'Content-Type: application/json' \
  -d '{"ids":[1,2,3]}'

curl -X DELETE "http://localhost:3000/api/v1/products/bulk?ids=1,2,3"
```

### Erros

| Status | Situação | Corpo |
|---|---|---|
| `400` | JSON malformado | `{ "error": "JSON inválido." }` |
| `404` | Registro/rota inexistente | `{ "error": "..." }` |
| `409` | Unicidade ou vínculo de FK | `{ "error": "..." }` |
| `422` | Validação | `{ "error": "Dados inválidos.", "errors": [{ "field": "cpf", "message": "..." }] }` |

## Modelagem normalizada (3NF)

A modelagem inicial foi decomposta em cinco tabelas:

```text
clients (id, name, cpf, email, created_at, updated_at)
products (id, sku, title, price, stock, created_at, updated_at)
orders (id, client_id, status, ordered_at, discount_type, discount_value, created_at, updated_at)
order_items (id, order_id, product_id, quantity, unit_price, created_at, updated_at)
users (id, name, email, password_hash, created_at, updated_at)
```

- **1FN:** todos os atributos são atômicos; não há listas de produtos repetidas em colunas nem grupos repetitivos.
- **2FN:** os dados do pedido ficam apenas em `orders` e os dados de cada produto do pedido em `order_items`, que depende da chave do pedido e do produto. A chave estrangeira composta (`order_id`, `product_id`) é protegida por índice único, impedindo o mesmo produto duplicado no pedido.
- **3FN:** não há dependências transitivas. Cliente, produto e usuário ficam em tabelas próprias, referenciados por FK; o status e o desconto dependem apenas do pedido.
- **Totais calculados:** `subtotal`, `discountAmount` e `total` são campos virtuais calculados a partir dos itens e do desconto, não são persistidos.
- **`unit_price` em `order_items`:** é um snapshot intencional do preço no momento da compra. Sem ele, alterar o preço do produto mudaria o histórico de pedidos já fechados. Não é dependência transitiva, pois representa o preço praticado naquele pedido.

### Integridade referencial

| Relação | Política |
|---|---|
| `orders.client_id` → `clients.id` | `RESTRICT` (não exclui cliente com pedidos) |
| `order_items.order_id` → `orders.id` | `CASCADE` (excluir pedido remove seus itens) |
| `order_items.product_id` → `products.id` | `RESTRICT` (não exclui produto usado em pedido) |

As exclusões em massa ignoram registros bloqueados por FK e informam quantos foram excluídos e quantos foram ignorados.

## Testes automatizados

```bash
npm test
```

A suíte usa **Jest + Supertest** com SQLite em memória (`DB_STORAGE=:memory:`), recriando o schema antes de cada teste. O banco de desenvolvimento não é afetado.

| Suíte | Testes |
|---|---|
| Autenticação | 7 |
| Clientes (web) | 10 |
| Produtos (web) | 9 |
| Pedidos (web) | 10 |
| API REST | 13 |
| **Total** | **49** |

Cobertura principal: login/logout e proteção de rotas, filtros/ordenação/paginação, validações, unicidade, criação/edição/exclusão, exclusão em massa, bloqueios de FK, cálculo de descontos e totais, snapshot de preço, exclusão em cascata, respostas e erros da API.

## Estrutura do projeto

```text
src/
  config/          env, conexão Sequelize e configuração do CLI
  database/        migrations, seeders e factories
  helpers/         API, CPF, dinheiro, paginação, query builder e formatadores
  middlewares/     autenticação, validação, 404 e tratamento de erros
  models/          Client, Product, Order, OrderItem, User e associações
  modules/
    auth/          login e logout
    clients/       controller, service, validator e rotas web/API
    products/      controller, service, validator e rotas web/API
    orders/        controller, service, validator e rotas web/API
  routes/          web.js e api.js
  views/           layouts, partials e telas EJS
public/            CSS, JavaScript e Materialize
tests/             setup, helpers e suítes Jest
Dockerfile
docker-compose.yml
docker-entrypoint.sh
```

## Decisões técnicas

- **Módulos por domínio:** cada CRUD separa rotas, controller, service, validação e views, mantendo a regra de negócio fora das rotas.
- **Sequelize:** models, migrations, seeders e factories; o mesmo schema é usado em desenvolvimento, testes e Docker.
- **Validação centralizada:** um middleware compartilhado responde HTML (422 com erros por campo) ou JSON (422 com lista de erros), conforme a requisição.
- **Tratamento centralizado de erros:** converte erros de unicidade/FK/validação do Sequelize em respostas 409/422 e evita redirecionamentos para hosts externos.
- **Segurança:** senha com `bcryptjs`, sessão regenerada no login, logout via `POST`, cookie `httpOnly`/`sameSite=lax` e validação de `returnTo` para evitar open redirect.
- **Preços e dinheiro:** valores monetários usam `DECIMAL(10,2)` e arredondamento consistente; os totais são sempre derivados dos itens.
- **Seed realista:** 30 clientes, 40 produtos de tecnologia, 80 pedidos e 198 itens, além do usuário administrador.

