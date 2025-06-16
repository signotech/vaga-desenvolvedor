"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Filter, Edit, Trash2, Pause, Play } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Vaga {
  id: number
  title: string
  type: "CLT" | "PJ" | "FREELANCER"
  active: boolean
}

export default function VagasPage() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then(res => res.json())
      .then(data => setVagas(data))
  }, [])

  const toggleVagaStatus = async (vaga: Vaga) => {
    const updatedVaga = { ...vaga, active: !vaga.active }
    await fetch(`http://localhost:3000/jobs/${vaga.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVaga),
    })
    setVagas(prev => prev.map(v => (v.id === vaga.id ? updatedVaga : v)))
  }

  const deleteVaga = async (vagaId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) return
    await fetch(`http://localhost:3000/jobs/${vagaId}`, { method: "DELETE" })
    setVagas(prev => prev.filter(v => v.id !== vagaId))
  }

  const filteredVagas = vagas.filter(vaga => {
    const status = vaga.active ? "ativa" : "pausada"
    const matchesSearch = vaga.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || status === statusFilter
    const matchesTipo = tipoFilter === "todos" || vaga.type === tipoFilter
    return matchesSearch && matchesStatus && matchesTipo
  })

  const totalPages = Math.ceil(filteredVagas.length / itemsPerPage)
  const paginatedVagas = filteredVagas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusBadge = (active: boolean) =>
    active ? (
      <Badge variant="default" className="bg-green-100 text-green-800">Ativa</Badge>
    ) : (
      <Badge variant="secondary">Pausada</Badge>
    )

  const getTipoBadge = (tipo: string) => {
    const colors = {
      CLT: "bg-blue-100 text-blue-800",
      PJ: "bg-purple-100 text-purple-800",
      FREELANCER: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge variant="outline" className={colors[tipo as keyof typeof colors]}>
        {tipo === "FREELANCER" ? "Freelancer" : tipo}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Vagas</h2>
        </div>
        <Link href="/vagas/nova">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Vaga
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Use os filtros abaixo para encontrar vagas específicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título da vaga..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={value => { setStatusFilter(value); setCurrentPage(1) }}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pausada">Pausada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={value => { setTipoFilter(value); setCurrentPage(1) }}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="CLT">CLT</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="FREELANCER">Freelancer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Vagas ({filteredVagas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVagas.map(vaga => (
                <TableRow key={vaga.id}>
                  <TableCell className="font-medium">{vaga.title}</TableCell>
                  <TableCell>{getTipoBadge(vaga.type)}</TableCell>
                  <TableCell>{getStatusBadge(vaga.active)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/vagas/${vaga.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleVagaStatus(vaga)}>
                          {vaga.active ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteVaga(vaga.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex justify-between items-center mt-4">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </Button>

            <div>
              Página {currentPage} de {totalPages}
            </div>

            <Button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
