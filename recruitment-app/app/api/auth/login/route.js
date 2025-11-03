import { NextResponse } from "next/server";
import { userService } from "@/lib/services/userService";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { user, token } = await userService.login({ email, password });

    const response = NextResponse.json(
      { user, token, message: "Login realizado com sucesso" },
      { status: 200 }
    );

    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return response;
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
