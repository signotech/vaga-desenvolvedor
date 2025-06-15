"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function NovaVagaPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "",
    salarioMin: "",
    salarioMax: "",
    localizacao: "",
    requisitos: "",
    beneficios: "",
    ativa: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.titulo || !formData.descricao || !formData.tipo) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Simular salvamento
    toast({
      title: "Sucesso!",
      description: "Vaga criada com sucesso.",
    })

    router.push("/vagas")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Vaga *</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Desenvolvedor Frontend React"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Contratação *</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição da Vaga *</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva as responsabilidades e atividades da vaga..."
                className="min-h-[120px]"
                value={formData.descricao}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="localizacao">Localização</Label>
              <Input
                id="localizacao"
                placeholder="Ex: São Paulo - SP (Remoto)"
                value={formData.localizacao}
                onChange={(e) => handleInputChange("localizacao", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Remuneração</CardTitle>
            <CardDescription>Defina a faixa salarial para a vaga</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salarioMin">Salário Mínimo (R$)</Label>
                <Input
                  id="salarioMin"
                  type="number"
                  placeholder="5000"
                  value={formData.salarioMin}
                  onChange={(e) => handleInputChange("salarioMin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salarioMax">Salário Máximo (R$)</Label>
                <Input
                  id="salarioMax"
                  type="number"
                  placeholder="8000"
                  value={formData.salarioMax}
                  onChange={(e) => handleInputChange("salarioMax", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhes Adicionais</CardTitle>
            <CardDescription>Requisitos e benefícios da vaga</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="requisitos">Requisitos</Label>
              <Textarea
                id="requisitos"
                placeholder="Liste os requisitos necessários para a vaga..."
                className="min-h-[100px]"
                value={formData.requisitos}
                onChange={(e) => handleInputChange("requisitos", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficios">Benefícios</Label>
              <Textarea
                id="beneficios"
                placeholder="Liste os benefícios oferecidos..."
                className="min-h-[100px]"
                value={formData.beneficios}
                onChange={(e) => handleInputChange("beneficios", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Defina se a vaga estará ativa imediatamente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="ativa"
                checked={formData.ativa}
                onCheckedChange={(checked) => handleInputChange("ativa", checked)}
              />
              <Label htmlFor="ativa">Vaga ativa (candidatos podem se inscrever)</Label>
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
