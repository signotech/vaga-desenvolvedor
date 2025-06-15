"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Eye, UserCheck, X } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const inscricoes = [
  {
    id: 1,
    candidato: {
      nome: "João Silva",
      email: "joao.silva@email.com",
    },
    vaga: {
      titulo: "Desenvolvedor Frontend React",
      tipo: "CLT",
    },
    status: "pendente",
    dataInscricao: "2024-01-22",
    observacoes: "",
  },
  {
    id: 2,
    candidato: {
      nome: "Maria Santos",
      email: "maria.santos@email.com",
    },
    vaga: {
      titulo: "Designer UX/UI",
      tipo: "PJ",
    },
    status: "aprovado",
    dataInscricao: "2024-01-20",
    observacoes: "Perfil muito bom, experiência relevante",
  },
  {
    id: 3,
    candidato: {
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
    },
    vaga: {
      titulo: "Desenvolvedor Backend Node.js",
      tipo: "CLT",
    },
    status: "rejeitado",
    dataInscricao: "2024-01-18",
    observacoes: "Não atende aos requisitos técnicos",
  },
  {
    id: 4,
    candidato: {
      nome: "Ana Costa",
      email: "ana.costa@email.com",
    },
    vaga: {
      titulo: "Freelancer WordPress",
      tipo: "Freelancer",
    },
    status: "em_analise",
    dataInscricao: "2024-01-25",
    observacoes: "",
  },
]

export default function InscricoesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  const filteredInscricoes = inscricoes.filter((inscricao) => {
    const matchesSearch =
      inscricao.candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inscricao.vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || inscricao.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: { label: "Pendente", className: "bg-yellow-100 text-yellow-800" },
      em_analise: { label: "Em Análise", className: "bg-blue-100 text-blue-800" },
      aprovado: { label: "Aprovado", className: "bg-green-100 text-green-800" },
      rejeitado: { label: "Rejeitado", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
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

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
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
        <Link href="/inscricoes/nova">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Inscrição
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Use os filtros abaixo para encontrar inscrições específicas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por candidato ou vaga..."
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
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
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
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Inscrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInscricoes.map((inscricao) => (
                <TableRow key={inscricao.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(inscricao.candidato.nome)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{inscricao.candidato.nome}</div>
                        <div className="text-sm text-muted-foreground">{inscricao.candidato.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{inscricao.vaga.titulo}</TableCell>
                  <TableCell>{getTipoBadge(inscricao.vaga.tipo)}</TableCell>
                  <TableCell>{getStatusBadge(inscricao.status)}</TableCell>
                  <TableCell>{new Date(inscricao.dataInscricao).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-green-600">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          Rejeitar
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
