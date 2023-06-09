const faker = require('faker');
const database = require('./db');
const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const PedidoCompra = require('./models/pedido_compra');
const Admin = require('./models/admin');

(async () => {
  try {
    const Sequelize = require('sequelize');
    require('dotenv').config();

    const sequelize = new Sequelize('', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT
    });
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB}`);
    console.log('Banco de dados "crud" criado com sucesso.');

    // Sincronização dos modelos com o banco de dados
    await database.sync();
    console.log('Conexão estabelecida com sucesso.');

    // Criação de produtos aleatórios
    for (let i = 0; i < 22; i++) {
      await Produto.create({
        sku: faker.random.alphaNumeric(6),
        titulo: faker.commerce.productName(),
        preco: faker.random.number({ min: 100, max: 5000 }),
        estoque: faker.random.number({ min: 1, max: 100 }),
        promocao:0

      });
    }

    // Criação de clientes aleatórios
    for (let i = 0; i < 22; i++) {
      await Cliente.create({
        nome: faker.name.firstName(),
        cpf: faker.random.number({ min: 1000, max: 9999 }).toString(),
        email: faker.internet.email()
      });
    }

    // Obtenção de todos os clientes e produtos existentes
    const clientes = await Cliente.findAll();
    const produtos = await Produto.findAll();

    // Criação de pedidos associados a clientes e produtos existentes
    for (let i = 0; i < 22; i++) {
      const clienteAleatorio = clientes[Math.floor(Math.random() * clientes.length)];
      const produtoAleatorio = produtos[Math.floor(Math.random() * produtos.length)];

      await PedidoCompra.create({
        status: 'Em Aberto',
        order_date: faker.date.past(),
        cliente_id: clienteAleatorio.id,
        produto_id: produtoAleatorio.id
      });
    }

    console.log('----------------------------------------------');
    console.log(' Tabela Admin criada ' + Admin);
    console.log('----------------------------------------------');
    console.log(' Tabela Cliente criada ' + Cliente);
    console.log('----------------------------------------------');
    console.log(' Tabela PedidoCompra criada ' + PedidoCompra);
    console.log('----------------------------------------------');
    console.log(' Tabela Produto criada ' + Produto);
    console.log('----------------------------------------------');
   
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
})();
