# Projeto Signo Jobs

Projeto desenvolvido como desafio para vaga de desenvolvedor junior,
o projeto é um portal de vagas que permite tanto ao candidato se
candidatar a vaga quanto ao Empregador fornecer oportunidades.

## Estrutura do Projeto

Aqui você encontra a pasta `/signo_jobs`, essa é a pasta onde o projeto foi criado.
Então para a descrição do projeto, que está abaixo, vamos usar como root a pasta do projeto (`/signo_jobs`).

- ## `/`

  Na base do projeto você pode encontrar os arquivos de configuração do projeto e as pastas onde
  contém a aplicação, aqui podemos ver o arquivo `sequelize.js`, que foi usado para configurar e popular nosso banco de dados.

- ## `/public`

  Aqui temos todos os arquivos estáticos da nossa aplicação.

- ## `/postgres-data`

  Essa pasta é criada automaticamente, ela é basicamente nosso banco de dados local.

- ## `/node_modules`

  Essa pasta guarda todas as bibliotecas e pacotes instalados para que a aplicação rode.

- ## `/src`

  Aqui é de fato onde organizamos o código de nossa aplicação.

- ## `/src/components`

  Aqui você pode encontrar todos os componentes JSX de nossa aplicação.

- ## `/src/__tests__`

  Os testes realizados em `Jest` da aplicação ficam nessa pasta.

- ## `/src/hooks`

  Hooks personalizados ajudam aplicação ficar mais organizada, aqui é onde você encontra os hooks personalizados dessa aplicação.

- ## `/src/interfaces`

  Para uma tipagem de qualidade a aplicação de interfaces é essêncial, nessa pasta estão guardados nossas interfaces/types.

- ## `/src/styles`

  Aqui é onde deixamos nossas folhas de estilo globais.

- ## `/src/utils`

  Como o nome já diz, a pasta utils guarda todos os blocos de códigos que podem ajudar em diversas
  partes da aplicação, seguindo um conceito de código DRY.

- ## `/src/schemas`

  Nossa aplicação tem os dados válidados pela biblioteca `Zod`, para fazer essa validação construimos `Schemas`, que você pode encontrar nessa pasta.

- ## `/src/pages`

  O NextJS possui um sistemas de rotas próprio, então essa pasta serve como um guia para as rotas da aplicação, aqui você encontra nossas rotas.

- ## `/src/pages/api`

  Da mesma forma que as nossas `pages`, tudo que estiver dentro dessa pasta é considerado uma rota, mas a diferença que ela serve a nossa api, então aqui estão as rotas de nossa API.

- ## `/src/server`
  A pasta `server` é onde está o nosso código do back-end, nela você pode encontrar, controllers, services, models, nossas migrations e seeders do banco de dados e também a pasta config que guarda arquivos de configuração para validação das rotas e de autenticação, também da conexão com o banco de dados.

## Tecnologias

- **Database:** Postgres
- **ORM:** Sequelize
- **Framework:** NextJS
- **Testes:** Jest
- **Ambiente:** NodeJS
- **CSS/Pre-processador:** Sass
- **Conteinerização:** Docker + DockerCompose
- **Validations:** Zod

# Como rodar o projeto

O projeto que é feito em NextJS tem uma dependência que é seu banco de dados em Postgres.

Para que tenhamos a melhor experiência, é necessário que tenha instalado na maquina a ferramenta `Docker`,
ela vai permitir que os containers da aplicação trabalhem em harmonia e inicializar nosso banco de dados.

Para isto, certifique-se da instalação da ferramenta, após navegue via terminal até a pasta
`/signo_jobs`, e então, digite o seguinte comando em seu terminal: `docker-compose up -d`

para nosso banco de dados funcionar é necessário rodar o seguinte comando: `docker-compose up -d`, depois
para popular o banco `npm run database:init`, agora podemos iniciar a aplicação: `npm run dev`.

## Comandos

- `docker-compose up -d`
- `npm run database:init`
- `npm run dev`

\*\ caso já tenha populado o banco e quer destruir os dados, certifique que o container está rodando e digite o seguinde comando no terminal: `npm run database:destroy`

você já pode ver a aplicação rodando em: http://localhost:3000

# API

Todo o Back-End da aplicação é servido via API Rest, as respostas em JSON facilitam
a comunicação com o Front que utiliza React com NextJS.

O projeto usa a Biblioteca `Zod` para validar os dados, então em caso de erro, existe um padrão
de resposta para as rotas, o status de erro padrão é o `500` e no corpo da resposta contém um
objeto com uma chave `error` que guarda o motivo do erro.

...Em Breve Documentação da API.
