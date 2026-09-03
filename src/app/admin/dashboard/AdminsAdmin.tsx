"use client";
import { useEffect, useState, useCallback } from "react";
import { UserPlus, Trash2, KeyRound, Loader2, X } from "lucide-react";

interface AdminUser { email: string; created_at: string; }

export default function AdminsAdmin({ currentEmail }: { currentEmail: string }) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pwTarget, setPwTarget] = useState<string | null>(null);
  const [newPw, setNewPw] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/admins");
    const data = await res.json();
    setAdmins(data.admins ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo agregar.");
      setEmail(""); setPassword("");
      load();
    } catch (err: any) {
      setError(err.message ?? "Error al agregar.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (target: string) => {
    if (!confirm(`¿Quitar acceso de administrador a ${target}?`)) return;
    const res = await fetch(`/api/admin/admins/${encodeURIComponent(target)}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) { alert(data.error ?? "No se pudo eliminar."); return; }
    load();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwTarget) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/admins/${encodeURIComponent(pwTarget)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPw }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo cambiar la contraseña.");
      setPwTarget(null); setNewPw("");
    } catch (err: any) {
      setError(err.message ?? "Error al cambiar contraseña.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="font-display font-bold text-xl text-carbon mb-1">Administradores</h2>
      <p className="text-titanium text-sm mb-6">Agrega o quita accesos, y cambia contraseñas. Cualquier correo agregado aquí podrá entrar al mismo panel.</p>

      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-carbon/8 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Correo electrónico</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nuevo@correo.com"
            className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
        </div>
        <div className="flex-1 w-full">
          <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Contraseña</label>
          <input required type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres"
            className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
        </div>
        <button type="submit" disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-green-cta text-white font-display font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-50 shrink-0">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Agregar
        </button>
      </form>

      {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{error}</p>}

      {loading ? (
        <p className="text-titanium text-sm text-center py-10">Cargando…</p>
      ) : (
        <div className="bg-white rounded-xl border border-carbon/8 divide-y divide-carbon/8">
          {admins.map(a => (
            <div key={a.email} className="flex items-center justify-between p-4 gap-3">
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm text-carbon truncate">{a.email}</p>
                {a.email === currentEmail.toLowerCase() && <span className="text-[11px] text-green-cta">Sesión actual</span>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => { setPwTarget(a.email); setNewPw(""); setError(null); }}
                  className="flex items-center gap-1 text-xs font-semibold text-titanium hover:text-carbon transition-colors px-2.5 py-1.5 rounded-lg hover:bg-carbon/5">
                  <KeyRound className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Contraseña</span>
                </button>
                <button onClick={() => handleRemove(a.email)}
                  className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pwTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setPwTarget(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-carbon">Cambiar contraseña</h3>
              <button onClick={() => setPwTarget(null)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-carbon/5"><X className="w-4 h-4" /></button>
            </div>
            <p className="text-titanium text-xs mb-3">{pwTarget}</p>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <input required type="password" minLength={6} value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Nueva contraseña"
                className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
              <button type="submit" disabled={saving}
                className="w-full bg-green-cta text-white font-display font-bold text-sm py-2.5 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-50">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
