"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, MessageCircle, Send, Bookmark, X, ChevronLeft, ChevronRight,
  MapPin, Ruler, Calendar, Loader2,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { getVisitorId } from "@/lib/visitor";
import { trackEvent } from "@/lib/analytics";

export interface ModalProject {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  area: string;
  year: string;
  category: string;
  badge: string;
  likes: number;
  comments: number;
}

interface Comment {
  id: number;
  author_name: string;
  comment: string;
  created_at: string;
}

function timeAgo(dateStr: string, lang: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return lang === "en" ? "just now" : "ahora mismo";
  if (mins < 60) return lang === "en" ? `${mins}m` : `${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(dateStr).toLocaleDateString(lang === "en" ? "en-US" : "es-MX", { day: "numeric", month: "short" });
}

export default function ProjectDetailModal({ project, onClose }: { project: ModalProject; onClose: () => void }) {
  const { lang } = useLanguage();
  const [imgIdx, setImgIdx] = useState(0);
  const [likes, setLikes] = useState(project.likes);
  const [liked, setLiked] = useState(false);
  const [likeBusy, setLikeBusy] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState(false);

  const visitorId = getVisitorId();

  const badgeColor: Record<string, string> = {
    residencial: "bg-green-cta", comercial: "bg-gold text-carbon",
    industrial: "bg-carbon", "obra-publica": "bg-green-arch", otros: "bg-titanium",
  };

  const loadComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/comments`);
      const data = await res.json();
      setComments(data.comments ?? []);
    } finally {
      setCommentsLoading(false);
    }
  }, [project.id]);

  useEffect(() => { loadComments(); }, [loadComments]);

  const toggleLike = async () => {
    if (likeBusy) return;
    setLikeBusy(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes(l => l + (nextLiked ? 1 : -1));
    if (nextLiked) { setBurst(true); setTimeout(() => setBurst(false), 650); trackEvent("project_like", { project_id: project.id }); }
    try {
      const res = await fetch(`/api/projects/${project.id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, action: nextLiked ? "like" : "unlike" }),
      });
      const data = await res.json();
      if (res.ok) { setLikes(data.likes); setLiked(data.liked); }
    } catch {
      setLiked(!nextLiked);
      setLikes(l => l - (nextLiked ? 1 : -1));
    } finally {
      setLikeBusy(false);
    }
  };

  const handleDoubleTap = () => { if (!liked) toggleLike(); };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;
    setPosting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorName: name.trim(), comment: commentText.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments(c => [...c, data.comment]);
        setCommentText("");
        trackEvent("project_comment", { project_id: project.id });
      }
    } finally {
      setPosting(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/proyectos#${project.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: project.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert(lang === "en" ? "Link copied!" : "¡Enlace copiado!");
    }
    trackEvent("project_share", { project_id: project.id });
  };

  const prev = () => setImgIdx(i => (i - 1 + project.images.length) % project.images.length);
  const next = () => setImgIdx(i => (i + 1) % project.images.length);

  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 modal-backdrop" />
      <motion.div
        className="relative z-10 bg-white sm:rounded-2xl overflow-hidden shadow-2xl w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl flex flex-col sm:flex-row"
        initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }} onClick={e => e.stopPropagation()}
      >
        {/* ── Image side ── */}
        <div className="relative bg-black flex-shrink-0 sm:w-[58%] aspect-square sm:aspect-auto sm:h-auto flex items-center" onDoubleClick={handleDoubleTap}>
          <div className="relative w-full aspect-square sm:aspect-auto sm:h-full">
            <AnimatePresence mode="wait">
              <motion.div key={imgIdx} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Image src={project.images[imgIdx]} alt={`${project.title} — Tekton Arquitectos`} fill className="object-cover" unoptimized />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {burst && (
                <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1.15 }} exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.5 }}>
                  <Heart className="w-24 h-24 text-white drop-shadow-lg" fill="white" />
                </motion.div>
              )}
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <button onClick={prev} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-carbon flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} aria-label="Siguiente" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-carbon flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {project.images.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={`rounded-full transition-all duration-200 ${i === imgIdx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`} />
                  ))}
                </div>
              </>
            )}

            <span className={`absolute top-3 left-3 text-white text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeColor[project.category] ?? "bg-green-cta"}`}>
              {project.badge}
            </span>
          </div>
        </div>

        {/* ── Right / content side (Instagram post layout) ── */}
        <div className="flex flex-col sm:w-[42%] min-h-0 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-carbon/8 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/40 relative bg-carbon">
                <Image src="/images/logo-icon.png" alt="Tekton Arquitectos" fill className="object-contain p-1" />
              </div>
              <div className="min-w-0">
                <p className="font-display font-bold text-xs text-carbon leading-none truncate">tektonarquitectos</p>
                <p className="text-titanium text-[11px] mt-0.5 flex items-center gap-1 truncate">
                  <MapPin className="w-2.5 h-2.5 shrink-0" /> {project.location}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-carbon/5 transition-colors shrink-0" aria-label="Cerrar">
              <X className="w-5 h-5 text-carbon" />
            </button>
          </div>

          {/* Scrollable body: caption + comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[120px]">
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 relative bg-carbon">
                <Image src="/images/logo-icon.png" alt="" fill className="object-contain p-1" />
              </div>
              <p className="text-sm text-carbon leading-relaxed">
                <span className="font-display font-bold mr-1.5">tektonarquitectos</span>
                <span className="font-semibold">{project.title}</span>
                {" — "}{project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pl-9">
              <span className="flex items-center gap-1 bg-bone text-titanium text-[11px] px-2.5 py-1 rounded-full"><Ruler className="w-3 h-3" /> {project.area}</span>
              <span className="flex items-center gap-1 bg-bone text-titanium text-[11px] px-2.5 py-1 rounded-full"><Calendar className="w-3 h-3" /> {project.year}</span>
              <span className="flex items-center gap-1 bg-bone text-titanium text-[11px] px-2.5 py-1 rounded-full"><MapPin className="w-3 h-3" /> {project.location}</span>
            </div>

            <div className="h-px bg-carbon/8 my-1" />

            {commentsLoading ? (
              <div className="flex justify-center py-6"><Loader2 className="w-5 h-5 text-titanium animate-spin" /></div>
            ) : comments.length === 0 ? (
              <p className="text-titanium text-xs text-center py-6">
                {lang === "en" ? "No comments yet. Be the first!" : "Aún no hay comentarios. ¡Sé el primero!"}
              </p>
            ) : (
              comments.map(c => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-green-cta/15 text-green-arch flex items-center justify-center text-xs font-display font-bold shrink-0">
                    {c.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-carbon leading-relaxed break-words">
                      <span className="font-display font-bold mr-1.5">{c.author_name}</span>
                      {c.comment}
                    </p>
                    <p className="text-titanium text-[10px] mt-0.5 uppercase tracking-wide">{timeAgo(c.created_at, lang)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Actions row (Instagram-style icons) */}
          <div className="shrink-0 border-t border-carbon/8">
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="flex items-center gap-4">
                <button onClick={toggleLike} aria-label="Me gusta" className="active:scale-90 transition-transform">
                  <Heart className={`w-6 h-6 transition-colors ${liked ? "text-red-500" : "text-carbon"}`} fill={liked ? "currentColor" : "none"} strokeWidth={1.8} />
                </button>
                <button aria-label="Comentar" className="active:scale-90 transition-transform" onClick={() => document.getElementById(`comment-input-${project.id}`)?.focus()}>
                  <MessageCircle className="w-6 h-6 text-carbon" strokeWidth={1.8} />
                </button>
                <button onClick={handleShare} aria-label="Compartir" className="active:scale-90 transition-transform">
                  <Send className="w-6 h-6 text-carbon" strokeWidth={1.8} />
                </button>
              </div>
              <button onClick={() => setSaved(s => !s)} aria-label="Guardar" className="active:scale-90 transition-transform">
                <Bookmark className="w-6 h-6 text-carbon" fill={saved ? "currentColor" : "none"} strokeWidth={1.8} />
              </button>
            </div>
            <p className="px-4 pt-2 font-display font-bold text-xs text-carbon">
              {likes} {likes === 1 ? (lang === "en" ? "like" : "me gusta") : (lang === "en" ? "likes" : "me gusta")}
            </p>

            <form onSubmit={submitComment} className="flex items-center gap-2 px-4 py-3">
              <input value={name} onChange={e => setName(e.target.value)} placeholder={lang === "en" ? "Name" : "Nombre"}
                maxLength={60}
                className="w-20 sm:w-24 bg-bone rounded-full px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-green-cta shrink-0" />
              <input id={`comment-input-${project.id}`} value={commentText} onChange={e => setCommentText(e.target.value)}
                placeholder={lang === "en" ? "Add a comment…" : "Añade un comentario…"} maxLength={500}
                className="flex-1 bg-transparent text-sm focus:outline-none min-w-0" />
              <button type="submit" disabled={posting || !name.trim() || !commentText.trim()}
                className="text-green-arch font-display font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed shrink-0">
                {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : (lang === "en" ? "Post" : "Publicar")}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
