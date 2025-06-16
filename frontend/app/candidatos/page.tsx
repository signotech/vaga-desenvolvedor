"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Edit, Trash2, Filter, Trash } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Candidate {
  id: number
  name: string
  email: string
}

export default function CandidatosPage() {
  const { toast } = useToast()
  const [candidatos, setCandidatos] = useState<Candidate[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    fetch("http://localhost:3000/candidates")
      .then((res) => res.json())
      .then((data) => setCandidatos(data))
  }, [])

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Tem certeza que deseja excluir este candidato?")
    if (!confirmed) return

    try {
      await fetch(`http://localhost:3000/candidates/${id}`, {
        method: "DELETE",
      })

      setCandidatos((prev) => prev.filter((candidato) => candidato.id !== id))

      toast({
        title: "Sucesso",
        description: "Candidato excluído com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao excluir candidato:", error)
      toast({
        title: "Erro",
        description: "Erro ao excluir candidato.",
        variant: "destructive",
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(pagedCandidatos.map((candidato) => candidato.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (candidatoId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, candidatoId])
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== candidatoId))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir ${selectedItems.length} candidato(s) selecionado(s)?`,
    )

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await Promise.all(
        selectedItems.map((id) => fetch(`http://localhost:3000/candidates/${id}`, { method: "DELETE" })),
      )

      setCandidatos((prev) => prev.filter((candidato) => !selectedItems.includes(candidato.id)))
      setSelectedItems([])

      toast({
        title: "Sucesso",
        description: `${selectedItems.length} candidato(s) excluído(s) com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir candidatos selecionados.",
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

  const filteredCandidatos = candidatos.filter(
    (candidato) =>
      candidato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidato.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCandidatos.length / itemsPerPage)
  const pagedCandidatos = filteredCandidatos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getInitials = (nome: string) => {
    return nome
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const isAllSelected = pagedCandidatos.length > 0 && selectedItems.length === pagedCandidatos.length

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredCandidatos.length)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Candidatos</h2>
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
          <Button onClick={() => (window.location.href = "http://localhost:3001/candidatos/nova")}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Candidato
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Candidatos</CardTitle>
          <CardDescription>Encontre candidatos por nome ou email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Candidatos ({filteredCandidatos.length})</CardTitle>
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
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} aria-label="Selecionar todos" />
                </TableHead>
                <TableHead>Candidato</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagedCandidatos.map((candidato) => (
                <TableRow key={candidato.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(candidato.id)}
                      onCheckedChange={(checked) => handleSelectItem(candidato.id, checked as boolean)}
                      aria-label={`Selecionar ${candidato.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(candidato.name)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{candidato.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{candidato.email}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/candidatos/${candidato.id}/editar`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(candidato.id)}>
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

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {startItem} a {endItem} de {filteredCandidatos.length} resultados
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
