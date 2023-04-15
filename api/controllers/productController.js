const produto = require('../models/produto');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        const { sku_produto, titulo_produto, preco, estoque } = req.body;
        const product = await produto.create({ sku_produto, titulo_produto, preco: parseFloat(preco), estoque });
        return res.json(product);
    },
    async getSome(req, res) {
        const filteredProducts = await produto.findAll({ where: Helpers.formatFilters(req.query) });
        res.json(filteredProducts);
    },
    async getOne(req, res) {
        const { id } = req.params;
        const singleProduct = await produto.findOne({ where: { id }});
        res.json(singleProduct);
    },
    async deleteOne(req, res) {
        const { id } = req.params;
        await produto.destroy({ where: { id } });
        res.json({ success: true, deleted: id });
    }
}