const { Model, DataTypes } = require('sequelize');

class products extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          primaryKey: true,
        },
        title_product: DataTypes.STRING,
        sku_product: DataTypes.STRING,
        price_product: DataTypes.DECIMAL,
        stock_product: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    );
  }
}

module.exports = products;
