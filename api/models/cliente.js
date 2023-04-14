const { Model, Sequelize } = require('sequelize');

class cliente extends Model {
    static init(sequelize) {
        super.init({
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

module.exports = cliente;