/*
  Warnings:

  - You are about to drop the column `desconto` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "desconto" INTEGER;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "desconto";
