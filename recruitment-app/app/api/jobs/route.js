import { jobService } from "@/lib/services/jobService";
import { NextResponse } from "next/server";
import { jobSchema } from "@/lib/validation/jobSchemas";
import { ZodError } from "zod";

export async function GET(req) {
  try {
    const {
      search,
      page = 1,
      limit = 20,
      userId,
    } = Object.fromEntries(new URL(req.url).searchParams);

    const jobs = await jobService.listJobs({ search, page, limit, userId });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar vagas" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = jobSchema.parse(body);
    const userId = Number(body.userId);
    const job = await jobService.createJob(validatedData, userId);
    return NextResponse.json(
      { job, message: "Vaga criada com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    // Validation error
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Erro de validação dos dados", error: error.errors },
        { status: 400 }
      );
    }

    // Error unknown
    return NextResponse.json(
      { message: "Erro ao criar vaga" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { ids } = await req.json();
    await jobService.deleteJobs(ids.map(Number));
    return NextResponse.json(
      { message: "Vaga(s) desativada(s) com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    // Error in body
    if (
      error instanceof Error &&
      error.message === "Nenhuma vaga selecionada"
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Error unknown
    return NextResponse.json(
      { message: "Erro ao desativar vaga(s)" },
      { status: 500 }
    );
  }
}
