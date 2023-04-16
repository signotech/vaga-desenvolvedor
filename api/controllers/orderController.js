const Pedido = require('../models/Pedido');
const PedidoProduto = require('../models/PedidoProduto');
const Produto = require('../models/Produto');
const Cliente = require('../models/Cliente');
const Helpers = require('../helpers/Helpers');

module.exports = {
    async store(req, res) {
        try {
            const { id_cliente_pedido, valor_pedido, itens } = req.body;
            const order = await Pedido.create({ id_cliente_pedido, valor_pedido });
            await PedidoProduto.bulkCreate(itens.map(item => ({ ...item, codigo_pedido: order.codigo_pedido })));
            return res.json({ order, itens });
        } catch(error) {
            console.log(error);
        }
        
    },

    async getSome(req, res) {
        try {
            const { id } = req.params;
            const formattedQuery = Helpers.formatFilters(req.query);
            formattedQuery.id_cliente_pedido = id;
            const filteredOrders = await Pedido.findAll({ 
                where: formattedQuery
            });
            res.json(filteredOrders);
        } catch(error) {
            console.log(error);
        }
        
    },

    async getOne(req, res) {
        try {
            const { id_pedido } = req.params;
            const singleOrder = await Pedido.findOne({ 
                where: { codigo_pedido: id_pedido },
                include: [
                    {
                        model: Produto,
                        through: PedidoProduto
                    }
                ]
            });
            const customer = await Cliente.findOne({ where: { id: singleOrder.id_cliente_pedido } });
            res.json({ order: singleOrder, customer });
        } catch(error) {
            console.log(error);
        }
        
    },

    async deleteOne(req, res) {
        try {
            const { id_pedido: codigo_pedido } = req.params;
            await Pedido.update({ status_pedido: 'Cancelado' } , { where: { codigo_pedido } });
            res.json({ success: true, deleted: codigo_pedido });
        } catch(error) {
            console.log(error);
        }
        
    },

    async updateOne(req, res) {
        try {
            const { id_pedido: codigo_pedido } = req.params;
            await Pedido.update(req.body , { where: { codigo_pedido } });
            res.json({ success: true, updated: codigo_pedido });
        } catch(error) {
            console.log(error);
        }
        
    }
}