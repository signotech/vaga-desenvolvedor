/*
  Warnings:

  - Added the required column `estoque` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "estoque" INTEGER NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;
