# *Controle de projetos - teste_técnico_backend*
## Tecnologias Utilizadas; 
- Node.js
- Express
- JavaScript
- TypeScript
- Sequelize
- Zod
- JsonWebToken
- Bcryptjs
- Cors
- SGBD = PostgreSQL

## Configuração do banco de dados; 
- Crie um aquivo .env e configure o banco de dados desejado seguindo o exemplo abaixo;

- Todos os campos devem ser preenchidos;
```
  DATABASE_URL="postgres://Micro:123456@localhost:5432/teste_tecnico"
  APP_PORT=3000
  DB= teste_tecnico
  DB_USER=Micro
  DB_PASSWORD=123456
  DB_HOST=localhost
  DB_PORT=5432
  DB_DIALECT=postgres
  SECRET_KEY="chaveSecreta"
```
 
## Comandos para inicialização da Api; 
- Apos a configuração do banco de dados basta criar as tabelas e popular o banco de dados seguindo as intruções abaixo; 

- Todas as migrations e seeds ja adicionadas ao projeto, basta executar os seguintes comando no terminal; 
  - Criar todas a tabelas: `npx sequelize-cli db:migrate` 
  - Popular todas as tabelas: `npx sequelize-cli db:seed:all`
  
- Para criação de uma única tabela;
  - `npx sequelize-cli migration:generate --name <nome da migração>`
 
- Para popular uma única tabela;
  - `npx sequelize-cli seed:generate --name<nome do seed>`

- Para iniciar a Api localmente;
  - `npm run dev`

## Usuario Admin 
  - Após a criação das tabelas, será criada uma tabela chamada "admin" que já estará populada com um usuário e senha;   
    - Usuário: `users@admin.com`
    - Senha:  `123456`

## **Rotas - /login**

## Endpoints

| Método | Endpoint              | Responsabilidade                                    |
| ------ | --------------------- | --------------------------------------------------- |
| POST   | /login                | Realiza o login com admin                           |
| GET    | /login/:id            | Listar um admin e seus dados                        |

#

## Regras da aplicação

### **POST /login**
- É possível realizar o login enviando apenas **_email_** e **_password_** através do corpo da requisição;

- **Sucesso**:
  - Body esperado: um objeto contendo o token do admin cadastrado
  - Status esperado: _200 OK_;
  
   - **Exemplos de retornos**:
     | Dados de entrada: |
     | ----------------- |
     | Body: Formato Json|

     ```json
     {
       "email_user": "users@admin.com",
       "password_user": "123456"
     }
     ```
    - Realizando o login com sucesso:

      | Resposta do servidor:      |
      | -------------------------- |
      | Body: Formato Json         |
      | Status code: _200 OK_      |

      ```json
      {
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWRtaW4iOnRydWUsImlhdCI6MTY4NjMyNjgxMSwiZXhwIjoxNjg2NDEzMjExLCJzdWIiOiIxIn0.jYPZwX_WF8mNV3a4f8aqe5vNDcZq0de8QjbC0uNs3B0"
      }
      ```
      
### **GET /login/:id**

- **Sucesso**:
  - Body esperado: um objeto contendo os dados do admin cadastrado, ocultando a senha;
  - Status esperado: _200 OK_;

- **Exemplos de retornos**:

  - Listando um admin com sucesso:

    | Resposta do servidor: |
    | --------------------- |
    | Body: Formato Json    |
    | Status code: _200 OK_ |
    |                       |

    ```json
    {
      "id": 2,
      "email_user": "users@admin.com",
      "is_admin": true,
      "createdAt": "2023-06-02T20:47:43.475Z",
      "updatedAt": "2023-06-02T20:47:43.475Z"
    }
    ```

## **Rota - /client**

## Endpoints

| Método | Endpoint                         | Responsabilidade                         |
| ------ | -------------------------------- | ---------------------------------------- |
| POST   | /client                          | Cadastrar um novo cliente                |
| GET    | /client                          | Listar todos os cliente                  |
| PATCH  | /client/:id                      | Atualizar um cliente                     |
| PUT    | /client/                         | Excluir um cliente ou mais               |

