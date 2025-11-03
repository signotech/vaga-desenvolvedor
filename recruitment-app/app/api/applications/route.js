import { applicationService } from "@/lib/services/applicationService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const applications = await applicationService.listApplications();
    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar inscrições" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { candidateId, jobId } = await req.json();
    const application = await applicationService.createApplication(
      candidateId,
      jobId
    );
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.log(error);
    if (
      error instanceof Error &&
      error.message === "Campos candidato e vaga são obrigatórios"
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Erro ao criar inscrição" },
      { status: 500 }
    );
  }
}
