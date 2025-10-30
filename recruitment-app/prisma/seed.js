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
        name: "Candidato 1",
        email: "candidato1@teste.com",
        password: "1234",
        role: Role.CANDIDATE,
        phone: "(12)34567-8912",
        bio: "Desenvolvedor Full Stack",
        portfolio: "https://github/com/candidato1",
        resumeUrl: "https://example.com/resume-candidato1.pdf",
      },
      {
        name: "Candidato 2",
        email: "candidato2@teste.com",
        password: "1234",
        role: Role.CANDIDATE,
        phone: "(12)34567-1234",
        bio: "Desenvolvedor Front-end",
        portfolio: "https://github/com/candidato2",
        resumeUrl: "https://example.com/resume-candidato2.pdf",
      },
    ],
  });

  console.log("Users created");

  const company = await prisma.user.findFirst({
    where: {
      role: Role.COMPANY,
    }
  })

  await prisma.job.createMany({
    data: [
      {
        title: "Desenvolvedor(a) Front-end",
        type: JobType.CLT,
        description: "Buscamos um(a) desenvolvedor(a) front-end",
        requirements: "React, Next.js, JavaScript, Git, HTML, CSS",
        salaryRange: "R$3000-R$4000",
        userId: company.id,
      },
      {
        title: "Desenvolvedor(a) Back-end",
        type: JobType.PJ,
        description: "Buscamos um(a) desenvolvedor(a) back-end",
        requirements: "Node.js, JavaScript, PosgreSQL, Docker",
        salaryRange: "R$3000-R$4000",
        userId: company.id,
      },
    ],
  });

  console.log("Jobs created")

  const jobList = await prisma.job.findMany();
  const candidates = await prisma.user.findMany({
    where: {
      role: Role.CANDIDATE
    }
  })

  await prisma.jobApplication.createMany({
    data: [
      {
        jobId: jobList[0].id,
        candidateId: candidates[0].id,
      },
      {
        jobId: jobList[1].id,
        candidateId: candidates[1].id,
      },
    ],
  });

  console.log("Applications created");

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
