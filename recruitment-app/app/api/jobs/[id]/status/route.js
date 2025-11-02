import { jobService } from "@/lib/services/jobService";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = await params;
try {
  const { status } = await req.json();
  const job = await jobService.updateStatus(Number(id), status);

  return NextResponse.json(
    { message: `Status da vaga alterado para ${status}`, job },
    { status: 200 }
  );
} catch (error) {
  console.log(error);
    // Error not found
    if (error instanceof Error && error.message === "Vaga não encontrada") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    // Error unknown
    return NextResponse.json(
      { message: "Erro ao atualizar status da vaga" },
      { status: 500 }
    );
}
}
