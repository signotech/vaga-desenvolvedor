# Rest API para vaga de desenvolvedor na Signo Technology

Esse projeto foi desenvolvido para o teste 1 do processo seletivo da empresa Signo Technology para uma vaga de desenvolvedor júnior. Consiste em uma aplicação para cadastro de clientes, produtos e pedidos de compra.

## Instruções de execução


1. Para executar a API, comece clonando o repositório localmente:


```bash
git clone https://github.com/tomazcx/vaga-desenvolvedor.git
```


2. Acesse a pasta da API


```bash
cd test/
cd backend/
```

3. Crie um arquivo .env com base no arquivo .env.exmaple. Defina uma string aleatória para o secret do JWT e o tempo de expiração de 1d
 e adicione a seguinte URL para a variável DATABASE_URL

"postgresql://postgres:docker@signoweb-db:5432/signoweb?schema=public"


4. Inicie o contâiner docker


```bash
docker-compose up
```


5. Execute o bash do contâiner da api


```bash
docker exec -it signoweb-api bash
```


6. Execute o arquivo seed das tabelas clients e products


```bash
yarn prisma db seed
```


7. Execute os testes


```bash
yarn test
```


## Tecnologias utilizadas

Para essa api, foram utilizadas as seguintes tecnologias:

- Node.js com Typescript;
- Express, framework para gerenciar requisições HTTP da API;
- Prisma, ORM para gerenciamento de um banco de dados Postgres;
- Docker com docker-compose, para gerenciamento de contâiners da aplicação;
- Jest, para testes unitários.

## Modelagem do banco de dados

A modelagem final do banco de dados, com base na modelagem inicial fornecida, é a seguinte:

<img src="./db-model.svg" data-canonical-src="./db-model.svg" width="400" />

Foram criadas as tabelas:

- Managers: Armazenamento dos dados dos usuários com acesso ao sistema;
- Clients: Armazenamento dos dados dos clientes cadastrados;
- Products: Produtos cadastrados;
- OrderProducts: Informações referentes a um produto a qual foi feito um pedido, no caso a quantidade e o momento do registro;
- Orders: Tabela de armazenamento dos dados dos pedidos;
- JoinOrdersProducts: Tabela pivô para relação many-to-many entre a tabela Orders e OrderProducts.

## Arquitetura do sistema

Para essa API foram aplicadas os princípios da arquitetura limpa e seguindo o design pattern SOLID, na qual:

- Foram separados módulos referentes a cada entidade do banco;
- Cada classe é única e tem responsabilidade com apenas um módulo (cliente, autenticação de usuário, produto ou pedido), seguindo o Single Responsability Principle;
- Classes únicas para cada caso de uso e controladores, no intuito de garantir o Open Closed Principle;
- Injeção de dependências com a biblioteca Inversify, para garantir o Dependency Inversion Principle. Classes de alto nível não dependem de classes de níveis mais baixos.
- Classes dependem de interfaces ou abstrações de alto nível para serem implementadas, preservando o Interface Segregation Principle.

Para aplicar os princípios da arquitetura limpa, o projeto foi separado nas seguintes camadas:

- Domain: Camada de domínio, de mais alto nível. Contém as entidades principais assim como as interfaces para os repositórios, DTOs e as abstrações dos casos de uso;
- Implementation: Camada de implementação do domínio, onde estão as classes que implementam as abstrações dos casos de uso e os repositórios. Foram escritos testes unitários para cada caso de uso, garantindo o funcionamento das regras de negócio principais;
- Infra: Camada de infraestrutura, onde está o cliente que faz acesso ao banco de dados juntamente com o arquivo de seed e as migrations (contidas junto com o schema no diretório prisma, no root do back-end). Além disso, os controllers HTTP e as rotas para cada módulo com validações de requisição.
- Presentation: Camada de apresentação, onde está o arquivo de inicialização do servidor e a implementação das rotas.

A aplicação foi projetada dessa forma a fim de desenvolver um sistema escalável, organizado, limpo e desacoplado. Dessa forma, fazendo com que seja manutenível e de fácil compreensão.

## Testes

Foram escritos testes unitários para testar cada caso de uso do sistema. Para executá-los, abra o terminal do contâiner da api e insira:

```bash
yarn test
```
