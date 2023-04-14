const db = require('../../database/db');
const Product = require('../../database/models/product');

class ProductRepository {
  async findAll() {
    await db.sync();
    const product = await Product.findAll();
    return product;
  }

  async findById({ id }) {
    await db.sync();
    const product = await Product.findByPk(id);
    return product;
  }

  async create({
    title_product, sku_product, price_product, stock_product,
  }) {
    await db.sync();
    const product = await Product.create({
      title_product, sku_product, price_product, stock_product,
    });
    return product;
  }

  async update(id, {
    title_product, sku_product, price_product, stock_product,
  }) {
    await db.sync();
    const product = await Product.update(
      {
        title_product, sku_product, price_product, stock_product,
      },
      { where: { uuid: id } },
    );
    return product;
  }

  async delete(id) {
    await db.sync();
    const product = await Product.destroy({
      where: { uuid: id },
    });
    return product;
  }
}

module.exports = new ProductRepository();
