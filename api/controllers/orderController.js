const pedido = require('../models/pedido');
const produtosPedido = require('../models/produtosPedido');

module.exports = {
    async store(req, res) {
        const { id_cliente_pedido, valor_pedido, itens } = req.body;
        const order = await pedido.create({ id_cliente_pedido, valor_pedido });
        console.log(order);
        await produtosPedido.bulkCreate(itens.map(item => ({ ...item, codigo_pedido: order.codigo_pedido })));
        return res.json({ order, itens });
    },
    async getSome(req, res) {
        const filteredOrders = await pedido.findAll({ where: req.query });
        res.json(filteredOrders);
    },
    async getOne(req, res) {
        const { id } = req.params;
        const singleOrder = await pedido.findOne({ where: { id } });
        res.json(singleOrder);
    },
    async deleteOne(req, res) {
        const { id } = req.params;
        await pedido.destroy({ where: { id } });
        res.json({ success: true, deleted: id });
    }
}