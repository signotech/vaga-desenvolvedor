# Implementação entregue: OrderFlow

Este documento é referente a entrega do teste para candidatos à vaga de Desenvolvedor, teste 1, feito por Yasmin Cabrini Brancaleone

## Visão geral

O OrderFlow é uma aplicação web de gerenciamento de pedidos de compra. O backend expõe uma API REST em Node.js + Express, usa Sequelize para acesso ao MySQL e serve o frontend estático no mesmo endereço.

### Tecnologias

- Node.js 18 ou superior e Express 4.
- MySQL 8.4 e Sequelize 6, com migrations e seeders do Sequelize CLI.
- HTML, CSS e JavaScript sem framework no frontend.
- Docker Compose para executar a aplicacao e o banco de dados.
- Jest e Supertest para testes automatizados.
- Swagger UI para consultar e experimentar a API.

## Funcionalidades

- **Clientes:** cadastro, consulta, edição e exclusão, com busca por nome, CPF e e-mail.
- **Produtos:** cadastro, consulta, edição e exclusão, com busca, filtros de preço e estoque e indicador de estoque baixo.
- **Pedidos:** cadastro e edição de pedidos com vários produtos, consulta de detalhes, alteração de status e exclusão. O estoque é decrementado ao marcar um pedido como pago e restaurado se um pedido pago for cancelado; pedidos pagos não podem ser excluídos.
- **Descontos:** percentual de desconto por pedido, com subtotal, valor do desconto e total calculados pelo backend.
- **Listagens:** paginação padrão de 20 itens (opções de 10, 20, 50 ou 100), ordenação, filtros e seleção para exclusão em massa nas listagens aplicáveis. As exclusões solicitam confirmação.
- **Navegação:** painel inicial, navegação entre clientes, produtos e pedidos, e links entre pedidos, clientes e produtos relacionados.
- **Autenticação:** sessão por JWT em cookie `HttpOnly`; perfis `ADMIN` e `OPERATOR`. A administração de usuários é restrita a `ADMIN`, que não pode excluir a própria conta, o último administrador ou usuários associados a pedidos.
- **Validações:** verificação dos dados de entrada, CPF, unicidade de e-mail/CPF/SKU, disponibilidade de estoque e regras de transição de status.
- **Interface:** telas responsivas, com login, painel, clientes, produtos, pedidos, detalhes do pedido e usuários.
- **Documentação da API:** Swagger UI em `/api/docs`.

O frontend usa HTML, CSS e JavaScript nativos; Materialize não foi utilizado.

## Modelo de dados e normalização

O modelo foi separado nas tabelas relacionais:

- `users`: usuários, credenciais com hash e perfil de acesso.
- `clients`: dados cadastrais dos clientes.
- `products`: SKU, descrição, preço atual e estoque.
- `orders`: cliente, usuário responsável, data, status e percentual de desconto.
- `order_items`: produtos de cada pedido, quantidade e preço unitário no momento da compra.

As tabelas `orders` e `order_items` separam os dados do pedido de suas linhas, permitindo vários produtos por pedido sem colunas repetidas. Clientes e produtos ficam em tabelas próprias e são referenciados por chaves estrangeiras. O preço histórico em `order_items.unit_price` preserva o valor praticado na compra mesmo se o preço atual do produto mudar. Subtotal, valor do desconto e total são derivados dos itens, sem duplicar esses valores no banco.

Clientes e produtos usam exclusão lógica. As migrations criam as tabelas, chaves estrangeiras, restrições e índices; os seeders populam dados de demonstração usando as factories.

## Estrutura do projeto

```text
.
|-- README.md
|-- teste1.md
|-- banco.png
|-- .postman/
|   `-- resources.yaml
|-- postman/
|   `-- globals/
|       `-- workspace.globals.yaml
`-- order-management/
    |-- backend/
    |   |-- factories/       # Dados de demonstração
    |   |-- migrations/      # Schema do banco via Sequelize
    |   |-- seeders/         # Usuários, clientes, produtos e pedidos iniciais
    |   |-- src/
    |   |   |-- config/      # Configuração de banco e autenticação
    |   |   |-- controllers/ # Camada HTTP
    |   |   |-- docs/        # Definição OpenAPI/Swagger
    |   |   |-- middlewares/ # Autenticação, validação e erros
    |   |   |-- models/      # Modelos Sequelize e associações
    |   |   |-- repositories/# Consultas e persistência
    |   |   |-- routes/      # Rotas REST
    |   |   |-- services/    # Regras de negócio
    |   |   `-- validators/  # Schemas de entrada
    |   |-- tests/unit/      # Testes unitários
    |   `-- package.json
    |-- docker/
    |   `-- mysql/init-test-db.sh
    |-- frontend/public/
    |   |-- css/
    |   |-- js/
    |   `-- pages/
    |-- .env.example
    |-- Dockerfile
    `-- docker-compose.yml
