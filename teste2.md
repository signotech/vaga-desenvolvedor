<div align="center">
  <img src="https://site.signoweb.com.br/assets/images/logo-signo.svg" width="20%" />
</div>

# Instruções de execução

## Variáveis de ambiente

- Copie os conteudos de .env.example para .env
- Adicione as informações do bando de dados
    - O container mysql irá utilizar essas informações para criar seu usuário
    - O endereço da coneção é gerenciado pelo docker-compose
- Adicione seu UID
    - O valor padrão é 1000, e provavelmente não precisa ser alterado
    - Para descobrir seu UID, utilize o comando
 ```
 $ id
 ```
 - A criação da chave de criptografia é gerenciada pelo próprio container

## Execução

O projeto depende de vários containeres externos e de um container com multiplos estágios de criação, todos gerenciados pelo docker-compose. Para executar, utilize o comando

```
$ docker-compose up
```

## Migrations

Se for a primeira vez que estiver executando o projeto, o banco de dados estará vazio e sem as tabelas necessárias, para adicionar as tabelas e popular o banco de dados utilize o comando

```
$ docker-compose exec laravel-app php artisan migrate --seed
```

## Comandos adicionais

Comandos adicionais devem ser direcionados ao container do projeto. Para executar um comando utilize

```
$ docker-compose exec laravel-app <comando>
```

E o docker-compose vai se conectar com o container e executar o comando. 

### Comandos artisan

Comandos artisan são executados da seguinte maneira:

```
$ docker-compose exec laravel-app php artisan <comando>
```

# Teste para candidatos à vaga de Desenvolvedor

Olá caro desenvolvedor, nesse teste analisaremos seu conhecimento geral e inclusive velocidade de desenvolvimento. Abaixo explicaremos tudo o que será necessário.

## Instruções

O desafio consiste em implementar uma aplicação web utilizando o framework PHP Laravel, um banco de dados relacional (Mysql, Postgres ou SQLite), que terá como finalidade a inscrição de candidatos a uma oportunidade de emprego.

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

- O banco de dados deve ser criado utilizando Migrations do framework Laravel, e também utilizar Seeds e Factorys para popular as informações no banco de dados.

## Tecnologias a serem utilizadas

Devem ser utilizadas as seguintes tecnologias:

- HTML
- CSS
- Javascript
- Framework Laravel (PHP)
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

## O que iremos analisar

- Organização do código;
- Aplicação de design patterns;
- Aplicação de testes;
- Separação de módulos e componentes;
- Legibilidade;
- Criação do ambiente com Docker.

### Boa sorte!
