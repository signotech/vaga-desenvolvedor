"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Candidate {
  id: number
  name: string
  email: string
}

interface Job {
  id: number
  title: string
}

interface Application {
  id: number
  candidateId: number
  jobId: number
  active: boolean
  appliedAt: string
}

export default function InscricoesPage() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobFilter, setJobFilter] = useState("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchData = async () => {
      const [appRes, candRes, jobRes] = await Promise.all([
        fetch("http://localhost:3000/applications"),
        fetch("http://localhost:3000/candidates"),
        fetch("http://localhost:3000/jobs")
      ])
      const [apps, cands, jobs] = await Promise.all([
        appRes.json(),
        candRes.json(),
        jobRes.json()
      ])
      setApplications(apps)
      setCandidates(cands)
      setJobs(jobs)
    }

    fetchData()
  }, [])

  const inscricoesCompletas = applications.map((app) => {
    const candidato = candidates.find(c => c.id === app.candidateId)
    const vaga = jobs.find(j => j.id === app.jobId)
    return {
      ...app,
      candidato,
      vaga
    }
  })

  const filteredInscricoes = inscricoesCompletas.filter((inscricao) => {
    const matchesSearch =
      (inscricao.candidato?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inscricao.vaga?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesJob = jobFilter === "todos" || (inscricao.vaga?.id.toString() === jobFilter)
    return matchesSearch && matchesJob
  })

  const totalPages = Math.ceil(filteredInscricoes.length / itemsPerPage)

  const pagedInscricoes = filteredInscricoes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getInitials = (nome: string) => {
    return nome
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Inscrições</h2>
        </div>
        <Button
          onClick={() => router.push("/candidatos/nova")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Inscrição
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por candidato ou vaga..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={jobFilter} onValueChange={(value) => {
              setJobFilter(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Filtrar por vaga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Vagas</SelectItem>
                {jobs.map(job => (
                  <SelectItem key={job.id} value={job.id.toString()}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Inscrições ({filteredInscricoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidato</TableHead>
                <TableHead>Vaga</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedInscricoes.map((inscricao) => (
                <TableRow key={inscricao.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(inscricao.candidato?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{inscricao.candidato?.name}</div>
                        <div className="text-sm text-muted-foreground">{inscricao.candidato?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{inscricao.vaga?.title}</TableCell>
                  <TableCell className="text-right" />
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-center space-x-4 mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Próximo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
