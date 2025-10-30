import { applicationService } from "@/lib/services/applicationService";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const application = await applicationService.findApplicationById(params.id);
    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    // Error not found
    if (
      error instanceof Error &&
      error.message === "Inscrição não encontrada"
    ) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    // Error unknown
    return NextResponse.json(
      { message: "Erro ao buscar inscrição" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await applicationService.deleteApplication(params.id);
    return NextResponse.json(
      { message: "Inscrição removida com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    // Error not found
    if (
      error instanceof Error &&
      error.message === "Inscrição não encontrada"
    ) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
    // Error unknown
    return NextResponse.json(
      { message: "Erro ao remover inscrição" },
      { status: 500 }
    );
  }
}
