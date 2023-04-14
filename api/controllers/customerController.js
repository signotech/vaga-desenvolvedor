const cliente = require('../models/cliente');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        const { cpf_cliente, nome_cliente, email_cliente } = req.body;
        const customer = await cliente.create({ cpf_cliente, nome_cliente, email_cliente });
        return res.json(customer);
    },
    async getSome(req, res) {
        const filteredCustomers = await cliente.findAll({where: Helpers.formatFilters(req.query)});
        res.json(filteredCustomers);
    },
    async getOne(req, res) {
        const { id } = req.params;
        const singleCustomer = await cliente.findOne({ where: { id }});
        res.json(singleCustomer);
    },
    async deleteOne(req, res) {
        const { id } = req.params;
        await cliente.destroy({ where: { id } });
        res.json({ success: true, deleted: id});
    }
}