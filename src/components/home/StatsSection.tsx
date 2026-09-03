'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';

function Counter({ value, delay=0 }: { value:string; delay?:number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  // Parse: extract prefix/suffix and numeric part
  const prefix = value.startsWith('+') ? '+' : '';
  const numStr = value.replace(/[^0-9]/g, '');
  const suffix = value.replace(/[^a-zA-Z\s]/g, '').trim();
  const target = parseInt(numStr || '0');

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 1800;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        setDisplay(prefix + current + (suffix ? ' ' + suffix : ''));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, target, prefix, suffix, delay]);

  return <span ref={ref}>{display || (prefix + '0')}</span>;
}

export default function StatsSection() {
  const { t } = useLanguage();
  const stats = [
    { num: t.stats.s1n, label: t.stats.s1l, desc: t.stats.s1d },
    { num: t.stats.s2n, label: t.stats.s2l, desc: t.stats.s2d },
    { num: t.stats.s3n, label: t.stats.s3l, desc: t.stats.s3d },
    { num: t.stats.s4n, label: t.stats.s4l, desc: t.stats.s4d },
  ];

  return (
    <section className="section-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal className="text-center mb-12 sm:mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.stats.title}</h2>
          <div className="gold-divider w-16 mx-auto mb-4" />
          <p className="text-titanium text-sm sm:text-base max-w-lg mx-auto">{t.stats.sub}</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.4 }} transition={{ delay:i*0.1, duration:0.6, ease:[0.22,1,0.36,1] }}
              className="text-center"
            >
              <div className="font-display font-bold text-3xl sm:text-5xl text-green-arch mb-2 leading-none">
                <Counter value={s.num} delay={i * 0.1 + 0.2} />
              </div>
              <div className="font-display font-semibold text-sm sm:text-base text-carbon mb-1">{s.label}</div>
              <div className="text-titanium text-xs sm:text-sm">{s.desc}</div>
            </motion.div>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12" delay={0.4}>
          <Link href="/nosotros"
            className="inline-flex items-center border border-gold text-carbon font-display font-semibold text-sm uppercase tracking-wide px-6 py-3 rounded hover:bg-gold/10 hover:border-carbon transition-colors">
            {t.stats.cta}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
