# Aplicação em Contêiner com NestJS e MongoDB

Este projeto é uma aplicação pronta para ser executada em um contêiner Docker, escrita em NestJS e utilizando o MongoDB como banco de dados. Ela possui os seguintes endpoints:

### /auth/login

Este endpoint é responsável pela geração de tokens JWT para autenticação.

### /jobs

Este endpoint lida com as operações relacionadas aos trabalhos, como criar, listar, atualizar e excluir trabalhos.

### /users

Este endpoint lida com as operações relacionadas aos usuários, como criar, listar, atualizar e excluir usuários.

## Pré-requisitos

Antes de executar a aplicação em um contêiner, certifique-se de ter os seguintes requisitos instalados em seu sistema:

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (versão 12 ou superior)
- NPM (Node Package Manager) ou Yarn

## Instalação e Execução

Siga as etapas abaixo para instalar e executar a aplicação:

1. Clone este repositório para o seu computador.

2. Navegue até o diretório do projeto no terminal.

3. Execute o seguinte comando para instalar as dependências do projeto:

    - npm install ou yarn install


4. Execute o seguinte comando para construir a imagem do contêiner:

   - docker-compose build



5. Após a conclusão da construção da imagem, execute o seguinte comando para iniciar o contêiner:

  - docker-compose up


A aplicação será iniciada dentro do contêiner Docker.

6. Abra o navegador e acesse [http://localhost:3001](http://localhost:3001) para usar a aplicação.

## Swagger

O Swagger é uma ferramenta de documentação interativa para APIs. Com a aplicação em execução, você pode acessar a documentação do Swagger através do seguinte link:

[http://localhost:3000/api](http://localhost:3000/api)


## Documentação Adicional

Para aprender mais sobre o NestJS, consulte a [documentação oficial](https://nestjs.com/).

Para aprender mais sobre o MongoDB, consulte a [documentação oficial](https://docs.mongodb.com/).

