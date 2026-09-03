import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { requireAdmin } from "@/lib/auth";
import { getPublicProjects, createProject } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const projects = await getPublicProjects();
  return NextResponse.json({ projects });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.title || !data.images?.length) {
      return NextResponse.json({ error: "Título e imágenes son requeridos." }, { status: 400 });
    }
    const id = `p-${nanoid(10)}`;
    await createProject({
      id,
      title: data.title,
      description: data.description ?? "",
      images: data.images,
      location: data.location ?? "",
      area: data.area ?? "",
      year: data.year ?? "",
      category: data.category ?? "residencial",
      badge: data.badge ?? "",
    });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { error: "No se pudo crear el proyecto. Verifica que la base de datos esté configurada." },
      { status: 500 }
    );
  }
}
