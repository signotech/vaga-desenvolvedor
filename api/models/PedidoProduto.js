const { Model, Sequelize } = require('sequelize');

class PedidoProduto extends Model {
    static init(sequelize) {
        super.init({
            id_produto: Sequelize.INTEGER,
            codigo_pedido: Sequelize.INTEGER,
            quantidade: Sequelize.INTEGER
        }, {
            sequelize,
            tableName: 'pedidos_produtos',
            foreignKey: 'codigo_pedido',
            otherKey: 'id_produto'
        });
    }
}

module.exports = PedidoProduto;