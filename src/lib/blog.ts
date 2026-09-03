import { ensureSchema, sql } from "@/lib/db";
import { BLOG_SEED } from "@/lib/data";

export interface DbBlogPost {
  id: string;
  title: string;
  body: string;
  full: string;
  image: string;
  tag: string;
  read: string;
  date: string;
}

function rowToPost(row: any): DbBlogPost {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    full: row.full_content,
    image: row.image,
    tag: row.tag,
    read: row.read_time,
    date: row.post_date,
  };
}

function staticFallback(): DbBlogPost[] {
  return BLOG_SEED.map((b) => ({ ...b }));
}

export async function getPublicPosts(): Promise<DbBlogPost[]> {
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM blog_posts ORDER BY sort_order ASC, created_at DESC;`;
    return rows.map(rowToPost);
  } catch (err) {
    console.warn("DB no disponible, usando datos estáticos de blog:", (err as Error).message);
    return staticFallback();
  }
}

export async function createPost(data: {
  id: string; title: string; body: string; full: string; image: string; tag: string; read: string; date: string;
}) {
  await ensureSchema();
  const { rows } = await sql`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM blog_posts;`;
  const nextOrder = rows[0]?.next ?? 0;
  await sql`
    INSERT INTO blog_posts (id, title, body, full_content, image, tag, read_time, post_date, sort_order, updated_at)
    VALUES (${data.id}, ${data.title}, ${data.body}, ${data.full}, ${data.image}, ${data.tag}, ${data.read}, ${data.date}, ${nextOrder}, now());
  `;
}

export async function updatePost(id: string, data: {
  title: string; body: string; full: string; image: string; tag: string; read: string; date: string;
}) {
  await ensureSchema();
  await sql`
    UPDATE blog_posts SET
      title = ${data.title}, body = ${data.body}, full_content = ${data.full},
      image = ${data.image}, tag = ${data.tag}, read_time = ${data.read}, post_date = ${data.date},
      updated_at = now()
    WHERE id = ${id};
  `;
}

export async function deletePost(id: string) {
  await ensureSchema();
  await sql`DELETE FROM blog_posts WHERE id = ${id};`;
}