## Regras da aplicação

### **POST - /client**

- É possível cadastrar um novo cliente  enviando os seguintes dados:
  - **name_client**: tipo **_string_**
  - **cpf_client**: tipo **_string_**
  - **email_client**: tipo **_string_** 

- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
   {
    "name_client": "Weer",
    "cpf_client": "1234567",
    "email_client": "Weer@mail.com"
   }
  ```

  - Criando um cliente com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "name_client": "Weer",
      "cpf_client": "1234567",
      "email_client": "Weer@mail.com"
      "updatedAt": "2023-06-07T22:43:02.016Z",
      "createdAt": "2023-06-07T22:43:02.016Z"
    }
    
    ```

#

### **GET - /client**
- Não é preciso enviar nenhum dados para o corpo da requisição.
 
- retorna um array com os dados dos clientes cadastrados;

- Por padão a rota está com  paginação de 20 itens, para alterar basta utilizar a seguinte rota;
  - Rota para paginação: `/client?page=1&perPage=40`.
  
- É possível ordenar qualquer campo;
  -  Ordenação decrescente pelo id: `/client?id=DESC`
  -  Ordenação ascendente pelo nome: `/client?name_client=ASC`

- É possivel realizar filtros em qualquer campo;
   - Filtro pelo id: `/client?id=1`
   - Filtro pelo nome: `/client?name_client=Weer`
 
- **Exemplos**:

  - Listando os clientes com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

    ```json
    [
       {
        "id": 1,
        "name_client": "Weer",
        "cpf_client": "1234567",
        "email_client": "Weer@mail.com"
        "updatedAt": "2023-06-07T22:43:02.016Z",
        "createdAt": "2023-06-07T22:43:02.016Z"
      },
      {
        "id": 2,
        "name_client": "Tania Corkery",
        "cpf_client": "1234545",
        "email_client": "Tania45@mail.com",
        "createdAt": "2023-06-09T15:52:32.620Z",
        "updatedAt": "2023-06-09T15:52:32.620Z"
      },
    ]
    ```
#

### **PATCH - /client/:id**

- É possível atualizar todos os dados de um cliente com exceção do _id_;
- Todos os campos são opcionais;
- Caso algum campo não seja enviado o campo vazio será ignorado e somente os dados enviados serão atualizados;

- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
		"name_client": null,
		"cpf_client": "26536355",
		"email_client": null
  }
  ```

  - Atualizando um cliente com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

  ```json
  {
    "id": 1,
    "name_client": "Weer",
    "cpf_client": "26536355",
    "email_client": "Weer@mail.com"
    "updatedAt": "2023-06-07T22:43:02.016Z",
    "createdAt": "2023-06-07T22:43:02.016Z"
  }
  ```
#

### **PUT - /client**

- É possível deletar um cliente enviando seu id, ou varios cliente;

- Caso queria deleta um cliente basta enviar o seu id pelo corpo da requisição;
   - ```json
      {
        "massDelete": 1
      }
     ```
 - Caso queira deletar varios clientes basta enviar um array com os ids deles;
    - ```json
      {
        "massDelete": [1,2,3]
      }
     ```
     
- **Exemplos de retornos**:

  - Deletando um cliente com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |

#

## **Rota - /order**

## Endpoints

| Método | Endpoint                         | Responsabilidade                         |
| ------ | -------------------------------- | ---------------------------------------- |
| POST   | /order                           | Cadastrar um novo Pedido                 |
| GET    | /order                           | Listar todos os pedidos                  |
| PATCH  | /order/:id                       | Atualizar um pedido                      |
| PUT    | /order                           | Excluir um pedido ou mais                |

## Regras da aplicação

### **POST - /client**

- É possível cadastrar um novo pedido enviando os seguintes dados:
  - **request_code**: tipo **_number_**
  - **request_date**: tipo **_string_**
  - **request_status**: tipo **_string_** 
  - **client_id**: tipo **_number_** 
  
- Só e possível criar um pedido enviando o id de um cliente já existente. 
 
- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
   {
    "request_code": 168624,
    "request_date": "08/06/2023",
    "request_status": "Em Aberto",
    "client_id": 1
   }
  ```

  - Criando um pedido com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "request_code": 168624,
      "request_date": "2023-08-06T03:00:00.000Z",
      "request_status": "Em Aberto",
      "client_id": 1,
      "updatedAt": "2023-06-08T16:13:08.429Z",
      "createdAt": "2023-06-08T16:13:08.429Z"
    }
    ```

#

### **GET - /order**
- Não é preciso enviar nenhum dados para o corpo da requisição.
 
- Retorna um array com os dados dos pedidos cadastrados;

- Por padão a rota está com  paginação de 20 itens, para alterar basta utilizar a seguinte rota;
  - Rota para paginação: `/order?page=1&perPage=40`.
  
- É possível ordenar qualquer campo;
  -  Ordenação decrescente pelo id: `/order?id=DESC`
  -  Ordenação ascendente pela data: `/order?request_date"=ASC`

