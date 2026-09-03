import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ensureSchema, sql } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Correo y contraseña son requeridos." }, { status: 400 });
    }

    await ensureSchema();

    const { rows } = await sql`
      SELECT email, password_hash FROM admins WHERE email = ${String(email).toLowerCase().trim()};
    `;
    const admin = rows[0];
    if (!admin) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Correo o contraseña incorrectos." }, { status: 401 });
    }

    await createSession(admin.email);
    return NextResponse.json({ ok: true, email: admin.email });
  } catch (err) {
    console.error("Admin login error:", err);
    const message =
      err instanceof Error && err.message.includes("ADMIN_JWT_SECRET")
        ? err.message
        : "No se pudo conectar con la base de datos. Verifica que Postgres esté configurado en Vercel.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
