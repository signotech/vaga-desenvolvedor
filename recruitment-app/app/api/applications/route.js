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

    if (!candidateId || !jobId) {
      return NextResponse.json(
        { message: "Campos candidateId e jobId são obrigatórios" },
        { status: 400 }
      );
    }

    const application = await applicationService.createApplication(
      candidateId,
      jobId
    );
    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Erro ao criar inscrição" },
      { status: error.statusCode || 400 }
    );
  }
}
