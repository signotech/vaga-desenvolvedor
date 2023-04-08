const model = require('../models/pedidosModel');


const getAllPedidos = async (_request, response) => {
  const tasks = await model.getAllPedidos();
  return response.status(200).json(tasks);
};


const createPedido = async (request, response) => { 
  const createdTask = await model.createPedido(request.body);
  console.log('TASK:', createdTask);
  return response.status(201).send('oi');//json(createdTask);
};

const deletePedido = async (request, response) => {
  const { id } = request.params;

  await model.deletePedido(id);
  return response.status(204).json();
}; 
 
const updatePedido = async (request, response) => {
  const { id } = request.params;

  console.log('update backend');
  console.log(id);
  await model.updatePedido(id, request.body);
  return response.status(204).json(); 
};
 
module.exports = {
  getAllPedidos,
  createPedido,
  deletePedido,
  updatePedido
};
 