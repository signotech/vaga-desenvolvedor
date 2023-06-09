const produtoModel = require('../models/produtoModel');

const getProdById = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await produtoModel.getProdById(id);
    
    if (produto) {
      return res.status(200).json(produto);
    } else {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const produtos = await produtoModel.getAll();
    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addProd = async (req, res) => {
  try {
    const novoProduto = await produtoModel.addProd(req.body);
    return res.status(201).json(novoProduto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteProd = async (req, res) => {
  try {
    const { id } = req.params;
    await produtoModel.deleteProd(id);
    return res.status(204).json({ message: 'Produto deletado' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateProd = async (req, res) => {
  try {
    const { id } = req.params;
    await produtoModel.updateProd(id, req.body);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProdById,
  getAll,
  addProd,
  deleteProd,
  updateProd
};
