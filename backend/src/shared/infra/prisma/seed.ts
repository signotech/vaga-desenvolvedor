const { PrismaClient, ContractType } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.application.deleteMany();
  await prisma.candidate.deleteMany();
  await prisma.job.deleteMany();

  const candidates = [];
  for (let i = 1; i <= 20; i++) {
    const candidate = await prisma.candidate.create({
      data: {
        name: `Candidato ${i}`,
        email: `candidato${i}@example.com`,
        phone: `719999900${i.toString().padStart(2, '0')}`,
      },
    });
    candidates.push(candidate);
  }

  const contractTypes = [ContractType.CLT, ContractType.PJ, ContractType.FREELANCER];

  const jobs = [];
  for (let i = 1; i <= 20; i++) {
    const job = await prisma.job.create({
      data: {
        title: `Vaga ${i}`,
        description: `Descrição da vaga ${i} com atividades relevantes.`,
        type: contractTypes[i % contractTypes.length],
      },
    });
    jobs.push(job);
  }

  for (let i = 0; i < 20; i++) {
    await prisma.application.create({
      data: {
        candidateId: candidates[i % candidates.length].id,
        jobId: jobs[(i + 3) % jobs.length].id,
        active: i % 2 === 0, 
      },
    });
  }

  console.log('Seed populada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
