-- DropForeignKey
ALTER TABLE "public"."job_application" DROP CONSTRAINT "job_application_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."job_application" DROP CONSTRAINT "job_application_jobId_fkey";

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
