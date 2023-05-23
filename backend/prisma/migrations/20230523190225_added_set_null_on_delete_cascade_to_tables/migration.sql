-- DropForeignKey
ALTER TABLE "join_orders_products" DROP CONSTRAINT "join_orders_products_id_pedido_fkey";

-- DropForeignKey
ALTER TABLE "join_orders_products" DROP CONSTRAINT "join_orders_products_id_produto_comprado_fkey";

-- DropForeignKey
ALTER TABLE "order_product" DROP CONSTRAINT "order_product_id_produto_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_cliente_fkey";

-- AlterTable
ALTER TABLE "join_orders_products" ALTER COLUMN "id_produto_comprado" DROP NOT NULL,
ALTER COLUMN "id_pedido" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order_product" ALTER COLUMN "id_produto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "id_cliente" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join_orders_products" ADD CONSTRAINT "join_orders_products_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "join_orders_products" ADD CONSTRAINT "join_orders_products_id_produto_comprado_fkey" FOREIGN KEY ("id_produto_comprado") REFERENCES "order_product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
