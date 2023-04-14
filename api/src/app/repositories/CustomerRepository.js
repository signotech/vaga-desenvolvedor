const db = require('../../database/db');
const Customer = require('../../database/models/customer');

class CustomerRepository {
  async findAll() {
    await db.sync();
    const customer = await Customer.findAll();

    return customer;
  }

  async findById(id) {
    await db.sync();
    const customer = await Customer.findByPk(id);
    return customer;
  }

  async findByEmail({ email }) {
    await db.sync();
    const [customer] = await Customer.findAll({
      where: {
        email,
      },
    });
    return customer;
  }

  async findByCpf({ user_cpf }) {
    await db.sync();
    const [customer] = await Customer.findAll({
      where: {
        user_cpf,
      },
    });
    return customer;
  }

  async create({
    name, email, user_cpf,
  }) {
    await db.sync();
    const customer = await Customer.create({
      name, email, user_cpf,
    });
    return customer;
  }

  async update(id, {
    name, email, user_cpf,
  }) {
    await db.sync();
    const customer = await Customer.update(
      { name, email, user_cpf },
      {
        where: { uuid: id },
      },
    );
    return customer;
  }

  async delete(id) {
    await db.sync();
    const customer = await Customer.destroy({
      where: { uuid: id },
    });
    return customer;
  }
}

module.exports = new CustomerRepository();
