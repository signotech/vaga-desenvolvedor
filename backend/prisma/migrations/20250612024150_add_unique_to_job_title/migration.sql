/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Job_title_key" ON "Job"("title");
