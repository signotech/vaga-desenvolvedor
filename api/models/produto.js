const { Model, Sequelize } = require('sequelize');

class produto extends Model {
    static init(sequelize) {
        super.init({
            sku_produto: {
                type: Sequelize.STRING(100),
                unique: true
            },
            titulo_produto: Sequelize.STRING(100),
            preco: Sequelize.DECIMAL(15, 2),
            estoque: Sequelize.INTEGER,
        }, {
            sequelize
        });
    }
}

module.exports = produto;