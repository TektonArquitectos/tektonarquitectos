import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { PROJECTS, BLOG_SEED } from "@/lib/data";

// ─────────────────────────────────────────────────────────────
// Capa de acceso a datos (Vercel Postgres).
// Todas las escrituras del admin quedan aquí — nada se guarda en
// localStorage, así que los cambios se ven para todos los
// visitantes de inmediato, desde cualquier dispositivo.
// ─────────────────────────────────────────────────────────────

let schemaReady: Promise<void> | null = null;

/** Convierte un array de JS a un literal de array de Postgres, ej. ["a","b"] → '{"a","b"}'. */
export function toPgArray(arr: string[]): string {
  return `{${arr.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(",")}}`;
}

/** Credenciales por defecto solicitadas para el primer acceso. */
const SEED_ADMIN_EMAIL = "habzerl753@gmail.com";
const SEED_ADMIN_PASSWORD = "77513278";

/**
 * Crea las tablas si no existen y siembra el primer admin.
 * Se ejecuta una sola vez por instancia de servidor (idempotente).
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS admins (
          email TEXT PRIMARY KEY,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          images TEXT[] NOT NULL DEFAULT '{}',
          location TEXT NOT NULL DEFAULT '',
          area TEXT NOT NULL DEFAULT '',
          project_date TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL DEFAULT 'residencial',
          badge TEXT NOT NULL DEFAULT '',
          featured BOOLEAN NOT NULL DEFAULT false,
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS project_likes (
          id SERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
          visitor_id TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          UNIQUE (project_id, visitor_id)
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS project_comments (
          id SERIAL PRIMARY KEY,
          project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
          author_name TEXT NOT NULL,
          comment TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          body TEXT NOT NULL DEFAULT '',
          full_content TEXT NOT NULL DEFAULT '',
          image TEXT NOT NULL DEFAULT '',
          tag TEXT NOT NULL DEFAULT '',
          read_time TEXT NOT NULL DEFAULT '5 min',
          post_date TEXT NOT NULL DEFAULT '',
          sort_order INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `;

      // Siembra el primer administrador si la tabla está vacía.
      const { rows } = await sql`SELECT COUNT(*)::int AS count FROM admins;`;
      if (rows[0]?.count === 0) {
        const hash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 10);
        await sql`
          INSERT INTO admins (email, password_hash)
          VALUES (${SEED_ADMIN_EMAIL.toLowerCase()}, ${hash})
          ON CONFLICT (email) DO NOTHING;
        `;
      }

      // Siembra los proyectos y publicaciones de blog actuales del sitio
      // la primera vez, para que la transición a base de datos no borre
      // el contenido existente.
      const { rows: projRows } = await sql`SELECT COUNT(*)::int AS count FROM projects;`;
      if (projRows[0]?.count === 0) {
        for (let i = 0; i < PROJECTS.length; i++) {
          const p = PROJECTS[i];
          await sql`
            INSERT INTO projects (id, title, description, images, location, area, project_date, category, badge, sort_order)
            VALUES (${p.id}, ${p.title}, ${p.description}, ${toPgArray(p.images)}::text[], ${p.location}, ${p.area}, ${p.year}, ${p.category}, ${p.badge}, ${i})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }

      const { rows: blogRows } = await sql`SELECT COUNT(*)::int AS count FROM blog_posts;`;
      if (blogRows[0]?.count === 0) {
        for (let i = 0; i < BLOG_SEED.length; i++) {
          const b = BLOG_SEED[i];
          await sql`
            INSERT INTO blog_posts (id, title, body, full_content, image, tag, read_time, post_date, sort_order)
            VALUES (${b.id}, ${b.title}, ${b.body}, ${b.full}, ${b.image}, ${b.tag}, ${b.read}, ${b.date}, ${i})
            ON CONFLICT (id) DO NOTHING;
          `;
        }
      }
    })();
  }
  return schemaReady;
}

export { sql };
