/*
  Warnings:

  - You are about to drop the column `password` on the `managers` table. All the data in the column will be lost.
  - Added the required column `senha` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "managers" DROP COLUMN "password",
ADD COLUMN     "senha" TEXT NOT NULL;