```

Os arquivos `README.md`, `teste1.md`, `banco.png` e as pastas `.postman/` e `postman/` ficam na raiz do repositório, fora da pasta `order-management`. Os arquivos do Postman guardam configurações do workspace; o Postman foi usado para verificação manual das requisições à API.

O fluxo do backend é organizado em rotas, controllers, services e repositories; models e associações representam o esquema relacional. O frontend consome a API usando os scripts em `frontend/public/js`.

## Como executar com Docker (Windows/PowerShell)

Requisitos: Docker Desktop com Docker Compose e Node.js 18+ instalado no host para instalar as dependências e executar migrations/seeders. Antes de iniciar os containers, abra o Docker Desktop e aguarde o engine ficar pronto; confirme no PowerShell com `docker info`.

1. Na raiz do repositório, crie o arquivo local de configuração se ainda não existir:

   ```powershell
   Set-Location .\order-management
   if (-not (Test-Path .env)) { Copy-Item .env.example .env }
   ```

2. Inicie o MySQL:

   ```powershell
   docker compose up -d db
   ```

   O banco fica disponível no host na porta `3307`. O Compose usa a porta interna `3306` para a comunicação entre os containers.

3. Instale as dependências do backend e aplique o schema e os dados iniciais. Execute os comandos a partir da pasta `order-management`:

   ```powershell
   Set-Location .\backend
   npm ci
   $env:DB_HOST = "127.0.0.1"
   $env:DB_PORT = "3307"
   npm run migrate
   npm run seed
   Remove-Item Env:DB_HOST
   Remove-Item Env:DB_PORT
   ```

   Aguarde o término bem-sucedido de cada comando antes de prosseguir. Os overrides de host e porta são apenas para executar as migrations no host; o container backend usa `db:3306`, conforme o `docker-compose.yml`.

4. Volte para `order-management` e inicie o backend:

   ```powershell
   Set-Location ..
   docker compose up -d --build backend
   ```

5. Acesse:

   - Aplicação: [http://localhost:3000](http://localhost:3000)
   - Documentação da API: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Para acompanhar os serviços ou encerrá-los:

```powershell
docker compose logs -f backend
docker compose down
```

`docker compose down` mantém o volume de dados. Para reiniciar o banco de demonstração do zero, é necessário remover especificamente o volume `order-management_mysql_data` com `docker compose down -v`; isso apaga os dados persistidos.

### Solução de problemas do Docker

Se `docker compose up` retornar `failed to connect to the docker API` ou indicar que `//./pipe/docker_engine` não foi encontrado, o CLI está instalado, mas não consegue se conectar ao engine. Inicie o Docker Desktop e aguarde a inicialização. Também é possível iniciar pelo PowerShell:

```powershell
docker desktop start
docker desktop status
docker info
```

Prossiga com `docker compose up -d db` somente quando `docker info` mostrar as informações de **Server** sem erro. Se o engine não iniciar, verifique se o Docker Desktop terminou a inicialização e se está configurado para Linux containers/WSL 2; depois consulte `docker desktop diagnose` ou os diagnósticos do Docker Desktop. Esse erro, por si só, não indica problema no `docker-compose.yml` ou no projeto.

Se o build falhar com `failed to fetch oauth token` ou `lookup auth.docker.io: no such host` ao carregar `node:20-alpine`, a falha é de acesso do Docker Desktop ao Docker Hub, antes da compilação do código. Verifique a internet, VPN/proxy/firewall e as configurações de rede ou proxy do Docker Desktop; tente novamente quando `docker pull node:20-alpine` funcionar. Para uma instalação nova é necessário baixar essa imagem para construir o backend. Se a imagem do projeto já foi construída e não houve alteração no Dockerfile ou nas dependências, é possível iniciar sem rebuild enquanto o Hub estiver indisponível:

