"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, UserCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { jobService } from "../../src/services/jobService";
import { candidateService } from "../../src/services/candidateService";
import { applicationService } from "../../src/services/applicationService";

type Job = {
  id: number;
  active: boolean;
  title: string;
};

type Candidate = {
  id: number;
  name: string;
  createdAt: string;
};

type Application = {
  id: number;
  active: boolean;
  candidateId: number;
  jobId: number;
  createdAt: string;
};

export default function DashboardPage() {
  const [activeJobs, setActiveJobs] = useState(0);
  const [pausedJobs, setPausedJobs] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [newCandidatesThisWeek, setNewCandidatesThisWeek] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);
  const [conversionRate, setConversionRate] = useState("0%");
  const [applicationsData, setApplicationsData] = useState<
    { id: number; active: boolean; candidateName: string; jobTitle: string }[]
  >([]);

  useEffect(() => {
    async function loadDashboardData() {
      const jobsResponse = await jobService.getJobs();
      const jobs: Job[] = jobsResponse;
      setActiveJobs(jobs.filter((j) => j.active).length);
      setPausedJobs(jobs.filter((j) => !j.active).length);

      const candidatesResponse = await candidateService.getCandidates();
      const candidates: Candidate[] = candidatesResponse;
      setTotalCandidates(candidates.length);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      setNewCandidatesThisWeek(candidates.filter((c) => new Date(c.createdAt) >= oneWeekAgo).length);

      const applicationsResponse = await applicationService.getApplications();
      const applications: Application[] = applicationsResponse;
      setTotalApplications(applications.length);
      setPendingApplications(applications.filter((app) => !app.active).length);

      const rate = ((applications.filter((app) => app.active).length / applications.length) * 100).toFixed(0) + "%";
      setConversionRate(rate);

      const enrichedApps = applications.map((app) => {
        const candidate = candidates.find((c) => c.id === app.candidateId);
        const job = jobs.find((j) => j.id === app.jobId);
        return {
          id: app.id,
          active: app.active,
          candidateName: candidate ? candidate.name : "Desconhecido",
          jobTitle: job ? job.title : "Desconhecido",
        };
      });
      setApplicationsData(enrichedApps);
    }

    loadDashboardData();
  }, []);

  const stats = [
    {
      title: "Total de Vagas",
      value: `${activeJobs + pausedJobs}`,
      description: `${activeJobs} ativas, ${pausedJobs} pausadas`,
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Candidatos",
      value: `${totalCandidates}`,
      description: `${newCandidatesThisWeek} novos esta semana`,
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Inscrições",
      value: `${totalApplications}`,
      description: `${pendingApplications} pendentes`,
      icon: UserCheck,
      color: "text-orange-600",
    },
    {
      title: "Taxa de Conversão",
      value: conversionRate,
      description: "+2% vs mês anterior",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse rapidamente as funcionalidades mais utilizadas</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Link href="/vagas/nova" className="flex">
              <Card className="cursor-pointer transition-colors hover:bg-muted/50 flex-1 flex flex-col justify-center">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Nova Vaga</h3>
                  <p className="text-sm text-muted-foreground text-center">Criar uma nova oportunidade</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/candidatos/nova" className="flex">
              <Card className="cursor-pointer transition-colors hover:bg-muted/50 flex-1 flex flex-col justify-center">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Novo Candidato</h3>
                  <p className="text-sm text-muted-foreground text-center">Cadastrar candidato</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/inscricoes" className="flex">
              <Card className="cursor-pointer transition-colors hover:bg-muted/50 flex-1 flex flex-col justify-center">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <UserCheck className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Ver Inscrições</h3>
                  <p className="text-sm text-muted-foreground text-center">Gerenciar inscrições</p>
                </CardContent>
              </Card>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {applicationsData.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma inscrição encontrada.</p>}
            {applicationsData.map((app) => (
              <div key={app.id} className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${app.active ? "bg-green-500" : "bg-gray-400"}`}></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{app.candidateName} se inscreveu para {app.jobTitle}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
