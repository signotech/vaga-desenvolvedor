const model = require('../models/produtosModel');


const getAllProdutos = async (_request, response) => {
  const tasks = await model.getAllProdutos();
  return response.status(200).json(tasks);
};


const createProduto = async (request, response) => { 
  const createdTask = await model.createProduto(request.body);
  console.log('TASK:', createdTask);
  return response.status(201).send('oi');//json(createdTask);
};

const deleteProduto = async (request, response) => {
  const { id } = request.params;

  await model.deleteProduto(id);
  return response.status(204).json();
}; 
 
const updateProduto = async (request, response) => {
  const { id } = request.params;

  console.log('update backend');
  console.log(id);
  await model.updateProduto(id, request.body);
  return response.status(204).json(); 
};
 
module.exports = {
  getAllProdutos,
  createProduto,
  deleteProduto,
  updateProduto
};
 