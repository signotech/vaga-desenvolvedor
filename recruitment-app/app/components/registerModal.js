"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function RegisterModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Como deseja se cadastrar?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            onClick={() => router.push("/register-candidate")}
          >
            Sou Candidato
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/register-company")}
          >
            Sou Recrutador
          </Button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-sm text-muted hover:text-foreground transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
