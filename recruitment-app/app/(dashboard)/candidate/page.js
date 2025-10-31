"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "@/app/components/jobCard";

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("available");
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const { data } = await axios.get(`/api/jobs?${params.toString()}`);
      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/api/applications");
      setApplications(data || []);
    } catch (error) {
      console.error("Erro ao buscar candidaturas:", error);
    }
  };

  // Get user id
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    }
  }, []);


  // Handle apply
  const handleApply = async (jobId) => {
    if (!userId) {
      console.error("Usuário não autenticado");
      return;
    }
    try {
      await axios.post("/api/applications", { jobId, candidateId:userId });
      await fetchApplications();
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
    }
  };

  // Update when search or filters change
  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [search]);

  // Mark jobs as applied
  const jobsWithStatus = jobs.map((job) => ({
    ...job,
    applied: applications.some((a) => a.jobId === job.id),
  }));

  // Filter jobs
  const filteredJobs = jobsWithStatus
    .filter((job) => {
      if (filter === "applied") return job.applied;
      if (filter === "available") return !job.applied;
      return true;
    })
    .sort((a, b) => {
      if (sort === "recent") return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="min-h-screen bg-background text-foreground">

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-primary mb-6">
          Vagas Disponíveis
        </h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar por vaga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 p-2 rounded-md border border-border bg-background-secondary text-muted"
          />

          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-md border border-border bg-background-secondary text-muted"
            >
              <option value="all">Todas</option>
              <option value="available">Disponíveis</option>
              <option value="applied">Candidatadas</option>
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
              <JobCard key={job.id} job={job} onApply={() => handleApply(job.id)} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Nenhuma vaga encontrada.</p>
        )}
      </main>
    </div>
  );
}
