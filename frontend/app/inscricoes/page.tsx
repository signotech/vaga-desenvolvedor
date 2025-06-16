"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Trash2, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const [applications, setApplications] = useState<Application[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [jobFilter, setJobFilter] = useState("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      const [appRes, candRes, jobRes] = await Promise.all([
        fetch("http://localhost:3000/applications"),
        fetch("http://localhost:3000/candidates"),
        fetch("http://localhost:3000/jobs"),
      ])
      const [apps, cands, jobs] = await Promise.all([appRes.json(), candRes.json(), jobRes.json()])
      setApplications(apps)
      setCandidates(cands)
      setJobs(jobs)
    }

    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir esta inscrição?")
    if (!confirmed) return

    try {
      await fetch(`http://localhost:3000/applications/${id}`, {
        method: "DELETE",
      })

      setApplications((prev) => prev.filter((app) => app.id !== id))

      toast({
        title: "Sucesso",
        description: "Inscrição excluída com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir inscrição:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir inscrição.",
        variant: "destructive",
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(pagedInscricoes.map((inscricao) => inscricao.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (inscricaoId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, inscricaoId])
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== inscricaoId))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${selectedItems.length} inscrição(ões) selecionada(s)?`,
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await Promise.all(
        selectedItems.map((id) => fetch(`http://localhost:3000/applications/${id}`, { method: "DELETE" })),
      )

      setApplications((prev) => prev.filter((app) => !selectedItems.includes(app.id)))
      setSelectedItems([])

      toast({
        title: "Sucesso",
        description: `${selectedItems.length} inscrição(ões) excluída(s) com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir inscrições selecionadas.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const inscricoesCompletas = applications.map((app) => {
    const candidato = candidates.find((c) => c.id === app.candidateId)
    const vaga = jobs.find((j) => j.id === app.jobId)
    return {
      ...app,
      candidato,
      vaga,
    }
  })

  const filteredInscricoes = inscricoesCompletas.filter((inscricao) => {
    const matchesSearch =
      inscricao.candidato?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscricao.vaga?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesJob = jobFilter === "todos" || inscricao.vaga?.id.toString() === jobFilter
    return matchesSearch && matchesJob
  })

  const totalPages = Math.ceil(filteredInscricoes.length / itemsPerPage)

  const pagedInscricoes = filteredInscricoes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getInitials = (nome: string) => {
    return nome
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const isAllSelected = pagedInscricoes.length > 0 && selectedItems.length === pagedInscricoes.length

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredInscricoes.length)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Inscrições</h2>
        </div>
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              {isDeleting ? "Excluindo..." : `Excluir ${selectedItems.length}`}
            </Button>
          )}
          <Button onClick={() => router.push("/candidatos/nova")}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Inscrição
          </Button>
        </div>
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
            <Select
              value={jobFilter}
              onValueChange={(value) => {
                setJobFilter(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Filtrar por vaga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Vagas</SelectItem>
                {jobs.map((job) => (
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
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Inscrições ({filteredInscricoes.length})</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Itens por página:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label="Selecionar todas" />
                </TableHead>
                <TableHead>Candidato</TableHead>
                <TableHead>Vaga</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedInscricoes.map((inscricao) => (
                <TableRow key={inscricao.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(inscricao.id)}
                      onCheckedChange={(checked) => handleSelectItem(inscricao.id, checked as boolean)}
                      aria-label={`Selecionar inscrição de ${inscricao.candidato?.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(inscricao.candidato?.name || "")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{inscricao.candidato?.name}</div>
                        <div className="text-sm text-muted-foreground">{inscricao.candidato?.email}</div>
                        <div className="text-xs text-muted-foreground">
                          Inscrito em: {new Date(inscricao.appliedAt).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{inscricao.vaga?.title}</div>
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        inscricao.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {inscricao.active ? "Ativa" : "Inativa"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(inscricao.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {startItem} a {endItem} de {filteredInscricoes.length} resultados
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Próxima
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