- É possivel realizar filtros em qualquer campo;
   - Filtro pelo id: `/order?id=1`
   - Filtro pela data: `/order?request_date="08/06/2023"`
 
- **Exemplos**:

  - Listando um pedido com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

    ```json
    [
        {
        "id": 1,
        "request_code": 168624,
        "request_date": "2023-08-06T03:00:00.000Z",
        "request_status": "Em Aberto",
        "client_id": 1,
        "updatedAt": "2023-06-08T16:13:08.429Z",
        "createdAt": "2023-06-08T16:13:08.429Z"
      },
      {
        "id": 2,
        "request_code": 10009,
        "request_date": "2023-08-06T03:00:00.000Z",
        "request_status": "Pago",
        "createdAt": "2023-06-08T18:11:09.023Z",
        "updatedAt": "2023-06-08T18:11:09.023Z",
        "client_id": 2
      },
    ]
    ```
#

### **PATCH - /order/:id**

- É possível atualizar o **request_status** de um pedido;
- Todos os campos são opcionais;
- Caso algum campo não seja enviado o campo vazio será ignorado e somente os dados enviados serão atualizados;

- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
	  "request_status": null
  }
  ```

  - Atualizando um projeto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

  ```json
  {
    "id": 1,    
    "request_code": 168624,
    "request_date": "2023-08-06T03:00:00.000Z",
    "request_status": "Em Aberto",
    "client_id": 1,
    "updatedAt": "2023-06-08T16:13:08.429Z",
    "createdAt": "2023-06-08T16:13:08.429Z"
  }
  ```

#

### **PUT - /order**

- É possível deletar um pedido enviando seu id, ou varios pedidos;

- Caso queria deleta um pedido basta enviar o seu id pelo corpo da requisição;
   - ```json
      {
        "massDelete": 1
      }
     ```
 - Caso queira deletar varios pedidos basta enviar um array com os ids deles;
    - ```json
      {
        "massDelete": [1,2,3]
      }
     ```
     
- **Exemplos de retornos**:

  - Deletando um pedido com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |
    
    
    ## **Rota - /products**

## Endpoints

| Método | Endpoint                           | Responsabilidade                         |
| ------ | --------------------------------   | ---------------------------------------- |
| POST   | /products                          | Cadastrar um novo produto                |
| GET    | /products                          | Listar todos os produtos                 |
| PATCH  | /products/:id                      | Atualizar um produto                     |
| PUT    | /products                          | Excluir um produto ou mais               |

## Regras da aplicação

### **POST - /products**

- É possível cadastrar um novo produto enviando os seguintes dados:
  - **title_product**: tipo **_string_**
  - **sku_product**: tipo **_string_**
  - **price_product**: tipo **_number_** 
  - **stock_product**: tipo **_number_** 
  - **product_order_id**: tipo **_number_** 
  
- Só e possível criar um produto enviando o id de um pedido já existente. 
 
- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
   {
		"title_product": "Generic Rubber Salad",
		"sku_product": "SKU:1320501-Generic Rubber Salad",
		"price_product": 383.00,
		"stock_product": 10,
		"product_order_id": 1
   }
  ```

  - Criando um produto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _201 CREATED_ |

    ```json
    {
      "id": 1,
      "title_product": "Generic Rubber Salad",
      "sku_product": "SKU:1320501-Generic Rubber Salad",
      "price_product": 383.00,
      "stock_product": 10,
      "createdAt": "2023-06-02T20:47:51.223Z",
      "updatedAt": "2023-06-02T20:47:51.223Z",
      "product_order_id": 1
    }
    ```

