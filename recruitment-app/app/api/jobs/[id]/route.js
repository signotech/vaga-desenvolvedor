import { NextResponse } from "next/server";
import { jobService } from "@/lib/services/jobService";

export async function PATCH(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const job = await jobService.updateJob(Number(id), body);
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

export async function GET (req, { params }) {
  const { id } = await params;
    try {
        const job = await jobService.getJobById(Number(id))
        return NextResponse.json({job, message: "Vaga encontrada com sucesso"}, { status: 200 })
    } catch (error) {
        console.log(error);
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
