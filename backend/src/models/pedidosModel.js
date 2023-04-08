const connection = require('./connection');

const getAllPedidos = async () => {
  /*const [pedidos] = await connection.execute('SELECT * FROM pedidos');
  console.log('GetallClientes:', pedidos);
  return pedidos;*/

  try {
    const [rows] = await connection.execute(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'pedidos' LIMIT 1"
    );

    // Se a tabela "pedidos" não existe, criar a tabela

    // Obter os pedidos
    const [pedidos] = await connection.execute('SELECT * FROM pedidos');
    console.log('GetallClientes:', pedidos);
    return pedidos;
  } catch (error) {
    console.error('Erro ao obter os pedidos:', error);
    await connection.execute(`
        CREATE TABLE pedidos (
          id_pedido int NOT NULL AUTO_INCREMENT, 
    id_cliente int,
    id_produto int,
    data_pedido date,
    status_pedido varchar(20),
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES produtos(id_produto)
        )`);
    console.log('Tabela "pedidos" criada com sucesso.');
    return [];
  }
  
};

const createPedido = async (cliente) => {
  console.log('criar cliente'); 
  console.log('cliente:', cliente);
 
  const data_pedido = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
  const status_pedido = '4';
  
  const query = 'INSERT INTO pedidos(data_pedido, status_pedido) VALUES (?, ?)';
  console.log('criar cliente2');  
 
  const [clienteCriado] = await connection.execute(query, [data_pedido, status_pedido]);
  console.log('criar cliente3'); 
    
  return {insertId: clienteCriado.insertId}; 
};  
   
const deletePedido = async (id) => {
 
  console.log('Delete id:', id); 
  const [clienteDeletado] = await connection.execute('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
  return clienteDeletado;
};

const updatePedido = async (id, cliente) => {
  const { novoCliente, novoProduto, novoStatus } = cliente;
 
  console.log('update cliente');
  console.log('cliente', cliente); 
  console.log('Id:', id);
 
  
  const query = 'UPDATE pedidos SET id_cliente = ?, id_produto = ?, status_pedido = ? WHERE id_pedido = ?';

  const [clienteAtualizado] = await connection.execute (query, [novoCliente, novoProduto, novoStatus, id]);
  return clienteAtualizado;
};  

module.exports = { 
  getAllPedidos,  
  createPedido,
  deletePedido,
  updatePedido
};
  
      