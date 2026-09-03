"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Upload, Loader2, Heart, MessageCircle, RotateCcw } from "lucide-react";

interface AdminProject {
  id: string; title: string; description: string; images: string[];
  location: string; area: string; year: string; category: string; badge: string;
  likes: number; comments: number;
}
interface AdminComment { id: number; author_name: string; comment: string; created_at: string; }

const CATEGORIES = [
  { id: "residencial", label: "Residencial" },
  { id: "comercial", label: "Comercial" },
  { id: "industrial", label: "Industrial" },
  { id: "obra-publica", label: "Obra Pública" },
  { id: "otros", label: "Otros" },
];

const emptyForm = { title: "", description: "", images: [] as string[], location: "", area: "", year: "", category: "residencial", badge: "" };

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [moderating, setModerating] = useState<AdminProject | null>(null);
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [modLoading, setModLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data.projects ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setError(null); setShowForm(true); };
  const openEdit = (p: AdminProject) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, images: p.images, location: p.location, area: p.area, year: p.year, category: p.category, badge: p.badge });
    setError(null);
    setShowForm(true);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Error al subir imagen");
        setForm(f => ({ ...f, images: [...f.images, data.url] }));
      }
    } catch (err: any) {
      setError(err.message ?? "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.images.length) { setError("Agrega al menos una imagen."); return; }
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects";
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

  const handleDelete = async (p: AdminProject) => {
    if (!confirm(`¿Eliminar "${p.title}"? Esta acción no se puede deshacer.`)) return;
    await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
    load();
  };

  const openModeration = async (p: AdminProject) => {
    setModerating(p);
    setModLoading(true);
    const res = await fetch(`/api/admin/projects/${p.id}/moderation`);
    const data = await res.json();
    setComments(data.comments ?? []);
    setModLoading(false);
  };

  const deleteCommentAdmin = async (id: number) => {
    await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    setComments(c => c.filter(x => x.id !== id));
    load();
  };

  const resetLikesAdmin = async () => {
    if (!moderating) return;
    if (!confirm("¿Reiniciar todos los likes de este proyecto a cero?")) return;
    await fetch(`/api/admin/projects/${moderating.id}/moderation`, { method: "DELETE" });
    setModerating(m => m ? { ...m, likes: 0 } : m);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-carbon">Proyectos que Hablan por Sí Mismos</h2>
          <p className="text-titanium text-sm mt-1">Agrega, edita o elimina proyectos. Los cambios se reflejan al instante para todos los visitantes.</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-1.5 bg-green-cta text-white font-display font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-green-arch transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Nuevo
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-titanium text-sm">Cargando proyectos…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-carbon/8">
              <div className="relative h-40">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover" unoptimized />
              </div>
              <div className="p-4">
                <h4 className="font-display font-bold text-sm text-carbon leading-snug mb-1 line-clamp-2">{p.title}</h4>
                <p className="text-titanium text-xs mb-3">{p.location} · {p.year}</p>
                <div className="flex items-center gap-3 text-xs text-titanium mb-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {p.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {p.comments}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-lg bg-carbon/5 text-carbon hover:bg-carbon/10 transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button onClick={() => openModeration(p)} className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold py-2 rounded-lg bg-carbon/5 text-carbon hover:bg-carbon/10 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" /> Moderar
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

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-carbon/10 sticky top-0 bg-white">
              <h3 className="font-display font-bold text-lg text-carbon">{editing ? "Editar Proyecto" : "Nuevo Proyecto"}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-carbon/5"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Título</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
              </div>
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Descripción</label>
                <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Ubicación</label>
                  <input required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Metros cuadrados</label>
                  <input required placeholder="p. ej. 180 m²" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Fecha</label>
                  <input required placeholder="p. ej. 2025" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
                </div>
                <div>
                  <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Categoría</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta">
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Etiqueta (badge)</label>
                <input placeholder="p. ej. Residencial" value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))}
                  className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta" />
              </div>

              <div>
                <label className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-1.5 block">Imágenes</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image src={img} alt="" fill className="object-cover" unoptimized />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-lg border-2 border-dashed border-carbon/20 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-green-cta transition-colors text-titanium">
                    {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                    <span className="text-[10px]">Subir</span>
                    <input type="file" accept="image/*" multiple hidden disabled={uploading} onChange={e => handleUpload(e.target.files)} />
                  </label>
                </div>
              </div>

              {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

              <button type="submit" disabled={saving || uploading}
                className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                {editing ? "Guardar Cambios" : "Crear Proyecto"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Moderation Modal */}
      {moderating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setModerating(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-carbon/10 sticky top-0 bg-white">
              <div>
                <h3 className="font-display font-bold text-lg text-carbon">Moderar</h3>
                <p className="text-titanium text-xs">{moderating.title}</p>
              </div>
              <button onClick={() => setModerating(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-carbon/5"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between bg-bone rounded-xl p-3 mb-4">
                <span className="flex items-center gap-2 text-sm text-carbon font-semibold"><Heart className="w-4 h-4 text-red-500" /> {moderating.likes} likes</span>
                <button onClick={resetLikesAdmin} className="flex items-center gap-1.5 text-xs font-semibold text-titanium hover:text-carbon transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
                </button>
              </div>

              <p className="text-xs font-display font-semibold uppercase tracking-wide text-titanium mb-2">Comentarios ({comments.length})</p>
              {modLoading ? (
                <p className="text-titanium text-sm py-6 text-center">Cargando…</p>
              ) : comments.length === 0 ? (
                <p className="text-titanium text-sm py-6 text-center">Aún no hay comentarios.</p>
              ) : (
                <div className="space-y-2.5">
                  {comments.map(c => (
                    <div key={c.id} className="flex items-start gap-2.5 bg-bone rounded-xl p-3">
                      <div className="flex-1">
                        <p className="font-display font-semibold text-xs text-carbon">{c.author_name}</p>
                        <p className="text-titanium text-xs mt-0.5">{c.comment}</p>
                      </div>
                      <button onClick={() => deleteCommentAdmin(c.id)} className="text-red-500 hover:text-red-700 transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
