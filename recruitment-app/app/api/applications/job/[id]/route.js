import { applicationService } from "@/lib/services/applicationService";
import { NextResponse } from "next/server";

export async function GET (req, { params }) {
    const { id } = await params;
    try {
        console.log("ID DO JOB", id);
        const applications = await applicationService.findApplicationsByJobId(id);
        return NextResponse.json(
            {applications, message: "Inscrições encontradas com sucesso"},
            {status: 200}
        )
    } catch (error) {
        console.log(error);
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