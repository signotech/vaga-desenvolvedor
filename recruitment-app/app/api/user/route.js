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