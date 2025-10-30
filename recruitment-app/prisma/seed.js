import pkg from "@prisma/client";
const { PrismaClient, Role, JobType } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: "Empresa X",
        email: "empresa@teste.com",
        password: "1234",
        role: Role.COMPANY,
      },
      {
        name: "Candidato X",
        email: "candidatox@teste.com",
        password: "1234",
        role: Role.CANDIDATE,
      },
    ],
  });

  console.log("User created");

  await prisma.job.createMany({
    data: [
      {
        title: "Desenvolvedor(a) Front-end",
        type: JobType.CLT,
        description: "Buscamos um(a) desenvolvedor(a) front-end",
        requirements: "React, Next.js, JavaScript, Git, HTML, CSS",
        salaryRange: "R$3000-R$4000",
        status: JobStatus.IN_PROGRESS,
      },
      {
        title: "Desenvolvedor(a) Back-end",
        type: JobType.PJ,
        description: "Buscamos um(a) desenvolvedor(a) back-end",
        requirements: "Node.js, JavaScript, PosgreSQL, Docker",
        salaryRange: "R$3000-R$4000",
        status: JobStatus.IN_PROGRESS,
      },
    ],
  });

  console.log("Jobs created");

  await prisma.candidate.createMany({
    data: [
      {
        name: "Candidato 1",
        email: "candidato1@teste.com",
        phone: "(12)34567-8912",
        bio: "Desenvolvedor Full Stack",
        portfolio: "https://github/com/candidato1",
        resumeUrl: "https://example.com/resume-candidato1.pdf",
        active: true,
      },
      {
        name: "Candidato 2",
        email: "candidato2@teste.com",
        phone: "(12)34567-1234",
        bio: "Desenvolvedor Front-end",
        portfolio: "https://github/com/candidato2",
        resumeUrl: "https://example.com/resume-candidato2.pdf",
        active: true,
      },
    ],
  });

  console.log("Candidates created");

  await prisma.jobApplication.createMany({
    data: [
      {
        jobId: 1,
        candidateId: 1,
        status: JobStatus.IN_PROGRESS,
      },
      {
        jobId: 2,
        candidateId: 2,
        status: JobStatus.IN_PROGRESS,
      },
    ],
  });

  console.log("Seed completed");
}

main()
  // If the function is sucessfull
  .then(async () => {
    await prisma.$disconnect();
  })
  // If the function fails
  .catch(async (e) => {
    console.error("Error during seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
