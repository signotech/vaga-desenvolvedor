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
1. Clone o repositório.
```
git clone -b Gabriel-Leiria-Epifanio-Rodrigues https://github.com/Leiriads/vaga-desenvolvedor.git
```
2. Navegue até o diretório do projeto clonado.
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
7. O comando seguirá funcionando dentro da pasta backend, em seguida o execute.
8. O mesmo irá instalar todas as dependências da API do projeto.
```
npm install
``` 


### CONFIGURAÇÃO DO BANCO DE DADOS
### Variáveis de ambiente
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
1. Dentro do diretório backend, execute o comando a seguir e certifique-se que o MySQL esteja ativo.
```
npm run sequelize
```
2. Em seguida, será criado uma base de dados MYSQL com o nome `crud` e suas respectivas tabelas.
3. Recomendo não alterar o nome ``` MYSQL_DB=crud``` do .env pois o script está configurado parac riar um database com o nome proposto.

### Execução
1. Dentro da pasta backend execute o comando:
 ```
 npm start
 ```
2. Irá iniciar o servidor do backend (API).
3. O servidor estará em execução na porta especificada no arquivo `.env` ou 3333 caso ocorra algum erro no .env .

### Execução em modo de desenvolvimento
1. Dentro da pasta backend execute o comando: 
```
npm run dev
``` 
2. O mesmo irá iniciar o servidor em modo de desenvolvimento e reiniciará automaticamente sempre que houver alterações nos arquivos.

### Endpoints
1. Os endpoits da API estarão disponíveis em http://localhost:3333/{rotas}.
2. As rotas estão com Middlewares de autenticação de usuário via token JWT para acesso das mesmas.
3. Exemplo de rotas : 
```
http://localhost:3333/produtos
http://localhost:3333/pedidos
http://localhost:3333/clientes
```
## EXECUTANDO O FRONTEND

1. Instale  o plugin LiveServer no seu Vscode.
2. Dentro da pasta Front End procure o arquivo `index.html` que não está dentro de nenhuma pasta.
### Ao abrir o liveserver no Vscode deve-se deixar o mesmo como a imagem abaixo, somente com as pastas backend e frontend para nao bugar os links de redirecionamento. 
![vscode](https://github.com/Leiriads/vaga-desenvolvedor/assets/89768557/fcfd40bf-8f81-48b4-8421-06470de75713)

3. Clique com o botão direito sobre o mesmo e abra com a extenção LiveServer.
4. O nevagador será aberto na página de login.
5. Certifique-se que a API esteja ligada antes de acessar o Front End.
6. Os dados serão buscados via API através do localhost.


## RECURSOS UTILIZADOS

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
Agradeço a equipe por me disponibilizar este teste! O mesmo contribuiu para a minha evolução e aprendizado. #Dev

## Licença
# Signotech.
