import { NextResponse } from "next/server";
import { userService } from "@/lib/services/userService";

export async function PUT(req, { params }) {
    try {   
        const body = await req.json();
        const updatedUser = await userService.updateUser(params.id, body);
        return NextResponse.json(
            { user: updatedUser, message: "Usuário atualizado com sucesso" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao atualizar usuário" },
            { status: 500 }
        )
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        const userId = Number(id);
        if (isNaN(userId)) {
            return NextResponse.json(
                { message: "ID inválido" },
                { status: 400 }
            )
        }

        const deletedUser = await userService.deleteUser(userId);
        return NextResponse.json(
            { user: deletedUser, message: "Usuário desativado com sucesso" },
            { status: 200 }
        )
    } catch (error) {
        console.log(error);
        // Error user not found
        if (error instanceof Error && error.message === "Usuário não encontrado") {
            return NextResponse.json(
                { message: error.message },
                { status: 404 }
            )
        }

        // Error unknown
        return NextResponse.json(
            { message: "Erro ao desativar usuário" },
            { status: 500 }
        )
    }
}