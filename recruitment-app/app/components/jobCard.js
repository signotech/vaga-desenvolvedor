"use client";

export default function JobCard({ job, onApply }) {
  return (
    <div className="border border-border rounded-lg p-5 bg-background-secondary shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-primary">{job.title}</h3>
      <p className="text-sm text-foreground mt-2 line-clamp-2">
        {job.description || "Sem descrição"}
      </p>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-muted">
          {job.location || "Remoto"}
        </span>
        <button
          onClick={() => onApply(job.id)}
          disabled={job.applied}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            job.applied
              ? "bg-secondary text-muted cursor-not-allowed"
              : "bg-primary hover:bg-primary/80 text-foreground"
          }`}
        >
          {job.applied ? "Candidatado" : "Candidatar-se"}
        </button>
      </div>
    </div>
  );
}
