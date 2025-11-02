"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusCircle, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

export default function CompanyDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(Number(id));
  }, []);

  const fetchJobs = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const { data } = await axios.get(`/api/jobs?${params.toString()}`);
      const companyJobs = data.jobs.filter(
        (job) => Number(job.userId) === userId
      );
      setJobs(companyJobs);
    } catch (error) {
      console.error("Erro ao buscar vagas da empresa:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchJobs();
  }, [userId, search]);

  // translate enum to portuguese
  const translateStatus = (status) => {
    const map = {
      IN_PROGRESS: "Em andamento",
      PAUSED: "Pausada",
      FINISHED: "Finalizada",
      CANCELLED: "Cancelada",
    };
    return map[status] || status;
  };

  // change job status
  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.patch(`/api/jobs/${jobId}/status`, { status: newStatus });
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      if (statusFilter === "all") return true;
      return job.status === statusFilter;
    })
    .sort((a, b) => {
      if (sort === "recent")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const handleCreateJob = () => router.push("/company/jobs/create");
  const handleEditJob = (id) => router.push(`/company/jobs/${id}/edit`);
  const handleViewCandidates = (id) => router.push(`/company/jobs/${id}`);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-primary mb-4 sm:mb-0">
            Minhas Vagas
          </h1>

          <button
            onClick={handleCreateJob}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <PlusCircle size={18} />
            Criar vaga
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 p-2 rounded-md border border-border bg-background-secondary text-muted"
          />

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 rounded-md border border-border bg-background-secondary text-muted"
            >
              <option value="all">Todas</option>
              <option value="IN_PROGRESS">Em andamento</option>
              <option value="PAUSED">Pausadas</option>
              <option value="FINISHED">Finalizadas</option>
              <option value="CANCELLED">Canceladas</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 rounded-md border border-border bg-background-secondary text-muted"
            >
              <option value="recent">Mais recentes</option>
              <option value="old">Mais antigas</option>
            </select>
          </div>
        </div>

        {/* Jobs list */}
        {loading ? (
          <p className="text-muted">Carregando vagas...</p>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="relative p-4 border border-border rounded-lg bg-background-secondary hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-1">{job.title}</h2>
                    <p className="text-sm text-muted mb-2">{job.type}</p>
                    <p className="text-sm text-muted mb-2">
                      Status:{" "}
                      <span
                        className={`font-medium ${
                          job.status === "IN_PROGRESS"
                            ? "text-green-500"
                            : job.status === "PAUSED"
                            ? "text-yellow-500"
                            : job.status === "FINISHED"
                            ? "text-blue-500"
                            : "text-red-500"
                        }`}
                      >
                        {translateStatus(job.status)}
                      </span>
                    </p>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  {/* Dropdown of actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-muted focus:outline-none">
                        <MoreVertical size={18} />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-44 bg-background border border-border rounded-md shadow-md"
                    >
                      <DropdownMenuItem
                        onClick={() => handleEditJob(job.id)}
                        className="cursor-pointer"
                      >
                        ✏️ Editar vaga
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => handleViewCandidates(job.id)}
                        className="cursor-pointer"
                      >
                        👥 Ver candidatos
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuLabel className="text-xs text-muted uppercase">
                        Mudar status
                      </DropdownMenuLabel>

                      {["IN_PROGRESS", "PAUSED", "FINISHED", "CANCELLED"].map(
                        (s) => (
                          <DropdownMenuItem
                            key={s}
                            onClick={() => handleStatusChange(job.id, s)}
                            className="cursor-pointer"
                          >
                            {translateStatus(s)}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">Nenhuma vaga encontrada.</p>
        )}
      </main>
    </div>
  );
}
