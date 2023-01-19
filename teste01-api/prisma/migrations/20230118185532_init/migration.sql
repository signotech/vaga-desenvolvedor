/*
  Warnings:

  - Added the required column `sku_produto` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "sku_produto" TEXT NOT NULL;
