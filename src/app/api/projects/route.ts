import { NextResponse } from "next/server";
import { getPublicProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getPublicProjects();
  return NextResponse.json({ projects });
}
