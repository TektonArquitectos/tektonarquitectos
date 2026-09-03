'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CtaSection from '@/components/home/CtaSection';

interface Post {
  id: string;
  image: string;
  date: string;
  read: string;
  title: string;
  body: string;
  full: string;
  tag: string;
}

// ── Blog post modal ────────────────────────────────────────────
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  // Render markdown-lite: **bold**, newlines → paragraphs
  const renderBody = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const withBold = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const withItalic = withBold.replace(/\*(.*?)\*/g, '<em>$1</em>');
      const isHeading = withItalic.includes('<strong>') && para.trim().startsWith('**');
      return (
        <p key={i}
          className={`text-sm leading-relaxed ${isHeading ? 'font-semibold text-carbon mt-4 mb-1' : 'text-titanium mb-3'}`}
          dangerouslySetInnerHTML={{ __html: withItalic }}
        />
      );
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 modal-backdrop bg-black/65" />
      <motion.div
        className="relative z-10 bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        initial={{ scale:0.94, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.94, y:20, opacity:0 }}
        transition={{ type:'spring', stiffness:340, damping:32 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-44 sm:h-56 flex-shrink-0 bg-carbon">
          <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className="bg-green-cta text-white text-[10px] font-display font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2 inline-block">
              {post.tag}
            </span>
            <h2 className="font-display font-bold text-white text-lg sm:text-xl leading-snug">{post.title}</h2>
            <p className="text-white/70 text-xs mt-1">{post.date} · {post.read} de lectura</p>
          </div>
          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg leading-none">
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {renderBody(post.full)}
        </div>

        {/* Footer CTA */}
        <div className="border-t border-bone px-5 sm:px-7 py-4 flex items-center justify-between gap-3 flex-shrink-0">
          <p className="text-xs text-titanium">¿Te interesa este tema?</p>
          <a href="/contacto"
            className="bg-green-cta text-white font-display font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-green-arch transition-colors whitespace-nowrap">
            Hablar con un experto →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Blog page ──────────────────────────────────────────────────
export default function BlogPageClient() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(d => setPosts(d.posts ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bg-bone pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div className="text-center mb-12 sm:mb-16"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <h1 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.blog.title}</h1>
            <div className="gold-divider w-16 mx-auto mb-4" />
            <p className="text-titanium text-sm sm:text-base max-w-lg mx-auto">{t.blog.sub}</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
              {Array.from({length:6}).map((_,i)=>(<div key={i} className="h-80 rounded-2xl bg-white animate-pulse" />))}
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {posts.map((p, i) => (
              <motion.article key={p.id}
                initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07, duration:0.55 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col"
                onClick={() => setSelected(p)}
              >
                <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized loading="lazy" />
                  <span className="absolute top-3 left-3 bg-green-cta text-white text-[10px] font-display font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                    {p.tag}
                  </span>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex gap-3 text-[11px] text-titanium mb-2.5">
                    <span>📅 {p.date}</span><span>⏱ {p.read}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-carbon mb-2.5 leading-snug flex-1">{p.title}</h3>
                  <p className="text-titanium text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">{p.body}</p>
                  <span className="text-green-arch font-display font-semibold text-xs flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200 mt-auto">
                    Leer más <span>→</span>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
          )}

          <ScrollReveal className="text-center mt-12">
            <a href="/precotizador" className="inline-block bg-green-cta text-white font-display font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-green-arch transition-colors">
              Hablar con un Asesor Experto
            </a>
          </ScrollReveal>
        </div>
      </section>

      <CtaSection />

      {/* Post modal */}
      <AnimatePresence>
        {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
