import { Metadata } from "next";
import { getSessionEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Panel Administrador — Tekton Arquitectos",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const email = await getSessionEmail();
  if (!email) redirect("/admin");
  return <DashboardClient email={email} />;
}
