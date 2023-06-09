const Pedido = require('../sequelize/models/pedido_compra');

const getPedById = async (id) => {
  try {
    const pedido = await Pedido.findByPk(id);
    return pedido;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const pedidos = await Pedido.findAll();
    return pedidos;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addPed = async (pedidoData) => {
  try {
    const novoPedido = await Pedido.create(pedidoData);
    return novoPedido;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePed = async (id) => {
  try {
    await Pedido.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePed = async (id, pedidoData) => {
  try {
    await Pedido.update(pedidoData, { where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getPedById,
  getAll,
  addPed,
  deletePed,
  updatePed
};
