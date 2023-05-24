/*
  Warnings:

  - Made the column `id_produto_comprado` on table `join_orders_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_pedido` on table `join_orders_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_produto` on table `order_product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "join_orders_products" DROP CONSTRAINT "join_orders_products_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "join_orders_products" DROP CONSTRAINT "join_orders_products_id_produto_comprado_fkey";

-- DropForeignKey
ALTER TABLE "order_product" DROP CONSTRAINT "order_product_id_produto_fkey";

-- AlterTable
ALTER TABLE "join_orders_products" ALTER COLUMN "id_produto_comprado" SET NOT NULL,
ALTER COLUMN "id_pedido" SET NOT NULL;

-- AlterTable
ALTER TABLE "order_product" ALTER COLUMN "id_produto" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join_orders_products" ADD CONSTRAINT "join_orders_products_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join_orders_products" ADD CONSTRAINT "join_orders_products_id_produto_comprado_fkey" FOREIGN KEY ("id_produto_comprado") REFERENCES "order_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
