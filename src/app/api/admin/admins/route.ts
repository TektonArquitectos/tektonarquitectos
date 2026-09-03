import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ensureSchema, sql } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  await ensureSchema();
  const { rows } = await sql`SELECT email, created_at FROM admins ORDER BY created_at ASC;`;
  return NextResponse.json({ admins: rows });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  try {
    const { email, password } = await req.json();
    if (!email || !password || String(password).length < 6) {
      return NextResponse.json(
        { error: "Correo válido y contraseña de al menos 6 caracteres son requeridos." },
        { status: 400 }
      );
    }
    await ensureSchema();
    const hash = await bcrypt.hash(password, 10);
    await sql`
      INSERT INTO admins (email, password_hash)
      VALUES (${String(email).toLowerCase().trim()}, ${hash})
      ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Add admin error:", err);
    return NextResponse.json({ error: "No se pudo agregar el administrador." }, { status: 500 });
  }
}
