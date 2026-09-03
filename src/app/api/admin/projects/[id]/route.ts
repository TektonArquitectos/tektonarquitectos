import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateProject, deleteProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.title || !data.images?.length) {
      return NextResponse.json({ error: "Título e imágenes son requeridos." }, { status: 400 });
    }
    await updateProject(params.id, {
      title: data.title,
      description: data.description ?? "",
      images: data.images,
      location: data.location ?? "",
      area: data.area ?? "",
      year: data.year ?? "",
      category: data.category ?? "residencial",
      badge: data.badge ?? "",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Update project error:", err);
    return NextResponse.json({ error: "No se pudo actualizar el proyecto." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    await deleteProject(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete project error:", err);
    return NextResponse.json({ error: "No se pudo eliminar el proyecto." }, { status: 500 });
  }
}
