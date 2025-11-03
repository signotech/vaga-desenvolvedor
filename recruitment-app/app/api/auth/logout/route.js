import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout realizado com sucesso" },
    { status: 200 }
  );

  response.cookies.set({
    name: "authToken",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return response;
}
