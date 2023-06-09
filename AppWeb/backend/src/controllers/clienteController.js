const clienteModel = require('../models/clienteModel');

const getCliById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteModel.getCliById(id);
    
    if (cliente) {
      return res.status(200).json(cliente);
    } else {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const clientes = await clienteModel.getAll();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addCli = async (req, res) => {
  try {
    const novoCliente = await clienteModel.addCli(req.body);
    return res.status(201).json(novoCliente);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCli = async (req, res) => {
  try {
    const { id } = req.params;
    await clienteModel.deleteCli(id);
    return res.status(204).json({ message: 'Cliente deletado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCli = async (req, res) => {
  try {
    const { id } = req.params;
    await clienteModel.updateCli(id, req.body);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCliById,
  getAll,
  addCli,
  deleteCli,
  updateCli
};
