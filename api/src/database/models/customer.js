const { Model, DataTypes } = require('sequelize');

class customers extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        user_cpf: DataTypes.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = customers;
