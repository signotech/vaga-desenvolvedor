"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Save, X, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export interface CreateCandidateDTO {
  name: string
  email: string
  phone?: string
}

interface Candidate extends CreateCandidateDTO {
  id: number
  createdAt: Date
}

interface EditCandidatePageProps {
  params: {
    id: string
  }
}

export default function EditCandidatePage({ params }: EditCandidatePageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateCandidateDTO>({
    name: "",
    email: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadCandidateData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/candidates/${params.id}`)
        const candidate: Candidate = await response.json()
        setFormData({
          name: candidate.name,
          email: candidate.email,
          phone: candidate.phone ?? "",
        })
      } catch {
      } finally {
        setIsLoading(false)
      }
    }

    loadCandidateData()
  }, [params.id])

  const handleInputChange = (field: keyof CreateCandidateDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch(`http://localhost:3000/candidates/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      router.push("/candidatos")
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = confirm("Tem certeza que deseja excluir este candidato?")
    if (!confirmed) return

    try {
      await fetch(`http://localhost:3000/candidates/${params.id}`, {
        method: "DELETE",
      })
      router.push("/candidatos")
    } catch {}
  }

  const isFormValid = formData.name.trim() !== "" && formData.email.trim() !== ""

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando dados do candidato...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Editar Candidato</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Candidato</CardTitle>
              <CardDescription>Atualize os dados do candidato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Sabrina Pereira"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: sabrina@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ex: (11) 91234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="destructive"
              className="flex items-center gap-2"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
              Excluir
            </Button>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
