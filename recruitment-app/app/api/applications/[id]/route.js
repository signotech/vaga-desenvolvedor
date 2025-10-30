import { applicationService } from "@/lib/services/applicationService";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const application = await applicationService.getApplicationById(params.id);
    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
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
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
