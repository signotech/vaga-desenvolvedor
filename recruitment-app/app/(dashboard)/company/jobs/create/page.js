"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CreateJobPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    type: "CLT",
    description: "",
    requirements: "",
    location: "",
    salaryRange: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(Number(id));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("userId: ", userId);
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.title || !formData.description) {
      setError("Título e descrição são obrigatórios.");
      return;
    }

    if (!userId) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/jobs", {
        ...formData,
        userId: Number(userId),
      });

      setSuccess("Vaga criada com sucesso!");
      setTimeout(() => router.push("/company"), 1500);
    } catch (err) {
      console.error(err);
      setError("Erro ao criar vaga. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          <h1 className="text-2xl font-bold text-primary">Criar nova vaga</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-background-secondary p-6 rounded-xl border border-border shadow-sm"
        >
          <div className="grid gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Título *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Desenvolvedor Front-end"
                className="w-full p-2 rounded-md border border-border bg-background text-foreground"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Tipo de contrato</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-border bg-background text-foreground"
              >
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="FREELANCE">Freelancer</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Descrição *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva brevemente as responsabilidades e escopo da vaga"
                className="w-full p-2 rounded-md border border-border bg-background text-foreground resize-none"
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium mb-1">Requisitos</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={3}
                placeholder="Ex: React, Node.js, Git..."
                className="w-full p-2 rounded-md border border-border bg-background text-foreground resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Localização</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Remoto, Curitiba - PR"
                className="w-full p-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-1">Faixa salarial</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="Ex: R$ 4.000 - R$ 6.000"
                className="w-full p-2 rounded-md border border-border bg-background text-foreground"
              />
            </div>

            {/* Buttons & Feedback */}
            <div className="flex items-center justify-between mt-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : "Criar vaga"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
