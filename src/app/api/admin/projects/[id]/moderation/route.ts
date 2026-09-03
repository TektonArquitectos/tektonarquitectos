import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getComments, resetLikes } from "@/lib/projects";

export const dynamic = "force-dynamic";

/** Comentarios de un proyecto, para el panel de moderación del admin. */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const comments = await getComments(params.id);
  return NextResponse.json({ comments });
}

/** Borra todos los likes de un proyecto (reinicia el contador). */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  try {
    await resetLikes(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "No se pudieron reiniciar los likes." }, { status: 500 });
  }
}
