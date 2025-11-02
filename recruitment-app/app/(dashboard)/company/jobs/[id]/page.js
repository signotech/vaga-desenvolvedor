"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function JobCandidatesPage() {
  const { id } = useParams(); // jobId
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch job details and candidates
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Buscar vaga
        const jobRes = await axios.get(`/api/jobs/${id}`);
        setJob(jobRes.data.job);

        // Buscar candidaturas dessa vaga
        const appRes = await axios.get(`/api/applications/job/${id}`);
        setCandidates(appRes.data.applications || []);
      } catch (error) {
        console.error("Erro ao carregar dados da vaga:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted">
        Carregando informações...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted">
        Vaga não encontrada.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8 max-w-5xl mx-auto">
      <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted hover:text-primary transition mb-4"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
      {/* Job Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">{job.title}</h1>
        <p className="text-muted mb-1">
          Local: <span className="font-medium">{job.location}</span>
        </p>
        <p className="text-muted mb-1">
          Tipo: <span className="font-medium">{job.type}</span>
        </p>
        <p className="text-muted mb-1">
          Salário: <span className="font-medium">{job.salaryRange}</span>
        </p>
        <p className="text-muted mb-1">
          Status:{" "}
          <span
            className={`font-medium ${
              job.status === "IN_PROGRESS"
                ? "text-green-500"
                : job.status === "PAUSED"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {job.status}
          </span>
        </p>
        <p className="text-muted mb-3">
          Criada em:{" "}
          {new Date(job.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-muted max-w-2xl">{job.description}</p>
      </div>

      <hr className="border-border mb-8" />

      {/* Candidates List */}
      <h2 className="text-xl font-semibold mb-4">
        Candidatos inscritos ({candidates.length})
      </h2>

      {candidates.length === 0 ? (
        <p className="text-muted">Nenhum candidato se inscreveu nesta vaga.</p>
      ) : (
        <div className="space-y-4">
          {candidates.map((application) => (
            <div
              key={application.id}
              className="p-4 rounded-lg border border-border bg-background-secondary"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {application.candidate?.name || "Candidato"}
                  </h3>
                  <p className="text-sm text-muted">
                    Email: {application.candidate?.email}
                  </p>
                  {application.candidate?.phone && (
                    <p className="text-sm text-muted">
                      Telefone: {application.candidate.phone}
                    </p>
                  )}
                  {application.candidate?.portfolio && (
                    <p className="text-sm text-muted">
                      Portfolio: {application.candidate.portfolio}
                    </p>
                  )}
                  {application.candidate?.bio && (
                    <p className="text-sm text-muted mt-2 line-clamp-3">
                      {application.candidate.bio}
                    </p>
                  )}
                </div>

                {/* Resume / Portfolio */}
                <div className="mt-3 sm:mt-0 flex flex-col gap-2 sm:text-right">
                  {application.candidate?.resumeUrl && (
                    <a
                      href={application.candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Ver currículo
                    </a>
                  )}
                  <span className="text-xs text-muted">
                    Aplicou em{" "}
                    {new Date(application.appliedAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
