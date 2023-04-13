const cliente = require('../models/cliente');

module.exports = {
    async store(req, res) {
        const { cpf_cliente, nome_cliente, email_cliente } = req.body;
        const customer = await cliente.create({ cpf_cliente, nome_cliente, email_cliente });
        return res.json(customer);
    }
}