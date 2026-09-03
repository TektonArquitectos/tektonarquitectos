"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Building2, Newspaper, Users, LogOut } from "lucide-react";
import ProjectsAdmin from "./ProjectsAdmin";
import BlogAdmin from "./BlogAdmin";
import AdminsAdmin from "./AdminsAdmin";

type Tab = "proyectos" | "blog" | "admins";

export default function DashboardClient({ email }: { email: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("proyectos");

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "proyectos", label: "Proyectos", icon: <Building2 className="w-4 h-4" /> },
    { id: "blog", label: "Blog", icon: <Newspaper className="w-4 h-4" /> },
    { id: "admins", label: "Administradores", icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-bone">
      {/* Top bar */}
      <header className="bg-carbon sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Image src="/images/logo-icon.png" alt="Tekton" width={30} height={30} className="object-contain" />
            <div>
              <p className="font-display font-bold text-white text-sm leading-none">Panel Admin</p>
              <p className="text-white/40 text-[11px] mt-0.5 truncate max-w-[160px] sm:max-w-none">{email}</p>
            </div>
          </div>
          <button onClick={logout}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-display font-semibold uppercase tracking-wide px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
            <LogOut className="w-3.5 h-3.5" /> Salir
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-carbon/10 sticky top-[57px] z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-display font-semibold whitespace-nowrap border-b-2 transition-colors
                ${tab === t.id ? 'border-green-cta text-green-arch' : 'border-transparent text-titanium hover:text-carbon'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === "proyectos" && <ProjectsAdmin />}
        {tab === "blog" && <BlogAdmin />}
        {tab === "admins" && <AdminsAdmin currentEmail={email} />}
      </main>
    </div>
  );
}
