const { Model, Sequelize } = require('sequelize');

class produtosPedido extends Model {
    static init(sequelize) {
        super.init({
            id_produto: Sequelize.INTEGER,
            codigo_pedido: Sequelize.INTEGER,
            quantidade: Sequelize.INTEGER
        }, {
            sequelize
        });
    }

}

module.exports = produtosPedido;