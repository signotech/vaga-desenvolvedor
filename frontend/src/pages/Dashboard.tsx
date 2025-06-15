"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Users, Briefcase, FileText, Bell, Plus } from "lucide-react"

interface DashboardStats {
  totalJobs: number
  totalCandidates: number
  totalApplications: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    totalCandidates: 0,
    totalApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  async function fetchDashboardData() {
    setLoading(true)
    try {
      const [jobsRes, candidatesRes, applicationsRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/candidates"),
        fetch("/api/applications"),
      ])

      if (!jobsRes.ok || !candidatesRes.ok || !applicationsRes.ok) {
        throw new Error("Falha ao buscar dados")
      }

      const jobs = await jobsRes.json()
      const candidates = await candidatesRes.json()
      const applications = await applicationsRes.json()

      setStats({
        totalJobs: Array.isArray(jobs) ? jobs.length : 0,
        totalCandidates: Array.isArray(candidates) ? candidates.length : 0,
        totalApplications: Array.isArray(applications) ? applications.length : 0,
      })
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  function handleNavigate(section: string) {
    console.log(`Navegando para: ${section}`)
    alert(`Navegando para: ${section}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumo do sistema</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Vagas</CardTitle>
              <Briefcase className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalJobs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Candidatos</CardTitle>
              <Users className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalCandidates}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Inscrições</CardTitle>
              <FileText className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Navegação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={() => handleNavigate("vagas")} className="h-16 bg-blue-600 hover:bg-blue-700">
                <Briefcase className="h-5 w-5 mr-2" />
                Vagas
              </Button>

              <Button onClick={() => handleNavigate("candidatos")} className="h-16 bg-green-600 hover:bg-green-700">
                <Users className="h-5 w-5 mr-2" />
                Candidatos
              </Button>

              <Button onClick={() => handleNavigate("inscricoes")} className="h-16 bg-purple-600 hover:bg-purple-700">
                <FileText className="h-5 w-5 mr-2" />
                Inscrições
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <Button onClick={() => handleNavigate("nova-vaga")} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Nova Vaga
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>Você tem 3 novas candidaturas para revisar</AlertDescription>
          </Alert>

          <Alert>
            <Bell className="h-4 w-4" />
            <AlertDescription>2 vagas estão próximas do prazo de expiração</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
