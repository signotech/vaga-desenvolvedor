"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Job {
  id: number;
  title: string;
}

interface CreateCandidateDTO {
  name: string;
  email: string;
  phone?: string;
}

export default function CreateCandidatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCandidateDTO>({ name: "", email: "", phone: "" });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("http://localhost:3000/jobs");
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleInputChange = (field: keyof CreateCandidateDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const candidateRes = await fetch("http://localhost:3000/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!candidateRes.ok) throw new Error("Erro ao criar candidato");

      const candidate = await candidateRes.json();

      const applicationRes = await fetch("http://localhost:3000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidate.id,
          jobId: Number(selectedJobId),
          active: true,
        }),
      });

      if (!applicationRes.ok) throw new Error("Erro ao criar inscrição");

      router.push("/inscricoes");
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    selectedJobId.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Nova Inscrição</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Preencha suas informações para se candidatar à vaga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome Completo <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: João Silva Santos"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ex: joao@email.com"
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
                  placeholder="Ex: (11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Vaga <span className="text-red-500">*</span>
                </Label>
                <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a vaga" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id.toString()}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 mt-6">
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
              {isSubmitting ? "Enviando..." : "Enviar Inscrição"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
