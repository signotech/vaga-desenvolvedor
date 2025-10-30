/*
  Warnings:

  - You are about to drop the `candidate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."job_application" DROP CONSTRAINT "job_application_candidateId_fkey";

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "portfolio" TEXT,
ADD COLUMN     "resumeUrl" TEXT;

-- DropTable
DROP TABLE "public"."candidate";

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
