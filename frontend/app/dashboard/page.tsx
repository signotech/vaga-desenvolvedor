import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, UserCheck, TrendingUp } from "lucide-react"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"

const stats = [
  {
    title: "Total de Vagas",
    value: "24",
    description: "8 ativas, 16 pausadas",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    title: "Candidatos",
    value: "156",
    description: "12 novos esta semana",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Inscrições",
    value: "89",
    description: "23 pendentes",
    icon: UserCheck,
    color: "text-orange-600",
  },
  {
    title: "Taxa de Conversão",
    value: "12%",
    description: "+2% vs mês anterior",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

const quickActions = [
  {
    title: "Nova Vaga",
    description: "Criar uma nova oportunidade",
    href: "/vagas/nova",
    icon: Briefcase,
  },
  {
    title: "Novo Candidato",
    description: "Cadastrar candidato",
    href: "/candidatos/novo",
    icon: Users,
  },
  {
    title: "Ver Inscrições",
    description: "Gerenciar inscrições",
    href: "/inscricoes",
    icon: UserCheck,
  },
]

export default function DashboardPage() {
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
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                  <CardContent className="flex flex-col items-center space-y-2 p-6">
                    <action.icon className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Nova inscrição</p>
                <p className="text-xs text-muted-foreground">João Silva se inscreveu para Desenvolvedor Frontend</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Vaga criada</p>
                <p className="text-xs text-muted-foreground">Designer UX/UI foi publicada</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Candidato cadastrado</p>
                <p className="text-xs text-muted-foreground">Maria Santos adicionada ao sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
