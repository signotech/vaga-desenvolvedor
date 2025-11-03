import { NextResponse } from "next/server";
import { applicationService } from "@/lib/services/applicationService";

export async function GET(req, { params }) {
    const { id } = await params;
  try {
    const candidateId = Number(id);
    if (isNaN(candidateId)) {
      return NextResponse.json(
        { message: "ID inválido" },
        { status: 400 }
      );
    }

    const applications = await applicationService.findApplicationsByCandidateId(candidateId);
    if (!applications || applications.length === 0) {
      return NextResponse.json(
        { applications: [], message: "Nenhuma candidatura encontrada" },
        { status: 200 }
      );
    }

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    // error not found
    if (error instanceof Error && error.message === "Inscrições não encontradas") {
      return NextResponse.json(
        { message: "Inscrições não encontradas" },
        { status: 404 }
      );
    }

    // error invalid id
    if (error instanceof Error && error.message === "ID inválido") {
      return NextResponse.json(
        { message: "ID inválido" },
        { status: 400 }
      );
    }

    // error unknown
    console.error("Erro ao buscar candidaturas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar candidaturas" },
      { status: 500 }
    );
  }
}
