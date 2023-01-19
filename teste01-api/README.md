<div align="center">
  <img src="https://site.signoweb.com.br/assets/images/logo-signo.svg" width="20%" />
</div>

# Teste para candidatos à vaga de Desenvolvedor
### Canditado a vaga: Pedro Ferreira

## Instruções

Para este desafio criar um API com node para as rotas da aplicação e para criar o banco de dados, também usei o Next.js para criar o front-end.

## Tecnologias Usadas:

 - Node.js
 - Prisma
 - Docker

# API:
## Como Iniciar o Projeto:
Primeiro entre na pasta da api, baixar as bibliotecas e executar o script docker-compose.yml para criar o container docker para o banco de dados postgres.

```bash
cd teste01-api

yarn
#ou
npm install

docker-compose up -d
#ou
docker compose up -d
```
Adicione um arquivo chamado: ".env" para usar as variáveis de ambiente e use como base o arquivo ".env.example" que está na pasta do projeto:
```bash
DATABASE_URL="postgresql://teste:teste@localhost:5432/teste?schema=public"

JWT_TOKEN=6865ac9b14d3a3d615ae70419ef8198a
JWT_EXPIRES_IN=1d

```

Depois de iniciar o container e adicionar o arquivo .env vamos rodar as migrations para criar o banco de dados da aplicação

```bash
yarn prisma migrate dev --name teste01-db
```

Agora com o banco de dados certo, vamos iniciar a api (a api rodará na porta 3000)

```bash
yarn dev
#ou
npm run dev
```