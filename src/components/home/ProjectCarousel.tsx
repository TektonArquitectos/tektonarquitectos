'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';
import ProjectDetailModal, { ModalProject } from '@/components/projects/ProjectDetailModal';

// ── Draggable Carousel ─────────────────────────────────────────
export default function ProjectCarousel() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ModalProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ModalProject | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX:0, scrollLeft:0, lastX:0, velocity:0, raf:0 });

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => setProjects((d.projects ?? []).slice(0, 6)))
      .finally(() => setLoading(false));
  }, []);

  const badgeColor: Record<string,string> = {
    residencial:'bg-green-cta', comercial:'bg-gold !text-carbon',
    industrial:'bg-carbon', 'obra-publica':'bg-green-arch', otros:'bg-titanium',
  };

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = trackRef.current; if (!el) return;
    setIsDragging(true);
    dragState.current = { startX:e.pageX - el.offsetLeft, scrollLeft:el.scrollLeft, lastX:e.pageX, velocity:0, raf:0 };
    cancelAnimationFrame(dragState.current.raf);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return; e.preventDefault();
    const el = trackRef.current; if (!el) return;
    const x = e.pageX - el.offsetLeft;
    dragState.current.velocity = e.pageX - dragState.current.lastX;
    dragState.current.lastX = e.pageX;
    el.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
  }, [isDragging]);

  const endDrag = useCallback(() => {
    setIsDragging(false);
    const el = trackRef.current; if (!el) return;
    let v = dragState.current.velocity * 2;
    const step = () => {
      if (Math.abs(v) < 0.5) return;
      el.scrollLeft -= v; v *= 0.91;
      dragState.current.raf = requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const handleCardClick = (p: ModalProject) => {
    if (Math.abs(dragState.current.velocity) < 3) setSelected(p);
  };

  return (
    <>
      <section className="bg-white py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-10">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.proyectos.title}</h2>
              <div className="gold-divider w-16" />
              <p className="text-titanium text-sm sm:text-base mt-3 max-w-md">{t.proyectos.sub}</p>
            </div>
            <Link href="/proyectos"
              className="shrink-0 border border-gold text-carbon font-display font-semibold text-xs sm:text-sm uppercase tracking-wide px-5 py-2.5 rounded hover:bg-gold/10 transition-colors self-start sm:self-auto">
              {t.proyectos.verAll}
            </Link>
          </motion.div>
        </div>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          className={`flex gap-5 px-4 sm:px-8 overflow-x-auto pb-4 select-none
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {loading && Array.from({length:4}).map((_,i)=>(
            <div key={i} className="flex-shrink-0 w-[300px] sm:w-[400px] h-[280px] sm:h-[350px] rounded-md bg-bone animate-pulse" />
          ))}
          {!loading && projects.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ delay:i*0.07, duration:0.55, ease:[0.22,1,0.36,1] }}
              className="flex-shrink-0 w-[300px] sm:w-[400px] rounded-md overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 group"
              onClick={() => handleCardClick(p)}
            >
              {/* Image */}
              <div className="relative h-[200px] sm:h-[250px] overflow-hidden">
                <Image src={p.images[0]} alt={p.title + " — construcción en Hidalgo por Tekton Arquitectos"} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized loading="lazy" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-green-arch/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white text-xl">→</div>
                  <span className="text-white font-display font-semibold text-xs uppercase tracking-widest">{t.proyectos.verProyecto}</span>
                </div>
                <span className={`absolute top-3 left-3 text-white text-[10px] sm:text-[11px] font-display font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeColor[p.category]??'bg-green-cta'}`}>
                  {p.badge}
                </span>
              </div>
              {/* Info */}
              <div className="p-4 sm:p-5">
                <h4 className="font-display font-bold text-sm sm:text-base text-carbon mb-1.5 leading-tight">{p.title}</h4>
                <p className="text-titanium text-xs sm:text-sm flex items-center gap-1.5">
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a5 5 0 00-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 00-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                  </svg>
                  {p.location}
                </p>
              </div>
            </motion.div>
          ))}

          {/* CTA card */}
          <div className="flex-shrink-0 w-[220px] sm:w-[260px] rounded-md bg-green-arch flex flex-col items-center justify-center text-center p-7 gap-4">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-2xl">+</div>
            <p className="font-display font-bold text-white text-base leading-tight">{t.proyectos.tuProyecto}</p>
            <Link href="/precotizador"
              className="bg-white text-green-arch font-display font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-bone transition-colors"
              onClick={e=>e.stopPropagation()}>
              {t.proyectos.empezar}
            </Link>
          </div>
        </div>

        {/* Drag hint */}
        <p className="text-center text-titanium text-xs mt-3 flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7l4-4 4 4M8 17l4 4 4-4" />
          </svg>
          {t.proyectos.arrastra}
        </p>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectDetailModal project={selected} onClose={()=>setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
