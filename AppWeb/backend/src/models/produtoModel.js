const Produto = require('../sequelize/models/produto');

const getProdById = async (id) => {
  try {
    const produto = await Produto.findByPk(id);
    return produto;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAll = async () => {
  try {
    const produtos = await Produto.findAll();
    return produtos;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addProd = async (produtoData) => {
  try {
    const novoProduto = await Produto.create(produtoData);
    return novoProduto;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProd = async (id) => {
  try {
    await Produto.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProd = async (id, produtoData) => {
  try {
    await Produto.update(produtoData, { where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProdById,
  getAll,
  addProd,
  deleteProd,
  updateProd
};
