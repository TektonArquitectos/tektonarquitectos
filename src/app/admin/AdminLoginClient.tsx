"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Loader2, ShieldAlert } from "lucide-react";

export default function AdminLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/images/logo-icon.png" alt="Tekton Arquitectos" width={56} height={56}
            className="object-contain mx-auto mb-4" />
          <h1 className="font-display font-bold text-xl text-white mb-1">Acceso Administrador</h1>
          <p className="text-white/50 text-sm">Panel privado de Tekton Arquitectos</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-white/60 text-xs font-display uppercase tracking-wide mb-1.5 block">Correo electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-cta transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-white/60 text-xs font-display uppercase tracking-wide mb-1.5 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-cta transition-colors" />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5 text-red-300 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-50">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-white/30 text-xs mt-6">
          <a href="/" className="hover:text-white/60 transition-colors">← Volver al sitio</a>
        </p>
      </div>
    </div>
  );
}
