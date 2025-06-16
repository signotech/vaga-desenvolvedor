"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NovaVagaPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.titulo || !formData.descricao || !formData.tipo) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }
    try {
      const response = await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.titulo,
          description: formData.descricao,
          type: formData.tipo,
        }),
      })
      if (!response.ok) {
        throw new Error("Erro ao salvar a vaga")
      }
      toast({
        title: "Sucesso",
        description: "Vaga criada com sucesso.",
      })
      router.push("/vagas")
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível salvar a vaga.",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <SidebarTrigger />
        <Link href="/vagas">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Nova Vaga</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações principais da vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Vaga *</Label>
              <Input
                id="titulo"
                placeholder="Ex: Desenvolvedor Frontend React"
                value={formData.titulo}
                onChange={e => handleInputChange("titulo", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Contratação *</Label>
              <Select value={formData.tipo} onValueChange={value => handleInputChange("tipo", value)}>
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
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Vaga *</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva as responsabilidades e atividades da vaga..."
                className="min-h-[120px]"
                value={formData.descricao}
                onChange={e => handleInputChange("descricao", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end space-x-4">
          <Link href="/vagas">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Salvar Vaga
          </Button>
        </div>
      </form>
    </div>
  )
}
