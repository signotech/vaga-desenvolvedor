/*
  Warnings:

  - You are about to drop the `join_orders_clients` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_cliente` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "join_orders_clients" DROP CONSTRAINT "join_orders_clients_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "join_orders_clients" DROP CONSTRAINT "join_orders_clients_id_pedido_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "id_cliente" INTEGER NOT NULL;

-- DropTable
DROP TABLE "join_orders_clients";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
