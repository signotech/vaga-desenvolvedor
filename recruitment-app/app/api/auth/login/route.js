import { NextResponse } from "next/server";
import { userService } from "@/lib/services/userService";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const {user, token} = await userService.login({email, password});
    return NextResponse.json(
      { user, token, message: "Login realizado com sucesso" },
      { status: 200 }
    );
  } catch (error) {

    console.log(error);
    // Error email or password invalid
    if (
      error instanceof Error &&
      error.message === "Email inválido ou senha inválida"
    ) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    // Error unknown
    return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
  }
}
