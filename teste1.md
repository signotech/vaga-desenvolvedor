<div align="center">
    <img src="https://site.signoweb.com.br/assets/images/logo-signo.svg" width="20%" />
  </div>
  
<h1>Teste para candidatos à vaga de Desenvolvedor</h1>

<h2>Instruções do backend</h2>

<p>Primeiro de tudo vá até o mySQL workbench e rode o seguinte comando:</p>
<p>-Create schema "purchase_register"</p>

<hr />

<p>Agora, crie um arquivo chamado .env na pasta backend com os seguintes atributos:</p>
<ul>
    <li>DB_name="purchase_register"</li>
    <li>DB_user="seu usuario"</li>
    <li>DB_password="sua senha"</li>
    <li>DB_Host="localhost"</li>
    <li>Auth_secret="crie uma senha para autenticação"</li>
</ul>

<hr />
<p>Depois, va até a pasta backend e rode o comando npm i</p>
<p>Depois rode: npx sequelize-cli init</p>
<p>Altere o arquivo config/config.js para:
    
    const dotenv =  require("dotenv")
    dotenv.config()
    module.exports = {
        development: {
        username: process.env.DB_user,
        password: process.env.DB_password,
        database: process.env.DB_name,
        host: "127.0.0.1",
        dialect: "mysql"
    }
}
</p>
<p>Depois: rode o comando: 
    
    npx sequelize-cli db:migrate
    
</p>

<p>Depois: rode o comando: 
    
    npx sequelize-cli seed:generate --name admin-user-demo
    
</p>

<p>No arquivo criado, adicione a seguinte linha:

    'use strict';
    
    module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Usuarios", [{
            nome: "Admin",
            email: "admin@email.com",
            cpf: "0000000",
            password: "$2b$10$5RK.Ip7m/DgAfWrg54s0.ehn1jo5DRix/lGgaH1UFcSrwTM5fWg2C",
            isAdmin: true
        }])
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    }
 };

</p>
<p>login usuario admin padrão:
    <ul>
        <li>Email: admin@admin.com</li>
        <li>Senha: 12345678</li>
        <li>*Por ser um sistema que não será posto em produção, deixei a senha padrão simples para não haver complicações*</li>
    </ul>
</p>
<p>Logo em seguida: 
    
    npx sequelize-cli db:seed:all
    
</p>
<p>Por fim, rode: 
    
    npm start

</p>

<h2>Instruções do frontend</h2>

<p>Primeiro de tudo vá a pasta frontend e rode o seguinte comando:</p>
<p>
    
    npm i
    
</p>

<p>Logo após rode:</p>

    npm start
    
</p>

<h2>Aviso</h2>
<p>Apenas o usuário administrado podera administrar o site, criar, excluir, editar etc. O usuário comum poderá adicionar itens ao carrinho e finalizar o pedido.</p>
