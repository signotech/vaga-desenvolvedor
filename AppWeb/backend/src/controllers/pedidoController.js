const pedidoModel = require('../models/pedidoModel');

const getPedById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoModel.getPedById(id);
    
    if (pedido) {
      return res.status(200).json(pedido);
    } else {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const pedidos = await pedidoModel.getAll();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addPed = async (req, res) => {
  try {
    const { clienteId, produtoId, status } = req.body;

    const pedidoData = {
      cliente_id: clienteId,
      produto_id: produtoId,
      status: status
    };

    const novoPedido = await pedidoModel.addPed(pedidoData);

    return res.status(201).json(novoPedido);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletePed = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoModel.deletePed(id);
    return res.status(204).json({ message: 'Pedido deletado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatePed = async (req, res) => {
  try {
    const { id } = req.params;
    await pedidoModel.updatePed(id, req.body);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPedById,
  getAll,
  addPed,
  deletePed,
  updatePed
};
