<div align="center">
  <img src="https://signotech.com.br/wp-content/uploads/2023/03/SignoTech.webp" width="20%" />
</div>

# Teste para candidatos à vaga de Desenvolvedor

Olá caro desenvolvedor, nesse teste analisaremos seu conhecimento geral e inclusive velocidade de desenvolvimento. Abaixo explicaremos tudo o que será necessário.

## Instruções

O desafio consiste em implementar uma aplicação web utilizando o framework PHP Laravel ou NodeJS, um banco de dados relacional (Mysql, Postgres ou SQLite), que terá como finalidade a inscrição de candidatos a uma oportunidade de emprego.

Sua aplicação deve possuir:

- CRUD de vagas:
  - Criar, editar, excluir e listar vagas.
  - A vaga pode ser CLT, Pessoa Jurídica ou Freelancer.
- CRUD de candidatos:
  - Criar, editar, excluir e listar candidatos.
- Um cadidato pode se inscrever em uma ou mais vagas.
- Deve ser ser possível "pausar" a vaga, evitando a inscrição de candidatos.
- Cada CRUD:
  - Deve ser filtrável e ordenável por qualquer campo, e possuir paginação de 20 itens.
  - Deve possuir formulários para criação e atualização de seus itens.
  - Deve permitir a deleção de qualquer item de sua lista.
  - Implementar validações de campos obrigatórios e tipos de dados.
- Testes unitários e de unidade.

## Banco de dados

- O banco de dados deve ser criado utilizando migrations, e também utilizar Seeds e Factorys para popular as informações no banco de dados.

## Tecnologias a serem utilizadas

Devem ser utilizadas as seguintes tecnologias:

- HTML
- CSS
- Javascript
- Framework Laravel (PHP) OU NodeJS + ReactJS
- Docker (construção do ambiente de desenvolvimento)
- Mysql, Postgres ou SQLite

## Entrega

- Para iniciar o teste, faça um fork deste repositório; **Se você apenas clonar o repositório não vai conseguir fazer push.**
- Crie uma branch com o seu nome completo;
- Altere o arquivo teste2.md com as informações necessárias para executar o seu teste (comandos, migrations, seeds, etc);
- Depois de finalizado, envie-nos o pull request;

## Bônus

- API Rest JSON para todos os CRUDS listados acima.
- Permitir deleção em massa de itens nos CRUDs.
- Permitir que o usuário mude o número de itens por página.
- Implementar autenticação de usuário na aplicação.
- Documentação da API (usando Swagger ou Postman)
- Deploy dentro do docker

## O que iremos analisar

- Organização do código;
- Aplicação de design patterns;
- Aplicação de testes; (diferencial, não obrigatório)
- Separação de módulos e componentes;
- Legibilidade;
- Criação do ambiente com Docker. (diferencial, não obrigatório)

### Boa sorte!

---

# Portal RH - Sistema de Recrutamento

## 1. Descrição do projeto

O Portal RH é uma aplicação web para gerenciamento de processos de recrutamento e seleção.

O sistema permite cadastrar e administrar vagas de emprego, candidatos e inscrições, facilitando o acompanhamento dos processos seletivos.

## 2. Tecnologias utilizadas

### Frontend
- React 19
- JavaScript
- Vite
- HTML e CSS

### Backend
- Node.js
- Express
- API REST
- MySQL2
- Dotenv
- CORS

### Banco de dados e infraestrutura
- MySQL 8.4
- Docker
- Docker Compose

## 3. Funcionalidades implementadas

### 3.1 Gerenciamento de vagas
- Cadastro de vagas.
- Listagem, edição e exclusão de vagas.
- Tipos de contratação: CLT, PJ e Freelancer.
- Controle de status: Aberta e Pausada.
- Pesquisa e filtros.
- Ordenação das informações.
- Paginação.
- Configuração da quantidade de registros exibidos.
- Bloqueio de inscrições em vagas pausadas.

### 3.2 Gerenciamento de candidatos
- Cadastro de candidatos.
- Listagem, edição e exclusão de candidatos.
- Validação de campos obrigatórios.
- Validação de e-mail.
- Controle de duplicidade de CPF e e-mail.
- Pesquisa e filtros.
- Ordenação das informações.
- Paginação.