#

### **GET - /products**
- Não é preciso enviar nenhum dados para o corpo da requisição.
 
- Retorna um array com os dados dos pedidos cadastrados;

- Por padão a rota está com  paginação de 20 itens, para alterar basta utilizar a seguinte rota;
  - Rota para paginação: `/order?page=1&perPage=40`.
  
- É possível ordenar qualquer campo;
  -  Ordenação decrescente pelo id: `/products?id=DESC`
  -  Ordenação ascendente pelo titulo: `/products?title_product"=ASC`

- É possivel realizar filtros em qualquer campo;
   - Filtro pelo id: `/products?id=1`
   - Filtro pelo titulo: `/products?title_product="Generic Rubber Salad"`
 
- **Exemplos**:

  - Listando os produtos com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

    ```json
    [
      {
        "id": 1,
        "title_product": "Generic Rubber Salad",
        "sku_product": "SKU:1320501-Generic Rubber Salad",
        "price_product": 383.00,
        "stock_product": 32,
        "createdAt": "2023-06-02T20:47:51.223Z",
        "updatedAt": "2023-06-02T20:47:51.223Z",
        "product_order_id": 1
      },
      {
        "id": 2,
        "title_product": "Gorgeous Concrete Shirt",
        "sku_product": "SKU:1754961-Gorgeous Concrete Shirt",
        "price_product": 70.00,
        "stock_product": 77,
        "createdAt": "2023-06-02T20:47:51.223Z",
        "updatedAt": "2023-06-02T20:47:51.223Z",
        "product_order_id": 2
      },
    ]
    ```
#

### **PATCH - /products/:id**

- É possível atualizar os dados de um produto;
- Todos os campos são opcionais;
- Caso algum campo não seja enviado o campo vazio será ignorado e somente os dados enviados serão atualizados;

- **Exemplos**:
  | Dados de entrada: |
  | ----------------- |
  | Body: Formato Json |

  ```json
  {
    "title_product": null,
    "price_product": 55,
    "stock_product": null
  }
  ```

  - Atualizando um produto com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: Formato Json |
    | Status code: _200 OK_ |

  ```json
      {
        "id": 1,
        "title_product": "Generic Rubber Salad",
        "sku_product": "SKU:1320501-Generic Rubber Salad",
        "price_product": 55.00,
        "stock_product": 32,
        "createdAt": "2023-06-02T20:47:51.223Z",
        "updatedAt": "2023-06-02T20:47:51.223Z",
        "product_order_id": 1
      }
  ```

#

### **PUT - /products**

- É possível deletar um produto enviando seu id, ou varios pedidos;

- Caso queria deleta um produto basta enviar o seu id pelo corpo da requisição;
   - ```json
      {
        "massDelete": 1
      }
     ```
 - Caso queira deletar varios produto basta enviar um array com os ids deles;
    - ```json
      {
        "massDelete": [1,2,3]
      }
     ```
     
- **Exemplos de retornos**:

  - Deletando um pedido com sucesso:
    | Resposta do servidor: |
    | ---------------------------- |
    | Body: nenhum body |
    | Status code: _204 NO CONTENT_ |




