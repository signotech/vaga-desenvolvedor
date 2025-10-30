import { NextResponse } from "next/server";
import { jobService } from "@/lib/services/jobService";

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const job = await jobService.updateJob(params.id, body);
    return NextResponse.json(
      { job, message: "Vaga atualizada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    // Error not found
    if (error instanceof Error && error.message === "Vaga não encontrada") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    // Error unknown
    return NextResponse.json(
      { message: "Erro ao atualizar vaga" },
      { status: 500 }
    );
  }
}

export async function GET ({ params }) {
    try {
        const job = await jobService.getJobById(params.id)
        return NextResponse.json(job, { status: 200 })
    } catch (error) {
        // Error not found
        if (error instanceof Error && error.message === "Vaga não encontrada") {
            return NextResponse.json({ message: error.message }, { status: 404 });
        }

        // Error unknown
        return NextResponse.json(
            { message: "Erro ao buscar vaga" },
            { status: 500 }
        );
    }
}
