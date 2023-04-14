const ProductRepository = require('../repositories/ProductRepository');

class ProductController {
  async index(req, res) {
    const product = await ProductRepository.findAll();
    res.send(product);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await ProductRepository.findById({ id });
    res.send(product);
  }

  async store(req, res) {
    const {
      title_product, sku_product, price_product, stock_product,
    } = req.body;

    if (!title_product || !sku_product || !price_product || !stock_product) {
      return res.json({ message: 'Fields are missing' });
    }

    const product = await ProductRepository.create({
      title_product, sku_product, price_product, stock_product,
    });
    res.send(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      title_product, sku_product, price_product, stock_product,
    } = req.body;
    const product = await ProductRepository.update(id, {
      title_product, sku_product, price_product, stock_product,
    });
    res.send(product);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleteOp = await ProductRepository.delete(id);
    res.sendStatus(200);
  }
}

module.exports = new ProductController();
