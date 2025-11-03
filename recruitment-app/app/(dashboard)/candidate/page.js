"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import JobCard from "@/app/components/jobCard";
import { useRouter } from "next/navigation";

export default function CandidateDashboard() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("available"); // available | applied | paused | finished | all
  const [sort, setSort] = useState("recent");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch jobs
  const fetchJobs = useCallback(async (id) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("userId", id);

      const { data } = await axios.get(`/api/jobs?${params.toString()}`);
      setJobs(Array.isArray(data.jobs) ? data.jobs : []);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Fetch applications
  const fetchApplications = useCallback(async (id) => {
    try {
      const { data } = await axios.get(`/api/applications/candidate/${id}`);
      setApplications(
        Array.isArray(data.applications) ? data.applications : []
      );
    } catch (error) {
      console.error("Erro ao buscar candidaturas:", error);
      setApplications([]);
    }
  }, []);

  // Load user
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      router.push("/login-candidate");
      return;
    }
    const parsedId = Number(id);
    setUserId(parsedId);
    fetchApplications(parsedId);
    fetchJobs(parsedId);
  }, [router, fetchApplications, fetchJobs]);

  useEffect(() => {
    if (userId) {
      fetchJobs(userId);
      fetchApplications(userId);
    }
  }, [fetchApplications, fetchJobs, userId]);

  const handleApply = async (jobId) => {
    try {
      const res = await axios.post("/api/applications", {
        jobId,
        candidateId: userId,
      });
      const newApp = res.data.application || res.data;
      setApplications((prev) => [...prev, newApp]);
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
    }
  };

  const handleCancel = async (jobId) => {
    try {
      const application = applications.find(
        (a) =>
          Number(a.jobId) === Number(jobId) &&
          Number(a.candidateId) === Number(userId)
      );
      if (!application) return;
      await axios.delete(`/api/applications/${application.id}`);
      setApplications((prev) => prev.filter((a) => a.id !== application.id));
    } catch (error) {
      console.error("Erro ao cancelar candidatura:", error);
    }
  };

  // Verify if the user has already applied to the job
  const jobsWithStatus = jobs.map((job) => ({
    ...job,
    applied: applications.some((a) => Number(a.jobId) === Number(job.id)),
  }));

  // Filter
  const filteredJobs = jobsWithStatus
    .filter((job) => {
      if (job.status === "CANCELLED") return false;

      switch (filter) {
        case "available":
          return job.status === "IN_PROGRESS" && !job.applied;

        case "applied":
          return job.applied && job.status !== "CANCELLED";

        case "paused":
          return job.status === "PAUSED" && job.applied;

        case "finished":
          return job.status === "FINISHED" && job.applied;

        case "all":
          return job.status === "IN_PROGRESS";

        default:
          return true;
      }
    })
    .sort((a, b) =>
      sort === "recent"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

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
              <option value="available">Disponíveis</option>
              <option value="applied">Candidatadas</option>
              <option value="paused">Pausadas</option>
              <option value="finished">Finalizadas</option>
              <option value="all">Todas</option>
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

        {/* Jobs */}
        {loading ? (
          <p className="text-muted">Carregando vagas...</p>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => handleApply(job.id)}
                onCancel={() => handleCancel(job.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted">Nenhuma vaga encontrada.</p>
        )}
      </main>
    </div>
  );
}
