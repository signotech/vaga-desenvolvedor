const { Model, Sequelize } = require('sequelize');

class Cliente extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            cpf_cliente: {
                type: Sequelize.CHAR(11),
                unique: true
            },
            nome_cliente: Sequelize.STRING(150),
            email_cliente: Sequelize.STRING
        }, {
            sequelize,
        });
    }
}

module.exports = Cliente;