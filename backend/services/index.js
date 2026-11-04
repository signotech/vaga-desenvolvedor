const { col, literal } = require('sequelize');
const { Cliente, Produto, Pedido, PedidoItem, Usuario } = require('../database/models');
const BaseRepository = require('../repositories/BaseRepository');
const CrudService = require('./CrudService');
const PedidoService = require('./PedidoService');
const AuthService = require('./AuthService');

const colunas = (...nomes) => Object.fromEntries(nomes.map(nome => [nome, nome]));
const clienteResumido = { association: 'cliente', attributes: ['id', 'nome'] };

const repositorios = {
  clientes: new BaseRepository(Cliente),
  produtos: new BaseRepository(Produto),
  itens: new BaseRepository(PedidoItem),
  pedidos: new BaseRepository(Pedido, {
    incluirNaLista: [clienteResumido],
    incluirNoDetalhe: [clienteResumido, { association: 'itens', include: ['produto'] }]
  })
};

// "campos": campos filtráveis e ordenáveis de cada recurso.
module.exports = {
  auth: new AuthService(Usuario),
  clientes: new CrudService(repositorios.clientes, {
    campos: colunas('id', 'nome', 'cpf', 'email')
  }),
  produtos: new CrudService(repositorios.produtos, {
    campos: colunas('id', 'sku', 'titulo', 'preco', 'estoque')
  }),
  pedidos: new PedidoService(repositorios, {
    campos: {
      ...colunas('id', 'codigo_pedido', 'cliente_id', 'data_pedido', 'status', 'tipo_desconto', 'desconto'),
      cliente: col('cliente.nome'),
      total: literal(Pedido.SQL_TOTAL)
    }
  })
};
