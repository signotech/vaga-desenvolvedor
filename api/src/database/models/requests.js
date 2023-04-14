const { Model, DataTypes } = require('sequelize');
const customer = require('./customer');

class requests extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
        },
        code_request: DataTypes.INTEGER,
        status: DataTypes.STRING,
        id_customer: DataTypes.UUID,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    requests.hasOne(models.customer, {
      foreignKey: 'uuid',
    });
  }
}

module.exports = requests;
