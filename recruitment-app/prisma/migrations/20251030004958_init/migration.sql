-- CreateEnum
CREATE TYPE "Role" AS ENUM ('COMPANY', 'CANDIDATE', 'ADMIN');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('CLT', 'PJ', 'FREELANCE');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('IN_PROGRESS', 'PAUSED', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CANDIDATE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "JobType" NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "location" TEXT,
    "salaryRange" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "status" "JobStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "bio" TEXT,
    "portfolio" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_application" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_email_key" ON "candidate"("email");

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
