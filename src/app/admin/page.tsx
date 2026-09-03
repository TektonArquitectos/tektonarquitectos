import { Metadata } from "next";
import { getSessionEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Acceso Administrador — Tekton Arquitectos",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const email = await getSessionEmail();
  if (email) redirect("/admin/dashboard");
  return <AdminLoginClient />;
}
