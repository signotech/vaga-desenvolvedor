const { PrismaClient, ContractType } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const candidate1 = await prisma.candidate.upsert({
    where: { email: 'sabrina@example.com' },
    update: { phone: '11111111111', name: 'Sabrina Campos' },
    create: {
      name: 'Sabrina Campos',
      email: 'sabrina@example.com',
      phone: '11111111111',
    },
  });

  const candidate2 = await prisma.candidate.upsert({
    where: { email: 'davi.camargo@example.com' },
    update: { phone: '55988887777', name: 'Davi Camargo' },
    create: {
      name: 'Davi Camargo',
      email: 'davi.camargo@example.com',
      phone: '55988887777',
    },
  });

  const candidate3 = await prisma.candidate.upsert({
    where: { email: 'mariana.souza@example.com' },
    update: { phone: '75977776666', name: 'Mariana Souza' },
    create: {
      name: 'Mariana Souza',
      email: 'mariana.souza@example.com',
      phone: '75977776666',
    },
  });

  const job1 = await prisma.job.upsert({
    where: { title: 'Desenvolvedor Fullstack' },
    update: { description: 'Desenvolvimento com Node.js e React', type: ContractType.PJ },
    create: {
      title: 'Desenvolvedor Fullstack',
      description: 'Desenvolvimento com Node.js e React',
      type: ContractType.PJ,
    },
  });

  const job2 = await prisma.job.upsert({
    where: { title: 'Freelancer UX Designer' },
    update: { description: 'Redesign de plataforma educacional', type: ContractType.FREELANCER },
    create: {
      title: 'Freelancer UX Designer',
      description: 'Redesign de plataforma educacional',
      type: ContractType.FREELANCER,
    },
  });

  const job3 = await prisma.job.upsert({
    where: { title: 'Analista de Dados' },
    update: { description: 'Análise e visualização de dados em Python', type: ContractType.CLT },
    create: {
      title: 'Analista de Dados',
      description: 'Análise e visualização de dados em Python',
      type: ContractType.CLT,
    },
  });

  await prisma.application.deleteMany();

  await prisma.application.create({
    data: {
      candidateId: candidate1.id,
      jobId: job1.id,
      active: true,
    },
  });

  await prisma.application.create({
    data: {
      candidateId: candidate2.id,
      jobId: job2.id,
      active: true,
    },
  });

  await prisma.application.create({
    data: {
      candidateId: candidate3.id,
      jobId: job3.id,
      active: false,
    },
  });

  await prisma.application.create({
    data: {
      candidateId: candidate2.id,
      jobId: job1.id,
      active: true,
    },
  });

  console.log('Seed concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
