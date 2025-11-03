"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/app/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  const [job, setJob] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    type: "CLT",
    description: "",
    requirements: "",
    location: "",
    salaryRange: "",
    status: "IN_PROGRESS",
  });

  // Search data job
  useEffect(() => {
    if (!jobId) return;
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`/api/jobs/${jobId}`);
        setJob(data.job);
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  // Fill the form with job data
  useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        type: job.type || "CLT",
        description: job.description || "",
        requirements: job.requirements || "",
        location: job.location || "",
        salaryRange: job.salaryRange || "",
        status: job.status || "IN_PROGRESS",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(`/api/jobs/${jobId}`, form);
      setEditing(false);
      router.refresh();
    } catch (error) {
      console.error("Erro ao atualizar vaga:", error);
    }
  };

  const handleDeleteJob = async () => {
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir esta vaga? Essa ação é irreversível."
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await axios.delete(`/api/jobs`, { data: { ids: [jobId] } });
      router.push("/company"); 
    } catch (error) {
      console.error("Erro ao excluir vaga:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="p-6 text-muted">Carregando vaga...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-muted hover:text-primary transition mb-4"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      <h1 className="text-3xl font-bold text-primary mb-8">
        {job?.title || "Editar vaga"}
      </h1>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Título da vaga
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Tipo de contratação
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          >
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="FREELANCE">Freelancer</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Descrição da vaga
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={!editing}
            rows={4}
            placeholder="Descreva as responsabilidades e atividades..."
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted resize-none ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Requisitos
          </label>
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            disabled={!editing}
            rows={3}
            placeholder="Liste os requisitos da vaga..."
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted resize-none ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Localização
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Salary range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Faixa salarial
          </label>
          <input
            type="text"
            name="salaryRange"
            value={form.salaryRange}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Ex: R$3000 - R$5000"
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Status da vaga
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={!editing}
            className={`w-full border border-border rounded-md p-2 bg-background-secondary text-muted ${
              !editing && "opacity-70 cursor-not-allowed"
            }`}
          >
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="PAUSED">Pausada</option>
            <option value="FINISHED">Finalizada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8">
          <div className="flex gap-3">
            {!editing ? (
              <Button
                onClick={() => setEditing(true)}
                className="bg-primary text-white"
              >
                Editar
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    setEditing(false);
                    setForm({
                      title: job.title,
                      type: job.type,
                      description: job.description,
                      requirements: job.requirements,
                      location: job.location,
                      salaryRange: job.salaryRange,
                      status: job.status,
                    });
                  }}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>

          <Button
            onClick={handleDeleteJob}
            disabled={deleting}
            variant="danger"
          >
            {deleting ? "Excluindo..." : "Excluir vaga"}
          </Button>
        </div>
      </div>
    </div>
  );
}