### 3.3 Gerenciamento de inscrições
- Cadastro de inscrições em vagas.
- Listagem e exclusão de inscrições.
- Atualização do status da inscrição.
- Associação entre candidatos e vagas.
- Impedimento de inscrições duplicadas.
- Bloqueio de inscrições em vagas pausadas.

### 3.4 Dashboard
- Exibição do total de vagas cadastradas.
- Exibição do total de vagas abertas.
- Exibição do total de candidatos.
- Exibição do total de inscrições.

## 4. Pré-requisitos

Para executar o projeto, é necessário instalar:

- Node.js
- npm
- Docker Desktop
- Docker Compose

## 5. Estrutura do projeto

```text
teste2-renato-cruz/
├── backend/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── tests/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── docker/
│   └── compose.yaml
├── frontend/
│   └── package.json
└── teste2.md
``r
## 6. Configuração do banco de dados

O projeto utiliza MySQL 8.4 executado em um container Docker.

Para iniciar o banco de dados, execute na pasta raiz:

`docker compose -f docker/compose.yaml up -d`

Para verificar se o container está em execução:

`docker ps`

As tabelas do banco de dados estão definidas no arquivo `backend/database/schema.sql`.

Em uma instalação nova, após iniciar o container, execute:

`Get-Content -Raw .\backend\database\schema.sql | docker exec -i teste2-mysql mysql -urenato -prenato123 teste2`

As credenciais acima são destinadas exclusivamente ao ambiente local de desenvolvimento.
## 7. Como executar o Backend

Abra um terminal PowerShell e acesse a pasta do backend:

`cd backend`

Crie o arquivo de configuração local a partir do modelo:

`Copy-Item .env.example .env`

Instale as dependências:

`npm install`

Inicie o servidor:

`npm start`

O backend ficará disponível em:

`http://localhost:3000`

O arquivo `backend/.env` contém as configurações de conexão com o banco de dados.
## 8. Como executar o Frontend

Abra outro terminal PowerShell e acesse a pasta do frontend:

`cd frontend`

Instale as dependências:

`npm install`

Inicie a aplicação:

`npm run dev`

O frontend ficará disponível em:

`http://localhost:5173`
## 9. Testes automatizados

Para executar os testes, acesse a pasta do backend:

`cd backend`

Execute:

`npm test`

O projeto possui 26 testes automatizados, que verificam o funcionamento das rotas da API, validações, operações de cadastro, edição, consulta e exclusão.

Para executar os testes com relatório de cobertura:

`node --experimental-test-coverage --test`
## 10. Endpoints da API REST

### Vagas
- `GET /api/vagas` – Lista as vagas.
- `POST /api/vagas` – Cadastra uma vaga.
- `PUT /api/vagas/:id` – Atualiza uma vaga.
- `DELETE /api/vagas/:id` – Exclui uma vaga.

### Candidatos
- `GET /api/candidatos` – Lista os candidatos.
- `POST /api/candidatos` – Cadastra um candidato.
- `PUT /api/candidatos/:id` – Atualiza um candidato.
- `DELETE /api/candidatos/:id` – Exclui um candidato.

### Inscrições
- `GET /api/inscricoes` – Lista as inscrições.
- `POST /api/inscricoes` – Cadastra uma inscrição.
- `PUT /api/inscricoes/:id` – Atualiza o status de uma inscrição.
- `DELETE /api/inscricoes/:id` – Exclui uma inscrição.
## 11. Observações importantes

- O banco de dados é iniciado separadamente pelo Docker Compose.
- O backend e o frontend são executados em terminais independentes.
- O arquivo `.env` contém as configurações locais de conexão com o MySQL.
- Não compartilhar credenciais de desenvolvimento em ambientes de produção.
- As inscrições são relacionadas aos candidatos e às vagas por chaves estrangeiras.
- Ao excluir um candidato ou uma vaga, suas inscrições relacionadas também são excluídas.

## 12. Status do projeto

O Portal RH possui funcionalidades de gerenciamento de vagas, candidatos e inscrições, integração com banco de dados MySQL, API REST e testes automatizados.








