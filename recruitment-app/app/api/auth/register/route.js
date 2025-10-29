import { userService } from "@/lib/services/userService";
import { registerSchema } from "@/lib/validation/authSchemas";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req) {
  try {
    // Receive and validate data
    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    // Register user with validated data
    const user = await userService.registerUser(validatedData);

    return NextResponse.json({user, message: "Usuário cadastrado com sucesso"}, { status: 201 });
  } catch (error) {
    // Validation error
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Erro de validação dos dados", error: error.errors },
        { status: 400 }
      );
    }

    // Error email already exists
    if (error instanceof Error && error.message === "Email já cadastrado") {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    // Error unknown
    return NextResponse.json({ message: "Erro inesperado" }, { status: 500 });
  }
}
