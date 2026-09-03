import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ensureSchema, sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: { email: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const target = decodeURIComponent(params.email).toLowerCase();

  await ensureSchema();
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM admins;`;
  if (rows[0]?.count <= 1) {
    return NextResponse.json(
      { error: "No puedes eliminar al único administrador restante." },
      { status: 400 }
    );
  }

  await sql`DELETE FROM admins WHERE email = ${target};`;
  return NextResponse.json({ ok: true });
}

export async function PUT(req: NextRequest, { params }: { params: { email: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const target = decodeURIComponent(params.email).toLowerCase();
  try {
    const { password } = await req.json();
    if (!password || String(password).length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }
    await ensureSchema();
    const hash = await bcrypt.hash(password, 10);
    await sql`UPDATE admins SET password_hash = ${hash} WHERE email = ${target};`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "No se pudo actualizar la contraseña." }, { status: 500 });
  }
}
