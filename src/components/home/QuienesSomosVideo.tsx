'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Animated counter — same engine as StatsSection
function AnimCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  const prefix = value.startsWith('+') ? '+' : '';
  const numStr = value.replace(/[^0-9]/g, '');
  const target = parseInt(numStr || '0', 10);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const timer = setTimeout(() => {
      const duration = 1600;
      const start = performance.now();
      const step = (now: number) => {
        const prog = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        setDisplay(prefix + Math.round(eased * target));
        if (prog < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [inView, target, prefix, delay]);

  return <span ref={ref}>{display}</span>;
}

export default function QuienesSomosVideo() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  const VIDEO_ID = 'JpudQm_q5JI';
  const THUMB = '/images/hero-2.jpg';

  const miniStats = [
    { n: '+8',   l: 'Años' },
    { n: '+200', l: 'Proyectos' },
    { n: '+500', l: 'Clientes' },
  ];

  return (
    <section className="bg-carbon py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Video side ── */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-carbon border border-white/10">
              {!playing ? (
                <>
                  <Image src={THUMB} alt="Tekton Arquitectos — Quiénes somos" fill
                    className="object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="absolute top-4 left-4">
                      <Image src="/images/logo-full.png" alt="Tekton" width={110} height={36}
                        className="object-contain opacity-90" loading="lazy" />
                    </div>
                    <motion.button
                      onClick={() => setPlaying(true)}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 border-2 border-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-green-cta hover:border-green-cta transition-colors duration-300"
                      aria-label="Reproducir video"
                    >
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.button>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/55 text-white text-[11px] font-display px-2.5 py-1 rounded-md">
                    2:30 min
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Tekton Arquitectos — Quiénes somos"
                />
              )}
            </div>
          </ScrollReveal>

          {/* ── Text side ── */}
          <div>
            <ScrollReveal>
              <span className="font-accent text-[11px] tracking-[4px] uppercase text-gold mb-3 block">
                {t.video.label}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4 leading-tight">
                {t.video.title}
              </h2>
              <div className="gold-divider w-16 mb-5" />
              <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-7">
                {t.video.sub}
              </p>
            </ScrollReveal>

            {/* Animated mini stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              {miniStats.map((s, i) => (
                <ScrollReveal key={s.n} delay={i * 0.1}
                  className="text-center bg-white/8 border border-white/10 rounded-xl p-3 sm:p-4">
                  <p className="font-display font-bold text-xl sm:text-2xl text-green-cta">
                    <AnimCounter value={s.n} delay={i * 0.12 + 0.3} />
                  </p>
                  <p className="text-white/60 text-xs font-body mt-0.5">{s.l}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <Link href="/nosotros"
                className="inline-flex items-center border border-gold text-white font-display font-semibold text-sm uppercase tracking-wide px-6 py-3 rounded hover:bg-gold/15 hover:border-gold transition-colors gap-2">
                {t.video.cta}
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
