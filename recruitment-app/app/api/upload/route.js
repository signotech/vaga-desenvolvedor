import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabase";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "Nenhum arquivo enviado" }, { status: 400 });
    }

    
    const fileName = `${Date.now()}_${file.name}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Send to bucket "resumes"
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Erro ao enviar arquivo:", error);
      return NextResponse.json({ message: "Falha ao enviar arquivo" }, { status: 500 });
    }

    // Generate public URL
    const { data: publicUrlData } = supabase.storage
      .from("resumes")
      .getPublicUrl(fileName);

    return NextResponse.json({
      message: "Upload realizado com sucesso!",
      url: publicUrlData.publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Erro geral:", error);
    return NextResponse.json({ message: "Erro no servidor" }, { status: 500 });
  }
}
