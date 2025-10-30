import { jobRepository } from "@/lib/repositories/jobRepository";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { status } = await req.json();
  const job = await jobRepository.updateStatus(params.id, status);

  return NextResponse.json(
    { message: `Status da vaga alterado para ${status}`, job },
    { status: 200 }
  );
}
