import { ensureSchema, sql, toPgArray } from "@/lib/db";
import { PROJECTS as STATIC_PROJECTS, Project } from "@/lib/data";

export interface DbProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  area: string;
  year: string;
  category: string;
  badge: string;
  likes: number;
  comments: number;
}

function rowToProject(row: any): DbProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    images: row.images ?? [],
    location: row.location,
    area: row.area,
    year: row.project_date,
    category: row.category,
    badge: row.badge,
    likes: Number(row.likes ?? 0),
    comments: Number(row.comments ?? 0),
  };
}

function staticFallback(): DbProject[] {
  return STATIC_PROJECTS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    images: p.images,
    location: p.location,
    area: p.area,
    year: p.year,
    category: p.category,
    badge: p.badge,
    likes: 0,
    comments: 0,
  }));
}

/** Lista pública de proyectos, ordenada. Si la DB no está configurada, usa el contenido estático original. */
export async function getPublicProjects(): Promise<DbProject[]> {
  try {
    await ensureSchema();
    const { rows } = await sql`
      SELECT p.*,
        (SELECT COUNT(*) FROM project_likes l WHERE l.project_id = p.id) AS likes,
        (SELECT COUNT(*) FROM project_comments c WHERE c.project_id = p.id) AS comments
      FROM projects p
      ORDER BY sort_order ASC, created_at ASC;
    `;
    return rows.map(rowToProject);
  } catch (err) {
    console.warn("DB no disponible, usando datos estáticos de proyectos:", (err as Error).message);
    return staticFallback();
  }
}

export async function getProjectById(id: string): Promise<DbProject | null> {
  try {
    await ensureSchema();
    const { rows } = await sql`
      SELECT p.*,
        (SELECT COUNT(*) FROM project_likes l WHERE l.project_id = p.id) AS likes,
        (SELECT COUNT(*) FROM project_comments c WHERE c.project_id = p.id) AS comments
      FROM projects p WHERE p.id = ${id};
    `;
    if (!rows[0]) return null;
    return rowToProject(rows[0]);
  } catch (err) {
    const fallback = staticFallback().find((p) => p.id === id);
    return fallback ?? null;
  }
}

export async function createProject(data: {
  id: string; title: string; description: string; images: string[];
  location: string; area: string; year: string; category: string; badge: string;
}) {
  await ensureSchema();
  const { rows } = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM projects;`;
  const nextOrder = rows[0]?.next ?? 0;
  await sql`
    INSERT INTO projects (id, title, description, images, location, area, project_date, category, badge, sort_order, updated_at)
    VALUES (${data.id}, ${data.title}, ${data.description}, ${toPgArray(data.images)}::text[], ${data.location}, ${data.area}, ${data.year}, ${data.category}, ${data.badge}, ${nextOrder}, now());
  `;
}

export async function updateProject(id: string, data: {
  title: string; description: string; images: string[];
  location: string; area: string; year: string; category: string; badge: string;
}) {
  await ensureSchema();
  await sql`
    UPDATE projects SET
      title = ${data.title}, description = ${data.description}, images = ${toPgArray(data.images)}::text[],
      location = ${data.location}, area = ${data.area}, project_date = ${data.year},
      category = ${data.category}, badge = ${data.badge}, updated_at = now()
    WHERE id = ${id};
  `;
}

export async function deleteProject(id: string) {
  await ensureSchema();
  await sql`DELETE FROM projects WHERE id = ${id};`;
}

// ── Likes ──────────────────────────────────────────────────────
export async function likeProject(projectId: string, visitorId: string): Promise<number> {
  await ensureSchema();
  await sql`
    INSERT INTO project_likes (project_id, visitor_id)
    VALUES (${projectId}, ${visitorId})
    ON CONFLICT (project_id, visitor_id) DO NOTHING;
  `;
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM project_likes WHERE project_id = ${projectId};`;
  return rows[0]?.count ?? 0;
}

export async function unlikeProject(projectId: string, visitorId: string): Promise<number> {
  await ensureSchema();
  await sql`DELETE FROM project_likes WHERE project_id = ${projectId} AND visitor_id = ${visitorId};`;
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM project_likes WHERE project_id = ${projectId};`;
  return rows[0]?.count ?? 0;
}

export async function hasLiked(projectId: string, visitorId: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT 1 FROM project_likes WHERE project_id = ${projectId} AND visitor_id = ${visitorId};
  `;
  return rows.length > 0;
}

export async function resetLikes(projectId: string) {
  await ensureSchema();
  await sql`DELETE FROM project_likes WHERE project_id = ${projectId};`;
}

// ── Comments ───────────────────────────────────────────────────
export interface DbComment {
  id: number;
  project_id: string;
  author_name: string;
  comment: string;
  created_at: string;
}

export async function getComments(projectId: string): Promise<DbComment[]> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT * FROM project_comments WHERE project_id = ${projectId} ORDER BY created_at ASC;
  `;
  return rows as DbComment[];
}

export async function addComment(projectId: string, authorName: string, comment: string): Promise<DbComment> {
  await ensureSchema();
  const { rows } = await sql`
    INSERT INTO project_comments (project_id, author_name, comment)
    VALUES (${projectId}, ${authorName}, ${comment})
    RETURNING *;
  `;
  return rows[0] as DbComment;
}

export async function deleteComment(commentId: number) {
  await ensureSchema();
  await sql`DELETE FROM project_comments WHERE id = ${commentId};`;
}
