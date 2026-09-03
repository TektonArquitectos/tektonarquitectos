import { NextRequest, NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const comments = await getComments(params.id);
    return NextResponse.json({ comments });
  } catch (err) {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { authorName, comment } = await req.json();
    if (!authorName?.trim() || !comment?.trim()) {
      return NextResponse.json({ error: "Nombre y comentario son requeridos." }, { status: 400 });
    }
    if (authorName.length > 60 || comment.length > 500) {
      return NextResponse.json({ error: "El nombre o comentario es demasiado largo." }, { status: 400 });
    }
    const created = await addComment(params.id, authorName.trim(), comment.trim());
    return NextResponse.json({ comment: created });
  } catch (err) {
    console.error("Comment error:", err);
    return NextResponse.json(
      { error: "No se pudo publicar el comentario. Verifica que la base de datos esté configurada." },
      { status: 500 }
    );
  }
}
