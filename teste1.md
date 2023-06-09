<div align="center">
  <img src="https://site.signoweb.com.br/assets/images/logo-signo.svg" width="20%" />
</div>

# Teste técnico Gabriel Leiria 

## Descrição
Este é o meu projeto Api/Aplicação web utilizando Nodejs.

## Configuração

### Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

### Instalação
1. Clone o repositório 
```
git clone -b Gabriel-Leiria-Epifanio-Rodrigues https://github.com/Leiriads/vaga-desenvolvedor.git
```
2. Navegue até o diretório do projeto clonado 
``` 
cd AppWeb
```
3. Estando dentro da pasta AppWeb.
4. No cmd digite: 
```code . ``` 
para abrir o vscode. No vscode deve conter apenas as pastas backend e frontend.
5. Assim deve ficar:


![vscode1](https://github.com/Leiriads/vaga-desenvolvedor/assets/89768557/c1165df1-1a98-42c8-ad56-cbe658d3a57f)


6. Ainda com o terminal aberto navegue até o diretório backend:
 ``` 
 cd backend
 ```
7. O comando a seguir só vai funcionar dentro da pasta backend.
8. Execute o comando 
```
npm install
``` 
9. Este comando irá instalar todas as dependências da Api do projeto.


### Configuração do Banco de Dados
### Variáveis de Ambiente
Edite o arquivo ```.env ``` na raiz do projeto conforme o necessário, deixei setado como configurei no meu computador.
1. Obs: Na pasta do sequelize está fixo para utilizar apenas o Mysql.

```
MYSQL_HOST= localhost
MYSQL_USER= root
MYSQL_PASSWORD=
MYSQÇ_DB=crud
MYSQL_PORT= 3306
JWT_SECRET= s8p38US3su38Unsk3i9iKOKOiu883u93j83h0330h3h30d
PORT= 3333
```

## Criando o Banco de Dados
1. Dentro do diretório backend Execute o comando a seguir, porém certifique-se que seu MYSQL esteja ativo.
```
npm run sequelize
```
2. Esse comando roda um script que cria uma base de dados Mysql com nome `crud` e suas tabelas.
3. Recomendo não alterar o nome  ```MYSQÇ_DB=crud ``` do .env pois o script ja esta setado para criar um database com esse nome.

### Execução
1. Dentro da pasta backend Execute o comando:
 ```
 npm start
 ```
2. Irá iniciar o servidor do backend (API).
3. O servidor estará em execução na porta especificada no arquivo `.env` ou 3333 caso ocorra algum erro no .env .

### Execução em modo de Desenvolvimento
1. Dentro da pasta backend Execute o comando: 
```
npm run dev
``` 
2. Este comando irá iniciar o servidor no modo de desenvolvimento.
3. O servidor reiniciará automaticamente sempre que houver alterações nos arquivos.

### Endpoints
1. Os endpoits da API estarrão disponíveis em http://localhost:3333/{rotas}
2. Porém as rotas estão com Middlewares de autenticação de usuário via token JWT para acesso das mesmas.
3. Exemplo de rotas : 
```
http://localhost:3333/produtos
http://localhost:3333/pedidos
http://localhost:3333/clientes
```
## Executando o Frontend

1. Instale  o plugin LiveServer no seu Vscode
2. Dentro da pasta Frontend procure o arquivo `index.html` que não está dentro de nenhuma pasta.
### Ao abrir o liveserver no Vscode deve-se deixar o vscode como a imagem abaixo. Sómente com as pastas backend e frontend para nao bugar os links de redirecionamento. 
![vscode](https://github.com/Leiriads/vaga-desenvolvedor/assets/89768557/fcfd40bf-8f81-48b4-8421-06470de75713)

3. Clique com o botão direito sobre o mesmo e abra com a extenção LiveServer.
4. Ele deve abrir o seu navegador na pagina de Login.
5. Não esqueça de ligar a Api antes de acessar o frontend.
6. O mesmo está configurado para buscar os dados na api através do localhost.


## Recursos uilizados

- [Express](https://expressjs.com/) - Framework para construção de aplicações web.
- [Sequelize](https://sequelize.org/) - ORM para manipulação do banco de dados.
- [MySQL2](https://www.npmjs.com/package/mysql2) - Pacote de driver MySQL para Sequelize.
- [Nodemon](https://nodemon.io/) - Monitora alterações nos arquivos e reinicia o servidor automaticamente.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Carrega variáveis de ambiente a partir de um arquivo `.env`.
- [Cors](https://www.npmjs.com/package/cors) - Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Biblioteca para geração e verificação de tokens JWT.
- [Bcrypt](https://www.npmjs.com/package/bcrypt) - Biblioteca para criptografia de senhas.
- [Faker](https://www.npmjs.com/package/faker) - Biblioteca para geração de dados falsos.
- Força de vontade em aprender.


## Comentário
Agradeço a equipe por me disponibilizar este teste! o mesmo contribuiu para a minha evolução e aprendizado. #Dev

## Licença
# Signotech.
