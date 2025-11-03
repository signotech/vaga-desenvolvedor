import { NextResponse } from "next/server";
import swaggerSpec from "@/lib/swagger/spec";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(swaggerSpec);
}
