const { Model, DataTypes } = require('sequelize');

class requestProducts extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
        },
      },
      {
        tableName: 'request_products',
        sequelize,
      },
    );
  }
}

module.exports = requestProducts;
