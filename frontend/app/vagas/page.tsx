"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Search, Filter, Edit, Trash2, Pause, Play, Trash } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface Vaga {
  id: number
  title: string
  type: "CLT" | "PJ" | "FREELANCER"
  active: boolean
}

export default function VagasPage() {
  const { toast } = useToast()
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [tipoFilter, setTipoFilter] = useState("todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setVagas(data))
  }, [])

  const toggleVagaStatus = async (vaga: Vaga) => {
    const updatedVaga = { ...vaga, active: !vaga.active }
    await fetch(`http://localhost:3000/jobs/${vaga.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVaga),
    })
    setVagas((prev) => prev.map((v) => (v.id === vaga.id ? updatedVaga : v)))
  }

  const deleteVaga = async (vagaId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) return
    await fetch(`http://localhost:3000/jobs/${vagaId}`, { method: "DELETE" })
    setVagas((prev) => prev.filter((v) => v.id !== vagaId))
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(paginatedVagas.map((vaga) => vaga.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (vagaId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, vagaId])
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== vagaId))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return

    const confirmed = window.confirm(`Tem certeza que deseja excluir ${selectedItems.length} vaga(s) selecionada(s)?`)

    if (!confirmed) return

    setIsDeleting(true)
    try {
      await Promise.all(selectedItems.map((id) => fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" })))

      setVagas((prev) => prev.filter((vaga) => !selectedItems.includes(vaga.id)))
      setSelectedItems([])

      toast({
        title: "Sucesso",
        description: `${selectedItems.length} vaga(s) excluída(s) com sucesso.`,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir vagas selecionadas.",
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

  const filteredVagas = vagas.filter((vaga) => {
    const status = vaga.active ? "ativa" : "pausada"
    const matchesSearch = vaga.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || status === statusFilter
    const matchesTipo = tipoFilter === "todos" || vaga.type === tipoFilter
    return matchesSearch && matchesStatus && matchesTipo
  })

  const totalPages = Math.ceil(filteredVagas.length / itemsPerPage)
  const paginatedVagas = filteredVagas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusBadge = (active: boolean) =>
    active ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Ativa
      </Badge>
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

  const isAllSelected = paginatedVagas.length > 0 && selectedItems.length === paginatedVagas.length
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < paginatedVagas.length
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredVagas.length)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Vagas</h2>
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
          <Link href="/vagas/nova">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Vaga
            </Button>
          </Link>
        </div>
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
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-8"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="pausada">Pausada</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={tipoFilter}
              onValueChange={(value) => {
                setTipoFilter(value)
                setCurrentPage(1)
              }}
            >
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
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Vagas ({filteredVagas.length})</CardTitle>
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
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVagas.map((vaga) => (
                <TableRow key={vaga.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(vaga.id)}
                      onCheckedChange={(checked) => handleSelectItem(vaga.id, checked as boolean)}
                      aria-label={`Selecionar ${vaga.title}`}
                    />
                  </TableCell>
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

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Mostrando {startItem} a {endItem} de {filteredVagas.length} resultados
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
