"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

type ContractType = "CLT" | "PJ" | "FREELANCER"

interface Job {
  id: number
  title: string
  description: string
  type: ContractType
  active: boolean
  createdAt: string
  updatedAt: string
}

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "paused">("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "CLT" as ContractType,
  })

  async function loadJobs() {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/jobs")
      if (!res.ok) throw new Error("Erro ao carregar vagas")
      const data = await res.json()
      setJobs(data)
    } catch (error) {
      toast({ title: "Erro ao carregar vagas", variant: "destructive" })
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadJobs()
  }, [])

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit() {
    if (!form.title || !form.description) {
      toast({ title: "Preencha todos os campos", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Erro ao criar vaga")
      toast({ title: "Vaga criada com sucesso" })
      setForm({ title: "", description: "", type: "CLT" })
      loadJobs()
    } catch {
      toast({ title: "Erro ao criar vaga", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true
    if (filter === "active") return job.active === true
    if (filter === "paused") return job.active === false
    return true
  })

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage)

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Vaga</CardTitle>
          <CardDescription>Preencha os dados para criar uma nova vaga</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex.: Desenvolvedor Frontend"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Descreva a vaga..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Tipo de Contrato</Label>
            <Select value={form.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLT">CLT</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="FREELANCER">Freelancer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Criando..." : "Criar Vaga"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Vagas Criadas</CardTitle>
            <CardDescription>Gerencie suas vagas cadastradas</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              size="sm"
            >
              Todas
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
              size="sm"
            >
              Ativas
            </Button>
            <Button
              variant={filter === "paused" ? "default" : "outline"}
              onClick={() => setFilter("paused")}
              size="sm"
            >
              Pausadas
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          {loading && <p>Carregando vagas...</p>}
          {!loading && paginatedJobs.length === 0 && <p>Nenhuma vaga encontrada.</p>}
          {!loading && paginatedJobs.length > 0 && (
            <ul className="grid gap-3">
              {paginatedJobs.map((job) => (
                <li key={job.id} className="border rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.active ? "Ativa" : "Pausada"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                  <p className="text-sm">Tipo: {job.type}</p>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="text-sm">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
