const RequestRepository = require('../repositories/RequestRepository');

class RequestController {
  async index(req, res) {
    const request = await RequestRepository.findAll();
    res.send(request);
  }

  async create(req, res) {
    const { customer_id } = req.body;
    const request = await RequestRepository.create({ customer_id });
    res.send(request);
  }
}

module.exports = new RequestController();
