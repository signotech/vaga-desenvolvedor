const connection = require('./connection');


const getAllClientes = async () => {
  try {
    const [rows] = await connection.execute(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'clientes' LIMIT 1"
    );

    // Se a tabela "clientes" não existe, criar a tabela
   

    // Executar a consulta para obter os clientes
    const [clientes] = await connection.execute('SELECT * FROM clientes');
    console.log('GetallClientes:', clientes);
    return clientes;
  } catch (error) {
    console.error('Erro ao obter os clientes:', error); 
    await connection.execute(`
        CREATE TABLE clientes (
          id_cliente int NOT NULL AUTO_INCREMENT, 
    nome_cliente varchar(150),
    cpf_cliente varchar(11),
    email_cliente varchar(255) NOT NULL,
    endereco_cliente varchar(255),
    PRIMARY KEY (id_cliente)
        )`);
    console.log('Tabela "clientes" criada com sucesso.');
  }
};  

const createCliente = async (cliente) => {
  console.log('criar cliente'); 
  console.log('cliente:', cliente);
 
  //const { novoNome, novoCpf, novoEmail, novoEndereco } = cliente;
  const { title } = cliente;
  const email = 'email do cliente';

  const query = 'INSERT INTO clientes (nome_cliente, email_cliente) VALUES (?, ?)';
  
  console.log('criar cliente2'); 
 
  const [clienteCriado] = await connection.execute(query, [title, email]);
  console.log('criar cliente3');
    
  return {insertId: clienteCriado.insertId}; 
};

const deleteCliente = async (id) => {

  console.log('Delete id:', id); 
  const [clienteDeletado] = await connection.execute('DELETE FROM clientes WHERE id_cliente = ?', [id]);
  return clienteDeletado;
};

const updateCliente = async (id, cliente) => {
  const { novoNome, novoCpf, novoEmail, novoEndereco } = cliente;
 
  console.log('update cliente');
  console.log('cliente', cliente);
  console.log('Id:', id);

  
  const query = 'UPDATE clientes SET nome_cliente = ?, cpf_cliente = ?, email_cliente = ?, endereco_cliente = ? WHERE id_cliente = ?';

  const [clienteAtualizado] = await connection.execute (query, [novoNome, novoCpf, novoEmail, novoEndereco, id]);
  return clienteAtualizado;
};  

module.exports = {
  getAllClientes,
  createCliente,
  deleteCliente, 
  updateCliente,
};
