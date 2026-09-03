"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Upload, Loader2 } from "lucide-react";

interface AdminPost {
  id: string; title: string; body: string; full: string; image: string; tag: string; read: string; date: string;
}

const emptyForm = { title: "", body: "", full: "", image: "", tag: "", read: "5 min", date: "" };

export default function BlogAdmin() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(data.posts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(null); setShowForm(true); };
  const openEdit = (p: AdminPost) => {
    setEditing(p);
    setForm({ title: p.title, body: p.body, full: p.full, image: p.image, tag: p.tag, read: p.read, date: p.date });
    setError(null);
    setShowForm(true);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", files[0]);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");
      setForm(f => ({ ...f, image: data.url }));
    } catch (err: any) {
      setError(err.message ?? "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) { setError("Agrega una imagen de portada."); return; }
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo guardar.");
      setShowForm(false);
      load();
    } catch (err: any) {
      setError(err.message ?? "Error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: AdminPost) => {
    if (!confirm(`¿Eliminar "${p.title}"? Esta acción no se puede deshacer.`)) return;
    await fetch(`/api/admin/blog/${p.id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-carbon">Blog</h2>
          <p className="text-titanium text-sm mt-1">Agrega, edita o elimina publicaciones. Los cambios se reflejan al instante para todos los visitantes.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-1.5 bg-green-cta text-white font-display font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-green-arch transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Nuevo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-titanium text-sm">Cargando publicaciones…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(p => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-carbon/8">
              <div className="relative h-40">
                <Image src={p.image} alt={p.title} fill className="object-cover" unoptimized />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-display uppercase px-2 py-0.5 rounded-full">{p.tag}</span>
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-sm text-carbon leading-snug mb-1 line-clamp-2">{p.title}</h4>
                <p className="text-titanium text-xs mb-3">{p.date} · {p.read}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-lg bg-carbon/5 text-carbon hover:bg-carbon/10 transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button onClick={() => handleDelete(p)} className="flex items-center justify-center gap-1 text-xs font-semibold py-2 px-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-carbon/10 sticky top-0 bg-white">
              <h3 className="font-display font-bold text-lg text-carbon">{editing ? "Editar Publicación" : "Nueva Publicación"}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-carbon/5"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Título</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
              </div>
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Resumen (aparece en la tarjeta)</label>
                <textarea required value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={2}
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta resize-none" />
              </div>
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Contenido completo</label>
                <textarea value={form.full} onChange={e => setForm(f => ({ ...f, full: e.target.value }))} rows={6}
                  placeholder="Puedes usar **negritas** y *cursivas*."
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Categoría</label>
                  <input placeholder="Materiales" value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Lectura</label>
                  <input placeholder="6 min" value={form.read} onChange={e => setForm(f => ({ ...f, read: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Fecha</label>
                  <input placeholder="Mayo 2026" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
              </div>

              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Imagen de portada</label>
                {form.image ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-2 group">
                    <Image src={form.image} alt="" fill className="object-cover" unoptimized />
                    <button type="button" onClick={() => setForm(f => ({ ...f, image: "" }))}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="aspect-video rounded-lg border-2 border-dashed border-carbon/20 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-green-cta transition-colors text-titanium mb-2">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                    <span className="text-xs">Subir imagen</span>
                    <input type="file" accept="image/*" hidden disabled={uploading} onChange={e => handleUpload(e.target.files)} />
                  </label>
                )}
              </div>

              {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <button type="submit" disabled={saving || uploading}
                className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Guardar Cambios" : "Publicar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