```powershell
docker compose up -d backend
```

Esse comando reutiliza a imagem existente; ele não incorpora mudanças que dependam de reconstrução da imagem.

Se o login retornar erro interno de banco de dados e os logs do backend mostrarem `Table 'order_management.users' doesn't exist`, o schema e os dados iniciais ainda não foram aplicados. Com os containers ativos, a partir de `order-management`, execute:

```powershell
Set-Location .\backend
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3307"
npm run migrate
npm run seed
Remove-Item Env:DB_HOST
Remove-Item Env:DB_PORT
```

Confirme que os dois comandos terminaram sem erro e tente entrar novamente. Se os logs do MySQL mostrarem `/bin/sh^M: bad interpreter`, isso indica finais de linha incompatíveis no script de inicialização; o repositório configura scripts `.sh` para LF via `.gitattributes`. Em um checkout anterior a essa configuração, atualize o arquivo `order-management/docker/mysql/init-test-db.sh` do repositório antes de inicializar um banco novo.

## Execução sem container para o backend

É possível usar um servidor MySQL local ou remoto. Configure `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASS` no arquivo `order-management/.env` para apontar para esse servidor. Em seguida, a partir de `order-management/backend`:

```powershell
npm ci
npm run migrate
npm run seed
npm run dev
```

A aplicação e a API serão servidas em `http://localhost:3000`. O comando `npm start` inicia o servidor sem o modo de desenvolvimento.

## Acesso de demonstração

Os seeders criam duas contas e dados de demonstração (60 clientes, 40 produtos e 80 pedidos):

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin@orderflow.dev` | `Admin@123` |
| Operador | `operator@orderflow.dev` | `Operator@123` |

Essas credenciais são exclusivamente para desenvolvimento/demonstração. Altere-as e substitua `JWT_SECRET` por um segredo forte antes de qualquer implantação acessível a terceiros. Não publique o arquivo `.env`.

## API REST

Todas as rotas abaixo, exceto login e logout, exigem autenticação. Os endpoints de usuários exigem perfil `ADMIN`.

| Recurso | Endpoints principais |
|---|---|
| Autenticação | `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |
| Clientes | `GET/POST /api/clients`, `GET/PUT/DELETE /api/clients/:id`, `DELETE /api/clients/bulk` |
| Produtos | `GET/POST /api/products`, `GET/PUT/DELETE /api/products/:id`, `DELETE /api/products/bulk` |
| Pedidos | `GET/POST /api/orders`, `GET/PUT/DELETE /api/orders/:id`, `PATCH /api/orders/:id/status`, `DELETE /api/orders/bulk` |
| Usuários (ADMIN) | `GET/POST /api/users`, `PUT/DELETE /api/users/:id` |
| Painel | `GET /api/dashboard` |

Listagens aceitam paginação (`page`, `limit`), ordenação (`sortBy`, `sortOrder`) e filtros adequados a cada recurso. Os filtros disponíveis por endpoint estão descritos no Swagger. O status de pedido na API é `OPEN`, `PAID` ou `CANCELLED`; a interface apresenta os respectivos rótulos em português.

## Migrations, seeders e testes

Execute os comandos na pasta `order-management/backend`.

```powershell
npm run migrate       # Aplica migrations pendentes
npm run seed          # Insere dados de demonstracao
npm run migrate:undo  # Reverte todas as migrations
npm run seed:undo     # Remove os dados inseridos pelos seeders
```

Os comandos de reversão alteram/removem dados; use-os somente quando desejar limpar o schema ou os dados semeados. As factories em `backend/factories` são usadas pelos seeders para gerar dados de demonstração.

Para executar os testes unitários no PowerShell, a partir da raiz do repositório:

```powershell
Set-Location .\order-management\backend
npm ci
$env:NODE_ENV = "test"
try {
  node .\node_modules\jest\bin\jest.js --runInBand
} finally {
  Remove-Item Env:NODE_ENV
}
```

## Observações sobre o escopo

- O sistema usa MySQL e Sequelize, conforme a alternativa Node.js solicitada.
- A interface responsiva foi implementada com CSS próprio;
- Os testes automatizados disponíveis no repositório cobrem as regras unitárias listadas em `backend/tests/unit`. Para avaliar o comportamento integrado, execute a aplicação com um banco MySQL configurado e consulte os endpoints no Swagger.
