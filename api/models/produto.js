const { Model, Sequelize } = require('sequelize');

class Produto extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sku_produto: {
                type: Sequelize.STRING(100),
                unique: true
            },
            titulo_produto: Sequelize.STRING(100),
            preco: Sequelize.DECIMAL(15, 2),
            estoque: Sequelize.INTEGER
        }, {
            sequelize
        },
        
        );
    }
}

module.exports = Produto;