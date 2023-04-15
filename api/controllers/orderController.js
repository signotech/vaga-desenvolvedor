const pedido = require('../models/pedido');
const produtosPedido = require('../models/produtosPedido');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        const { id_cliente_pedido, valor_pedido, itens } = req.body;
        const order = await pedido.create({ id_cliente_pedido, valor_pedido });
        await produtosPedido.bulkCreate(itens.map(item => ({ ...item, codigo_pedido: order.codigo_pedido })));
        return res.json({ order, itens });
    },
    async getSome(req, res) {
        const { id } = req.params;
        const formattedQuery = Helpers.formatFilters(req.query);
        formattedQuery.id_cliente_pedido = id;
        const filteredOrders = await pedido.findAll({ 
            where: formattedQuery,
            attributes: ['id_cliente_pedido', 'codigo_pedido', 'valor_pedido', 'data_pedido', 'status_pedido']
        });
        res.json(filteredOrders);
    },
    async getOne(req, res) {
        const { id } = req.params;
        const singleOrder = await pedido.findOne({ 
            where: { id }
        });
        res.json(singleOrder);
    },
    async deleteOne(req, res) {
        const { id } = req.params;
        await pedido.destroy({ where: { id } });
        res.json({ success: true, deleted: id });
    }
}