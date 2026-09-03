import { NextRequest, NextResponse } from "next/server";
import { likeProject, unlikeProject, hasLiked } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { visitorId, action } = await req.json();
    if (!visitorId) {
      return NextResponse.json({ error: "Falta el identificador de visitante." }, { status: 400 });
    }
    const likes =
      action === "unlike"
        ? await unlikeProject(params.id, visitorId)
        : await likeProject(params.id, visitorId);
    const liked = await hasLiked(params.id, visitorId);
    return NextResponse.json({ likes, liked });
  } catch (err) {
    console.error("Like error:", err);
    return NextResponse.json(
      { error: "No se pudo registrar el like. Verifica que la base de datos esté configurada." },
      { status: 500 }
    );
  }
}
