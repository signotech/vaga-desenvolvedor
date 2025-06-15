"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Eye, Edit, Trash2, Download } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const candidatos = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 99999-9999",
    cargo: "Desenvolvedor Frontend",
    experiencia: "3 anos",
    status: "ativo",
    dataCadastro: "2024-01-15",
    inscricoes: 3,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@email.com",
    telefone: "(11) 88888-8888",
    cargo: "Designer UX/UI",
    experiencia: "5 anos",
    status: "ativo",
    dataCadastro: "2024-01-10",
    inscricoes: 2,
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    telefone: "(11) 77777-7777",
    cargo: "Desenvolvedor Backend",
    experiencia: "4 anos",
    status: "inativo",
    dataCadastro: "2024-01-20",
    inscricoes: 1,
  },
  {
    id: 4,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 66666-6666",
    cargo: "Product Manager",
    experiencia: "6 anos",
    status: "ativo",
    dataCadastro: "2024-01-18",
    inscricoes: 4,
  },
]

export default function CandidatosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCandidatos = candidatos.filter(
    (candidato) =>
      candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.cargo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Ativo
      </Badge>
    ) : (
      <Badge variant="secondary">Inativo</Badge>
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
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Candidatos</h2>
        </div>
        <Link href="/candidatos/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Candidato
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Candidatos</CardTitle>
          <CardDescription>Encontre candidatos por nome, email ou cargo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Candidatos ({filteredCandidatos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidato</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Experiência</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inscrições</TableHead>
                <TableHead>Data Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidatos.map((candidato) => (
                <TableRow key={candidato.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(candidato.nome)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{candidato.nome}</div>
                        <div className="text-sm text-muted-foreground">{candidato.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{candidato.cargo}</TableCell>
                  <TableCell>{candidato.experiencia}</TableCell>
                  <TableCell>{getStatusBadge(candidato.status)}</TableCell>
                  <TableCell>{candidato.inscricoes}</TableCell>
                  <TableCell>{new Date(candidato.dataCadastro).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/candidatos/${candidato.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Perfil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/candidatos/${candidato.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Baixar Currículo
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
