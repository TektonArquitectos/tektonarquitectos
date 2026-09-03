import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { requireAdmin } from "@/lib/auth";
import { getPublicPosts, createPost } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  const posts = await getPublicPosts();
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const data = await req.json();
    if (!data.title || !data.image) {
      return NextResponse.json({ error: "Título e imagen son requeridos." }, { status: 400 });
    }
    const id = `post-${nanoid(10)}`;
    await createPost({
      id,
      title: data.title,
      body: data.body ?? "",
      full: data.full ?? data.body ?? "",
      image: data.image,
      tag: data.tag ?? "",
      read: data.read ?? "5 min",
      date: data.date ?? "",
    });
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("Create post error:", err);
    return NextResponse.json(
      { error: "No se pudo crear la publicación. Verifica que la base de datos esté configurada." },
      { status: 500 }
    );
  }
}
