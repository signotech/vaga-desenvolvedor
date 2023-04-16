const Produto = require('../models/Produto');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        try {
            const { sku_produto, titulo_produto, preco, estoque } = req.body;
            const product = await Produto.create({ sku_produto, titulo_produto, preco: parseFloat(preco), estoque });
            return res.json(product);
        } catch(error) {
            console.log(error);
        }
        
    },

    async getSome(req, res) {
        try {
            const filteredProducts = await Produto.findAll({ where: Helpers.formatFilters(req.query) });
            res.json(filteredProducts);
        } catch(error) {
            console.log(error);
        }
        
    },

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const singleProduct = await Produto.findOne({ where: { id }});
            res.json(singleProduct);
        } catch(error) {
            console.log(error);
        }
        
    },

    async deleteOne(req, res) {
        try {
            const { id } = req.params;
            await Produto.destroy({ where: { id } });
            res.json({ success: true, deleted: id });
        } catch(e) {
            console.log(e);
        }
    },
    
    async updateOne(req, res) {
        try {
            const { id } = req.params;
            await Produto.update(req.body, { where: { id } });
            res.json({ success: true, updated: id });
        } catch(e) {
            console.log(e);
        }
    }
}