const model = require('../models/clientesModel');

const getAllClientes = async (_request, response) => {
  const tasks = await model.getAllClientes();
  return response.status(200).json(tasks);
};

const createCliente = async (request, response) => { 
  const createdTask = await model.createCliente(request.body);
  console.log('TASK:', createdTask);
  return response.status(201).send('oi');//json(createdTask);
};

const deleteCliente = async (request, response) => {
  const { id } = request.params;

  await model.deleteCliente(id);
  return response.status(204).json();
};
 
const updateCliente = async (request, response) => {
  const { id } = request.params;

  console.log('update backend');
  console.log(id);
  await model.updateCliente(id, request.body);
  return response.status(204).json(); 
};
 
module.exports = {
  getAllClientes,
  createCliente,
  deleteCliente, 
  updateCliente,
};
 