"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function JobCard({ job, onApply, onCancel }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border border-border rounded-lg p-4 bg-background-secondary shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-primary mb-2">{job.title}</h2>
        <p className="text-sm text-muted mb-1">Tipo: {job.type}</p>
        <p className="text-sm text-muted mb-1">Localização: {job.location || "Não informado"}</p>
        <p className="text-sm text-muted mb-4">Faixa salarial: {job.salaryRange || "Não informada"}</p>

        <button
          onClick={() => setShowDetails(true)}
          className="text-sm text-primary/80 hover:underline mb-3"
        >
          Ver detalhes
        </button>
      </div>

      <div className="flex justify-end gap-2 mt-auto">
        {!job.applied ? (
          <Button onClick={onApply} className="bg-primary text-foreground hover:bg-primary/90">
            Candidatar-se
          </Button>
        ) : (
          <Button onClick={onCancel} className="bg-red-600 text-foreground hover:bg-red-700">
            Cancelar candidatura
          </Button>
        )}
      </div>

      {showDetails && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-2 right-2 text-muted hover:text-foreground"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">{job.title}</h3>
            <p className="text-sm text-muted mb-2">{job.description}</p>
            <p className="text-sm mb-2"><strong>Requisitos:</strong> {job.requirements || "Não informados"}</p>
            <p className="text-sm mb-2"><strong>Status:</strong> {job.status}</p>
            <p className="text-sm"><strong>Criada em:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
