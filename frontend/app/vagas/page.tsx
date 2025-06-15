"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const vagas = [
  {
    id: 1,
    titulo: "Desenvolvedor Frontend React",
    tipo: "CLT",
    status: "ativa",
    candidatos: 12,
    dataPublicacao: "2024-01-15",
    salario: "R$ 8.000 - R$ 12.000",
  },
  {
    id: 2,
    titulo: "Designer UX/UI",
    tipo: "PJ",
    status: "pausada",
    candidatos: 8,
    dataPublicacao: "2024-01-10",
    salario: "R$ 6.000 - R$ 10.000",
  },
  {
    id: 3,
    titulo: "Desenvolvedor Backend Node.js",
    tipo: "CLT",
    status: "ativa",
    candidatos: 15,
    dataPublicacao: "2024-01-20",
    salario: "R$ 9.000 - R$ 14.000",
  },
  {
    id: 4,
    titulo: "Freelancer WordPress",
    tipo: "Freelancer",
    status: "ativa",
    candidatos: 5,
    dataPublicacao: "2024-01-18",
    salario: "R$ 3.000 - R$ 5.000",
  },
]

export default function VagasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")

  const filteredVagas = vagas.filter((vaga) => {
    const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || vaga.status === statusFilter
    const matchesTipo = tipoFilter === "todos" || vaga.tipo === tipoFilter
    return matchesSearch && matchesStatus && matchesTipo
  })

  const getStatusBadge = (status: string) => {
    return status === "ativa" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Ativa
      </Badge>
    ) : (
      <Badge variant="secondary">Pausada</Badge>
    )
  }

  const getTipoBadge = (tipo: string) => {
    const colors = {
      CLT: "bg-blue-100 text-blue-800",
      PJ: "bg-purple-100 text-purple-800",
      Freelancer: "bg-orange-100 text-orange-800",
    }
    return (
      <Badge variant="outline" className={colors[tipo as keyof typeof colors]}>
        {tipo}
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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título da vaga..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pausada">Pausada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Tipos</SelectItem>
                <SelectItem value="CLT">CLT</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="Freelancer">Freelancer</SelectItem>
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
                <TableHead>Candidatos</TableHead>
                <TableHead>Salário</TableHead>
                <TableHead>Data Publicação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVagas.map((vaga) => (
                <TableRow key={vaga.id}>
                  <TableCell className="font-medium">{vaga.titulo}</TableCell>
                  <TableCell>{getTipoBadge(vaga.tipo)}</TableCell>
                  <TableCell>{getStatusBadge(vaga.status)}</TableCell>
                  <TableCell>{vaga.candidatos}</TableCell>
                  <TableCell>{vaga.salario}</TableCell>
                  <TableCell>{new Date(vaga.dataPublicacao).toLocaleDateString("pt-BR")}</TableCell>
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
                          <Link href={`/vagas/${vaga.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/vagas/${vaga.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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
        </CardContent>
      </Card>
    </div>
  )
}
