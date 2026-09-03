'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CtaSection from '@/components/home/CtaSection';
import Link from 'next/link';
import ProjectDetailModal, { ModalProject } from '@/components/projects/ProjectDetailModal';

export default function ProyectosPageClient() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<ModalProject | null>(null);
  const [projects, setProjects] = useState<ModalProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => setProjects(d.projects ?? []))
      .finally(() => setLoading(false));
  }, []);

  const cats = ['all', 'residencial', 'comercial', 'industrial', 'obra-publica'];
  const mainProjects = projects.filter(p => p.category !== 'otros');
  const otrosProjects = projects.filter(p => p.category === 'otros');
  const filtered = filter === 'all' ? mainProjects : mainProjects.filter(p => p.category === filter);

  const badgeColor: Record<string, string> = {
    residencial: 'bg-green-cta',
    comercial: 'bg-gold !text-carbon',
    industrial: 'bg-carbon',
    'obra-publica': 'bg-green-arch',
    otros: 'bg-titanium',
  };

  return (
    <>
      {/* Hero — same style as home */}
      <div className="relative pt-24 pb-14 sm:pt-32 sm:pb-18 bg-carbon">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/hero-1.jpg" alt="" fill className="object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <motion.h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            {t.proyectos.title}
          </motion.h1>
          <motion.p className="text-white/70 text-sm sm:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {t.proyectos.sub}
          </motion.p>
        </div>
      </div>

      {/* Main Projects */}
      <section className="bg-bone py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Filter bar */}
          <ScrollReveal className="flex flex-wrap gap-2 justify-center mb-10 sm:mb-12">
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                className={`font-display font-semibold text-xs sm:text-sm uppercase tracking-wide px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all
                  ${filter === c ? 'bg-green-cta border-green-cta text-white' : 'bg-white border-gray-200 text-carbon hover:border-green-cta hover:text-green-cta'}`}>
                {c === 'all' ? t.proyectos.all : c === 'obra-publica' ? t.proyectos.obraPublica : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </ScrollReveal>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {Array.from({length:4}).map((_,i)=>(<div key={i} className="h-72 sm:h-96 rounded-md bg-white animate-pulse" />))}
            </div>
          ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div key={p.id} id={p.id} layout
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setSelected(p)}
                  className="bg-white rounded-md overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-56 sm:h-72 overflow-hidden">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-green-arch/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white text-lg">→</div>
                      <span className="text-white font-display font-semibold text-[11px] uppercase tracking-widest">{t.proyectos.verDetalle}</span>
                    </div>
                    <span className={`absolute top-3 left-3 text-white text-[10px] font-display font-semibold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${badgeColor[p.category] ?? 'bg-green-cta'}`}>{p.badge}</span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h4 className="font-display font-bold text-sm sm:text-base text-carbon mb-1.5 leading-snug">{p.title}</h4>
                    <p className="text-titanium text-xs flex items-center gap-1.5">
                      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a5 5 0 00-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 00-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" /></svg>
                      {p.location} · {p.year}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}

          <ScrollReveal className="text-center mt-14">
            <p className="text-titanium text-sm mb-5">{t.proyectos.inspiracion}</p>
            <Link href="/precotizador" className="inline-block bg-green-cta text-white font-display font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-green-arch transition-colors">
              {t.proyectos.quieroAlgoAsiBtn}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Otros Proyectos Section */}
      {otrosProjects.length > 0 && (
      <section className="bg-carbon py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-10">
            <span className="font-accent text-[11px] tracking-[4px] uppercase text-gold mb-3 block">{t.proyectos.portafolio}</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">{t.proyectos.otrosProyectos}</h2>
            <div className="gold-divider w-16 mx-auto mb-4" />
            <p className="text-white/65 text-sm sm:text-base max-w-xl mx-auto">
              {t.proyectos.otrosSub}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
            {otrosProjects.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <motion.div
                  onClick={() => setSelected(p)}
                  whileHover={{ y: -6 }}
                  className="relative rounded-md overflow-hidden cursor-pointer group shadow-lg"
                >
                  <div className="relative h-72 sm:h-80">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-green-arch/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                      <div className="w-11 h-11 rounded-full border-2 border-white flex items-center justify-center text-white text-lg">→</div>
                      <span className="text-white font-display font-semibold text-[11px] uppercase tracking-widest">{t.proyectos.verMas}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity">
                    <h4 className="font-display font-bold text-white text-sm">{p.title}</h4>
                    <p className="text-white/70 text-xs mt-0.5">{p.location} · {p.year}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      )}

      <CtaSection />

      <AnimatePresence>
        {selected && <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
