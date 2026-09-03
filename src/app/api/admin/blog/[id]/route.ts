import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updatePost, deletePost } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.title || !data.image) {
      return NextResponse.json({ error: "Título e imagen son requeridos." }, { status: 400 });
    }
    await updatePost(params.id, {
      title: data.title,
      body: data.body ?? "",
      full: data.full ?? data.body ?? "",
      image: data.image,
      tag: data.tag ?? "",
      read: data.read ?? "5 min",
      date: data.date ?? "",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Update post error:", err);
    return NextResponse.json({ error: "No se pudo actualizar la publicación." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    await deletePost(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete post error:", err);
    return NextResponse.json({ error: "No se pudo eliminar la publicación." }, { status: 500 });
  }
}
