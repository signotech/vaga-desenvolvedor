import pkg from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient, Role, JobType, JobStatus } = pkg;

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.jobApplication.deleteMany(),
    prisma.job.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const companyPassword = await bcrypt.hash("empresa123", 10);
  const candidatePassword = await bcrypt.hash("candidato123", 10);

  const companiesData = [
    {
      name: "Tech Solutions",
      email: "contato@techsolutions.com",
      password: companyPassword,
      role: Role.COMPANY,
      phone: "(11) 3333-0001",
      bio: "Consultoria especializada em projetos web e mobile.",
    },
    {
      name: "InovaRH",
      email: "talentos@inovarh.com",
      password: companyPassword,
      role: Role.COMPANY,
      phone: "(21) 2222-0002",
      bio: "Startup focada em contratar talentos de tecnologia.",
    },
  ];

  const candidatesData = [
    {
      name: "Ana Souza",
      email: "ana.souza@teste.com",
      password: candidatePassword,
      role: Role.CANDIDATE,
      phone: "(11) 98888-1111",
      bio: "Desenvolvedora Full Stack com foco em Node.js e React.",
      portfolio: "https://github.com/anasouza",
      resumeUrl: "https://example.com/resume-ana.pdf",
    },
    {
      name: "Bruno Oliveira",
      email: "bruno.oliveira@teste.com",
      password: candidatePassword,
      role: Role.CANDIDATE,
      phone: "(21) 97777-2222",
      bio: "Desenvolvedor Front-end especialista em Next.js.",
      portfolio: "https://github.com/bruno-oliveira",
      resumeUrl: "https://example.com/resume-bruno.pdf",
    },
    {
      name: "Carla Lima",
      email: "carla.lima@teste.com",
      password: candidatePassword,
      role: Role.CANDIDATE,
      phone: "(31) 96666-3333",
      bio: "UX/UI Designer com experiência em research e prototipação.",
      portfolio: "https://behance.net/carla-lima",
      resumeUrl: "https://example.com/resume-carla.pdf",
    },
  ];

  const companies = await Promise.all(
    companiesData.map((company) => prisma.user.create({ data: company }))
  );

  const candidates = await Promise.all(
    candidatesData.map((candidate) => prisma.user.create({ data: candidate }))
  );

  console.log("Users created:", companies.length + candidates.length);

  const jobsData = [
    {
      title: "Desenvolvedor(a) Front-end Pleno",
      type: JobType.CLT,
      status: JobStatus.IN_PROGRESS,
      description:
        "Buscamos alguém com experiência em React, Next.js e testes automatizados.",
      requirements:
        "React, Next.js, JavaScript, Jest, Git, HTML, CSS, boas práticas de testes.",
      location: "São Paulo - SP (híbrido)",
      salaryRange: "R$6.000 - R$8.000",
      userId: companies[0].id,
    },
    {
      title: "Desenvolvedor(a) Back-end Sênior",
      type: JobType.PJ,
      status: JobStatus.PAUSED,
      description:
        "Projeto de microsserviços com foco em Node.js e mensageria.",
      requirements:
        "Node.js, TypeScript, PostgreSQL, Docker, RabbitMQ, arquitetura hexagonal.",
      location: "Remoto",
      salaryRange: "R$12.000 - R$15.000",
      userId: companies[0].id,
    },
    {
      title: "Product Designer",
      type: JobType.FREELANCE,
      status: JobStatus.IN_PROGRESS,
      description:
        "Projeto de curta duração para redesenho completo do dashboard.",
      requirements:
        "Figma, UX Research, UI Design, Design System, testes com usuários.",
      location: "Remoto",
      salaryRange: "R$80 - R$120/hora",
      userId: companies[1].id,
    },
    {
      title: "Analista de Dados",
      type: JobType.CLT,
      status: JobStatus.FINISHED,
      description:
        "Construção de pipelines ETL e dashboards para área de marketing.",
      requirements:
        "SQL, Python, Power BI, Data Studio, modelagem de dados, versionamento.",
      location: "Rio de Janeiro - RJ (presencial)",
      salaryRange: "R$7.000 - R$9.000",
      userId: companies[1].id,
    },
  ];

  const jobs = await Promise.all(
    jobsData.map((job) => prisma.job.create({ data: job }))
  );

  console.log("Jobs created:", jobs.length);

  const jobApplicationsData = [
    {
      jobId: jobs[0].id,
      candidateId: candidates[0].id,
      status: JobStatus.IN_PROGRESS,
    },
    {
      jobId: jobs[0].id,
      candidateId: candidates[1].id,
      status: JobStatus.IN_PROGRESS,
    },
    {
      jobId: jobs[1].id,
      candidateId: candidates[1].id,
      status: JobStatus.PAUSED,
    },
    {
      jobId: jobs[2].id,
      candidateId: candidates[2].id,
      status: JobStatus.IN_PROGRESS,
    },
    {
      jobId: jobs[3].id,
      candidateId: candidates[0].id,
      status: JobStatus.FINISHED,
    },
  ];

  const jobApplications = await prisma.jobApplication.createMany({
    data: jobApplicationsData,
  });

  console.log("Job applications created:", jobApplications.count);
  console.log("Company logins -> contato@techsolutions.com / empresa123 | talentos@inovarh.com / empresa123");
  console.log("Candidate logins -> ana.souza@teste.com, bruno.oliveira@teste.com, carla.lima@teste.com (senha candidato123)");
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
