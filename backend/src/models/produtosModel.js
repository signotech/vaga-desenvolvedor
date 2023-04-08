const connection = require('./connection');

const getAllProdutos = async () => {
  /*const [produtos] = await connection.execute('SELECT * FROM produtos');
  return produtos;*/
  try {
    const [rows] = await connection.execute(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'produtos' LIMIT 1"
    );

    // Se a tabela "produtos" não existe, criar a tabela

    // Executar a consulta para obter os produtos
    const [produtos] = await connection.execute('SELECT * FROM produtos');
    console.log('GetAllProdutos:', produtos);
    return produtos;
  } catch (error) {
    console.error('Erro ao obter os produtos:', error);
    await connection.execute(`
        CREATE TABLE produtos (
          id_produto int NOT NULL AUTO_INCREMENT, 
    sku_produto varchar(100),
    titulo_produto varchar(100) NOT NULL,
    preco decimal (10),
    estoque int,
    PRIMARY KEY (id_produto)
        )`);
    console.log('Tabela "produtos" criada com sucesso.');
  }
}; 

const createProduto = async (cliente) => {
  console.log('criar cliente'); 
  console.log('cliente:', cliente);
 
  //const { title } = cliente;
  
  const titulo_produto = 'Produto X';
  const sku_produto = 'SkuProduto';
  const estoque = 23;
  const preco = 55;

  const query = 'INSERT INTO produtos(titulo_produto, sku_produto, estoque, preco) VALUES (?, ?, ?, ?)';
  
  console.log('criar cliente2'); 
 
  const [clienteCriado] = await connection.execute(query, [titulo_produto, sku_produto, estoque, preco]);
  console.log('criar cliente3');
    
  return {insertId: clienteCriado.insertId}; 
};
 
const deleteProduto = async (id) => { 
 
  console.log('Delete id:', id); 
  const [clienteDeletado] = await connection.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
  return clienteDeletado;
};

const updateProduto = async (id, cliente) => {
  const { title } = cliente;
 
  console.log('update cliente');
  console.log('cliente', cliente);
  console.log('Id:', id);

  
  const query = 'UPDATE produtos SET titulo_produto = ? WHERE id_produto = ?';

  const [clienteAtualizado] = await connection.execute (query, [title, id]);
  return clienteAtualizado;
}; 

module.exports = {
  getAllProdutos,
  createProduto,
  deleteProduto,
  updateProduto
};

 