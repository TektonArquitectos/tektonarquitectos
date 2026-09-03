'use client';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { PROCESS_STEPS } from '@/lib/data';
import Link from 'next/link';

const TOTAL = PROCESS_STEPS.length; // 5

export default function ProcessSection() {
  const { t } = useLanguage();
  const sectionRef   = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile,   setIsMobile]   = useState(false);
  // Cache the absolute top of the section to avoid recomputing on every scroll
  const sectionTopRef = useRef(0);

  /* ── Responsive check ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Cache section absolute top after layout ── */
  useLayoutEffect(() => {
    const compute = () => {
      if (!sectionRef.current) return;
      // Walk offsetParent chain for accurate position
      let top = 0;
      let el: HTMLElement | null = sectionRef.current;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      sectionTopRef.current = top;
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  /* ── Scroll-position driven step advancement (NO wheel interception) ── */
  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      const scrolledInto = window.scrollY - sectionTopRef.current;
      if (scrolledInto < 0) { setActiveStep(0); return; }
      const vh = window.innerHeight;
      const raw = Math.floor(scrolledInto / vh);
      setActiveStep(Math.max(0, Math.min(TOTAL - 1, raw)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  const step = PROCESS_STEPS[activeStep];

  return (
    <section ref={sectionRef} className="bg-carbon text-white">

      {/* ── Section header (always visible, not sticky) ── */}
      <div className="text-center pt-14 sm:pt-20 pb-8 sm:pb-12 px-4">
        <motion.h2
          className="font-display font-bold text-2xl sm:text-4xl text-white mb-3"
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          {t.process.title}
        </motion.h2>
        <div className="gold-divider w-16 mx-auto mb-4" />
        <motion.p
          className="text-white/65 text-sm sm:text-base max-w-xl mx-auto"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.15 }}>
          {t.process.sub}
        </motion.p>
      </div>

      {/* ── DESKTOP: TOTAL×100vh tall container, sticky inner panel ── */}
      {/*  The sticky panel stays pinned for TOTAL viewports of scroll,      */}
      {/*  then releases naturally. No wheel interception needed.             */}
      <div className="hidden md:block" style={{ height: `${TOTAL * 100}vh` }}>
        <div ref={stickyRef}
          className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

          <div className="max-w-7xl mx-auto px-6 lg:px-14 w-full grid grid-cols-2 gap-12 lg:gap-20 items-center h-full py-10">

            {/* Left — step text */}
            <div className="relative h-72 lg:h-80">
              <AnimatePresence mode="wait">
                <motion.div key={activeStep}
                  initial={{ opacity:0, y:40 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-28 }}
                  transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Big step number watermark */}
                  <span className="font-display font-bold leading-none text-gold/10 select-none block -ml-2 mb-1"
                    style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}>
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-4 -mt-3">
                    {step.title}
                  </h3>
                  <p className="text-white/68 text-base leading-relaxed max-w-sm">{step.desc}</p>
                  <div className="mt-6">
                    <Link href="/precotizador"
                      className="inline-block border border-gold/50 text-gold font-display font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-gold/10 transition-colors">
                      {t.process.cta}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — step image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div key={activeStep} className="absolute inset-0"
                  initial={{ opacity:0, scale:1.07 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0 }}
                  transition={{ duration:0.6, ease:'easeOut' }}
                >
                  <Image src={step.img} alt={step.title} fill className="object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Step counter badge */}
              <div className="absolute top-4 left-4 bg-black/55 text-white font-display font-bold text-sm px-3 py-1 rounded-full backdrop-blur-sm z-10">
                {step.num} / 0{TOTAL}
              </div>
            </div>
          </div>

          {/* Step dots — right edge */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {PROCESS_STEPS.map((_, i) => (
              <div key={i}
                className={`rounded-full transition-all duration-500 ${
                  i === activeStep ? 'w-2 h-6 bg-gold' : 'w-2 h-2 bg-white/25'
                }`}
              />
            ))}
          </div>

          {/* Scroll cue (shows only when not at last step) */}
          {activeStep < TOTAL - 1 && (
            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/35 pointer-events-none">
              <motion.div animate={{ y:[0,6,0] }} transition={{ repeat:Infinity, duration:1.4 }}>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
              <span className="text-[10px] tracking-[2.5px] uppercase font-accent">Continúa</span>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE: linear list ── */}
      <div className="md:hidden px-5 pb-14">
        {PROCESS_STEPS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, amount:0.25 }} transition={{ delay:i*0.07, duration:0.5 }}
            className="flex gap-4 py-6 border-b border-white/10 last:border-0"
          >
            {/* Number + connector line */}
            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-xl text-gold w-8 text-center shrink-0 leading-none pt-1">
                {s.num}
              </span>
              {i < TOTAL - 1 && <div className="w-px flex-1 bg-white/15 mt-2" />}
            </div>
            <div className="flex-1 pb-1">
              <div className="relative aspect-[16/7] rounded-xl overflow-hidden mb-3.5">
                <Image src={s.img} alt={s.title} fill className="object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <h4 className="font-display font-bold text-base text-white mb-1.5">{s.title}</h4>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
        <div className="pt-5 text-center">
          <Link href="/precotizador"
            className="inline-block bg-green-cta text-white font-display font-bold text-sm px-7 py-3 rounded-lg hover:bg-green-arch transition-colors">
            {t.process.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
