'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

const SLIDES = [
  { img: '/images/hero-1.jpg', ken: 'ken-1' },
  { img: '/images/hero-2.jpg', ken: 'ken-2' },
  { img: '/images/hero-3.jpg', ken: 'ken-3' },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i+1) % SLIDES.length), 6500);
    return () => clearInterval(iv);
  }, []);

  const words = t.hero.title.split(' ');

  return (
    <section className="relative h-screen min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* Ken Burns slides */}
      {SLIDES.map((s,i) => (
        <motion.div
          key={s.img}
          className="absolute inset-0"
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.2, ease:'easeInOut' }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center ${s.ken}`}
            style={{ backgroundImage:`url(${s.img})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/75" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.7 }}
          className="font-accent font-light text-[11px] sm:text-xs tracking-[5px] uppercase text-gold mb-4 sm:mb-5"
        >
          {t.hero.label}
        </motion.p>

        {/* Title — word by word */}
        <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.08] mb-5 sm:mb-6 tracking-tight">
          {words.map((word: string, i: number) => (
            <motion.span key={i} className="inline-block mr-[0.22em]"
              initial={{ opacity:0, y:28 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.55, ease:[0.22,1,0.36,1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.05, duration:0.7 }}
          className="font-body font-light text-sm sm:text-lg text-white/85 max-w-xl mx-auto mb-8 sm:mb-10"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.25, duration:0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/precotizador"
            className="bg-green-cta text-white font-display font-semibold text-sm uppercase tracking-wide px-6 py-3 sm:px-8 sm:py-3.5 rounded hover:bg-green-arch transition-colors hover:shadow-xl hover:shadow-green-cta/30">
            {t.hero.cta1}
          </Link>
          <Link href="/proyectos"
            className="border border-white/40 text-white font-display font-semibold text-sm uppercase tracking-wide px-6 py-3 sm:px-8 sm:py-3.5 rounded hover:bg-white/10 transition-colors">
            {t.hero.cta2}
          </Link>
        </motion.div>
      </div>

      {/* Slide dots */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10"
      >
        {SLIDES.map((_,i) => (
          <button key={i} onClick={()=>setIdx(i)} aria-label={`Slide ${i+1}`}
            className={`rounded-full transition-all duration-300 ${i===idx ? 'w-6 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}
        className="absolute bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 text-white/60"
      >
        <div className="bounce-arrow w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-white/50 rotate-45" />
        <p className="text-[10px] tracking-[2px] uppercase">{t.hero.scroll}</p>
      </motion.div>
    </section>
  );
}
