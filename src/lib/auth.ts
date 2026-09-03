import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "tekton_admin_session";
const ALG = "HS256";

function getSecretKey() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error(
      "Falta la variable de entorno ADMIN_JWT_SECRET. Configúrala en Vercel (cualquier cadena aleatoria larga)."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export async function getSessionEmail(): Promise<string | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return (payload.email as string) ?? null;
  } catch {
    return null;
  }
}

/** Verifica un token de cookie (para middleware, que no puede usar next/headers cookies()). */
export async function verifyToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return (payload.email as string) ?? null;
  } catch {
    return null;
  }
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;

/** Devuelve el email de la sesión admin o null. Úsalo al inicio de cada route handler de /api/admin/*. */
export async function requireAdmin(): Promise<string | null> {
  return getSessionEmail();
}
