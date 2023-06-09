const Cliente = require('../sequelize/models/cliente');

const getCliById = async (id) => {
  try {
    const cliente = await Cliente.findByPk(id);
    return cliente;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const clientes = await Cliente.findAll();
    return clientes;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCli = async (clienteData) => {
  try {
    const novoCliente = await Cliente.create(clienteData);
    return novoCliente;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCli = async (id) => {
  try {
    await Cliente.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCli = async (id, clienteData) => {
  try {
    await Cliente.update(clienteData, { where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getCliById,
  getAll,
  addCli,
  deleteCli,
  updateCli
};
