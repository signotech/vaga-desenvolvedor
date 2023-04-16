const Cliente = require('../models/Cliente');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        const { cpf_cliente, nome_cliente, email_cliente } = req.body;
        const customer = await Cliente.create({ cpf_cliente, nome_cliente, email_cliente });
        return res.json(customer);
    },

    async getSome(req, res) {
        const filteredCustomers = await Cliente.findAll({where: Helpers.formatFilters(req.query)});
        res.json(filteredCustomers);
    },

    async getOne(req, res) {
        const { id } = req.params;
        const singleCustomer = await Cliente.findOne({ where: { id }});
        res.json(singleCustomer);
    },

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            await Cliente.destroy({ where: { id } });
            res.json({ success: true, deleted: id});
        } catch(e) {
            console.log(e);
        }
        
    },

    async updateOne(req, res) {
        try {
            const { id } = req.params;
            await Cliente.update(req.body, { where: { id } });
            res.json({ success: true, updated: id});
        } catch(e) {
            console.log(e);
        }
    }
}