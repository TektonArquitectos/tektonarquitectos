import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteComment } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    await deleteComment(Number(params.id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete comment error:", err);
    return NextResponse.json({ error: "No se pudo eliminar el comentario." }, { status: 500 });
  }
}
