const db = require('../../database/db');
const Request = require('../../database/models/requests');
const Customer = require('../../database/models/customer');

class RequestRepository {
  async findAll() {
    await db.sync();
    const request = await Request.findAll({
      include: [{
        model: Customer,
      }],
    });
    return request;
  }

  async create({
    customer_id,
  }) {
    await db.sync();
    const request = await Request.create({
      customer_id,
    });
    return request;
  }
}

module.exports = new RequestRepository();
