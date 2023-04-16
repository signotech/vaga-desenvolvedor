const { Model, Sequelize } = require('sequelize');

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            id_cliente_pedido: Sequelize.INTEGER,
            codigo_pedido: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            valor_pedido: Sequelize.DECIMAL(15, 2),
            data_pedido: {
                type: Sequelize.DATEONLY,
                defaultValue: Sequelize.NOW
            },
            status_pedido: {
                type: Sequelize.STRING(9),
                defaultValue: 'Aberto'
            }
        }, {
            sequelize
        });
    }
}

module.exports = Pedido;