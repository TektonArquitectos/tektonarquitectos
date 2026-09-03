import { NextResponse } from "next/server";
import { getPublicPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPublicPosts();
  return NextResponse.json({ posts });
}
