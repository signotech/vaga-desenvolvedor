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

# Implementação do desafio — Laravel

## Tecnologias e requisitos

- PHP 8.3 ou superior.
- Laravel 13.
- Composer.
- Node.js e npm.
- MySQL.
- Blade, HTML, CSS e JavaScript.
- Pest para testes automatizados.

## Instalação e configuração

Clone o repositório e acesse a pasta do projeto. Em seguida, instale as dependências do PHP:

```bash
composer install
```

Crie o arquivo de ambiente a partir do exemplo:

```powershell
Copy-Item .env.example .env
```

Gere a chave da aplicação:

```bash
php artisan key:generate
```

Crie um banco de dados MySQL para o projeto e configure no arquivo `.env` as variáveis `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD`, conforme o ambiente local.

Execute as migrations:

```bash
php artisan migrate
```

Popule o banco com dados de exemplo:

```bash
php artisan db:seed
```

Instale e compile as dependências do front-end:

```powershell
npm.cmd install
npm.cmd run build
```

Inicie o servidor:

```bash
php artisan serve
```

A aplicação estará disponível em `http://127.0.0.1:8000`.

## Estrutura do banco de dados

As migrations principais são:

- `2026_10_31_182722_create_customers_table.php`: tabela de clientes.
- `2026_10_31_182736_create_products_table.php`: tabela de produtos.
- `2026_10_31_182747_create_orders_table.php`: tabela de pedidos.
- `2026_10_31_182757_create_order_items_table.php`: itens dos pedidos.

O projeto também utiliza migrations padrão do Laravel para usuários, cache e filas.

## Seeds e Factories

O projeto utiliza factories para gerar clientes e produtos.

O `DatabaseSeeder` cria:

- 25 clientes.
- 30 produtos.
- 30 pedidos com clientes e status variados.
- De 1 a 4 itens por pedido, com quantidades e preços unitários registrados.

Para gerar os dados:

```bash
php artisan db:seed
```

## Testes automatizados

Execute os testes com:

```bash
php artisan test
```

Os testes utilizam SQLite em memória, conforme configuração do `phpunit.xml`, sem interferir no banco de dados da aplicação.

A suíte contempla os cadastros, atualizações e exclusões de clientes, produtos e pedidos, além das validações e regras de relacionamento.