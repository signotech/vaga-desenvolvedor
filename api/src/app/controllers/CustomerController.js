const CustomerRepository = require('../repositories/CustomerRepository');

class CustomerController {
  async index(req, res) {
    const customer = await CustomerRepository.findAll();
    res.send(customer);
  }

  async show(req, res) {
    const { id } = req.params;
    const customer = await CustomerRepository.findById(id);
    res.send(customer);
  }

  async store(req, res) {
    const {
      name, email, user_cpf,
    } = req.body;

    if (!name) {
      return res.json({ message: 'Name is required' });
    }

    const emailAlreadyExists = await CustomerRepository.findByEmail({ email });

    if (emailAlreadyExists) {
      return res.status(400).json({ message: 'This e-mail is already taken' });
    }

    const userCpfAlreadyExists = await CustomerRepository.findByCpf({ user_cpf });

    if (userCpfAlreadyExists) {
      return res.status(400).json({ message: 'This cpf is not able' });
    }

    const customer = await CustomerRepository.create({ name, email, user_cpf });
    res.send(customer);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, user_cpf } = req.body;

    if (!name) {
      return res.json({ message: 'Name is required' });
    }

    const emailAlreadyExists = await CustomerRepository.findByEmail({ email });

    if (emailAlreadyExists) {
      return res.status(400).json({ message: 'This e-mail is already taken' });
    }

    const userCpfAlreadyExists = await CustomerRepository.findByCpf({ user_cpf });

    if (userCpfAlreadyExists) {
      return res.status(400).json({ message: 'This cpf is not able' });
    }

    const customer = await CustomerRepository.update(id, { name, email, user_cpf });
    res.send(customer);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleteOp = await CustomerRepository.delete(id);
    res.sendStatus(200);
  }
}

module.exports = new CustomerController();
