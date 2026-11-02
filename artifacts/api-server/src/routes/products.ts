import { Router, type IRouter } from "express";
import {
  CreateProductBody,
  CreateProductResponse,
  DeleteProductParams,
  GetProductParams,
  GetProductResponse,
  ListProductsQueryParams,
  ListProductsResponse,
  UpdateProductBody,
  UpdateProductParams,
  UpdateProductResponse,
} from "@workspace/api-zod";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { OrderItem, Product } from "../lib/database";
import { paginateRows, validateListQuery } from "../lib/list-utils";

const router: IRouter = Router();
const productFields = [
  "id",
  "sku",
  "title",
  "price",
  "stock",
  "createdAt",
  "updatedAt",
] as const;

function parseId(
  schema:
    | typeof GetProductParams
    | typeof UpdateProductParams
    | typeof DeleteProductParams,
  rawId: string | string[],
) {
  return schema.safeParse({ id: Array.isArray(rawId) ? rawId[0] : rawId });
}

function serializeProduct(product: Product) {
  const plain = product.get({ plain: true });
  return { ...plain, price: Number(plain.price), stock: Number(plain.stock) };
}

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const invalidField = validateListQuery(parsed.data, productFields);
  if (invalidField) {
    res.status(400).json({ error: invalidField });
    return;
  }

  const products = await Product.findAll();
  const result = paginateRows(
    products.map((product) => serializeProduct(product)),
    parsed.data,
    productFields,
  );
  res.json(ListProductsResponse.parse(result));
});

router.post("/products", async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  try {
    const product = await Product.create(parsed.data);
    res.status(201).json(
      CreateProductResponse.parse(serializeProduct(product)),
    );
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ error: "SKU já cadastrado." });
      return;
    }
    throw error;
  }
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = parseId(GetProductParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const product = await Product.findByPk(params.data.id);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado." });
    return;
  }
  res.json(GetProductResponse.parse(serializeProduct(product)));
});

router.patch("/products/:id", async (req, res): Promise<void> => {
  const params = parseId(UpdateProductParams, req.params.id);
  const body = UpdateProductBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({
      error: !params.success ? params.error.message : body.error?.message ?? "Dados inválidos.",
    });
    return;
  }
  const product = await Product.findByPk(params.data.id);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado." });
    return;
  }
  try {
    await product.update(body.data);
    res.json(UpdateProductResponse.parse(serializeProduct(product)));
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ error: "SKU já cadastrado." });
      return;
    }
    throw error;
  }
});

router.delete("/products/:id", async (req, res): Promise<void> => {
  const params = parseId(DeleteProductParams, req.params.id);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const product = await Product.findByPk(params.data.id);
  if (!product) {
    res.status(404).json({ error: "Produto não encontrado." });
    return;
  }
  const linkedItems = await OrderItem.count({
    where: { productId: product.id },
  });
  if (linkedItems > 0) {
    res.status(409).json({
      error: "Este produto está em pedidos. Exclua os pedidos antes de removê-lo.",
    });
    return;
  }
  try {
    await product.destroy();
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ error: "Não é possível excluir este produto." });
      return;
    }
    throw error;
  }
});

export default router;
