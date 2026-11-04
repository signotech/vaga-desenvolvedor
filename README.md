# OrderFlow

Aplicação web para gerenciamento de pedidos de compra, desenvolvida como solução para o [Teste 1](./teste1.md). O sistema reúne uma interface responsiva, uma API REST e persistência relacional.

## Funcionalidades

- CRUD de clientes, produtos e pedidos, com confirmação de exclusão.
- Busca, filtros, ordenação e paginação nas listagens; exclusão em massa.
- Pedidos com múltiplos produtos, preços históricos, desconto e controle de estoque por status.
- Autenticação por cookie `HttpOnly`, perfis de acesso e administração de usuários.
- Painel inicial, navegação entre entidades e documentação interativa da API.

## Tecnologias

- Node.js 18+, Express e Sequelize.
- MySQL 8.4.
- HTML, CSS e JavaScript.
- Docker Compose.
- Jest e Supertest.

## Executar localmente com Docker

Requisitos: Docker Desktop com Docker Compose e Node.js 18 ou superior. Antes de executar os comandos, inicie o Docker Desktop e aguarde o engine ficar pronto; confirme com `docker info`.

No PowerShell, a partir da raiz do repositório:

```powershell
Set-Location .\order-management
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
docker compose up -d db

Set-Location .\backend
npm ci
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3307"
npm run migrate
npm run seed
Remove-Item Env:DB_HOST
Remove-Item Env:DB_PORT

Set-Location ..
docker compose up -d --build backend
```

Após a inicialização:

- Aplicação: [http://localhost:3000](http://localhost:3000)
- Swagger: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

O MySQL fica disponível no host na porta `3307`. Os comandos de migration e seed devem terminar com sucesso antes de iniciar o backend.

Se o login mostrar erro interno de banco de dados, confira se `npm run migrate` e `npm run seed` terminaram sem erros. A tabela `users` precisa existir no banco antes de autenticar. Se necessário, repita esses dois comandos conforme as instruções detalhadas no [teste1.md](./teste1.md).

### Problemas comuns ao iniciar

- **`failed to connect to the docker API` / `docker_engine` não encontrado:** inicie o Docker Desktop, aguarde o engine e confirme com `docker info`.
- **`failed to fetch oauth token` / `lookup auth.docker.io: no such host`:** o Docker não consegue resolver/acessar o Docker Hub para baixar a imagem base. Verifique a internet, VPN/proxy e as configurações de rede do Docker Desktop; depois tente `docker pull node:20-alpine` novamente. Em uma instalação nova, baixar a imagem é necessário para construir o backend. Se a imagem do projeto já foi construída e não mudou o Dockerfile nem as dependências, tente `docker compose up -d backend` sem `--build` enquanto o Docker Hub estiver indisponível.
- **`Table 'order_management.users' doesn't exist` ou erro interno ao entrar:** execute `npm run migrate` e `npm run seed` na pasta `order-management/backend`, com `DB_HOST=127.0.0.1` e `DB_PORT=3307`, conforme os passos acima.
- **`/bin/sh^M: bad interpreter`:** finais de linha incompatíveis no script de inicialização MySQL. Os scripts `.sh` estão configurados para LF no `.gitattributes`; em um checkout antigo, atualize os arquivos do repositório antes de recriar o banco.

### Contas de demonstração

| Perfil | E-mail | Senha |
|---|---|---|
| Administrador | `admin@orderflow.dev` | `Admin@123` |
| Operador | `operator@orderflow.dev` | `Operator@123` |

Use essas contas somente em ambiente local. Antes de qualquer implantação, altere as credenciais e configure um `JWT_SECRET` forte no arquivo `order-management/.env`. Não compartilhe esse arquivo.

## Estrutura

```text
.
├── README.md
├── teste1.md
├── banco.png
├── .postman/
│   └── resources.yaml
├── postman/
│   └── globals/
│       └── workspace.globals.yaml
└── order-management/
    ├── backend/
    │   ├── factories/       # Dados de demonstração
    │   ├── migrations/      # Schema do banco via Sequelize
    │   ├── seeders/         # Dados iniciais
    │   └── src/
    │       ├── controllers/
    │       ├── docs/
    │       ├── middlewares/
    │       ├── models/
    │       ├── repositories/
    │       ├── routes/
    │       ├── services/
    │       └── validators/
    ├── docker/              # Inicialização do MySQL
    └── frontend/public/     # HTML, CSS e JavaScript da aplicação
```

Os arquivos de configuração em `.postman/` e `postman/` ficam na raiz, fora de `order-management`. O Postman foi usado durante a verificação manual das requisições da API.

## Documentação e testes

O [teste1.md](./teste1.md) mantém o enunciado original e documenta em detalhe o modelo de dados, endpoints, configuração, execução sem Docker, migrations, seeds e testes.
