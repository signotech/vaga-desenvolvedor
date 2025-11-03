import { NextResponse } from "next/server";
import swaggerSpec from "@/lib/swagger/swaggerDoc.mjs";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(swaggerSpec);
}
