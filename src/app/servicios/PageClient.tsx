'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CtaSection from '@/components/home/CtaSection';

// SVG icons
const ServiceIcons = [
  <svg key="house" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M6 20L24 6l18 14v22H6V20z"/><path d="M18 42V30h12v12"/><path d="M24 6v4"/></svg>,
  <svg key="hammer" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M8 40l22-22"/><path d="M28 10l10 10-4 4-10-10z"/><rect x="6" y="36" width="8" height="6" rx="1.5"/><path d="M36 8l4 4-2 2-4-4z"/></svg>,
  <svg key="expand" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M6 6h12M6 6v12"/><path d="M42 6H30M42 6v12"/><path d="M6 42h12M6 42v-12"/><path d="M42 42H30M42 42v-12"/><rect x="16" y="16" width="16" height="16" rx="2" strokeDasharray="3 2"/></svg>,
  <svg key="sofa" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><rect x="8" y="22" width="32" height="14" rx="3"/><path d="M8 28H6a2 2 0 01-2-2v-6a2 2 0 012-2h6v10M40 28h2a2 2 0 002-2v-6a2 2 0 00-2-2h-6v10"/><path d="M14 36v4M34 36v4"/><rect x="14" y="18" width="20" height="4" rx="2"/></svg>,
  <svg key="shield" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M24 4l16 6v14c0 10-8 18-16 22C16 42 8 34 8 24V10L24 4z"/><path d="M16 24l6 6 10-10"/></svg>,
  <svg key="bolt" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M28 4L10 26h16l-6 18 22-24H26L28 4z"/></svg>,
  <svg key="bank" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><path d="M4 20h40M24 6L4 20h40L24 6z"/><path d="M4 38h40M10 20v18M18 20v18M30 20v18M38 20v18"/><rect x="4" y="38" width="40" height="4" rx="1"/></svg>,
  <svg key="survey" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-gold"><circle cx="24" cy="18" r="8"/><path d="M24 26v16M16 42h16"/><path d="M16 18h-8M32 18h8"/><path d="M24 10V4"/><circle cx="24" cy="18" r="2" fill="currentColor" strokeWidth="0"/></svg>,
];

const PERSONA_IMGS = [
  '/images/servicios/residencial.webp',
  '/images/servicios/inversionista.webp',
  '/images/servicios/comercial.webp',
  '/images/servicios/industrial.webp',
  '/images/servicios/obra-publica.webp',
];

export default function ServiciosPageClient() {
  const { t } = useLanguage();

  const PERSONAS = [
    { id:'residencial',  title:t.servicios.p1title, tag:t.servicios.p1tag, intro:t.servicios.p1intro, services:t.servicios.p1services, img:PERSONA_IMGS[0] },
    { id:'inversionista',title:t.servicios.p2title, tag:t.servicios.p2tag, intro:t.servicios.p2intro, services:t.servicios.p2services, img:PERSONA_IMGS[1] },
    { id:'comercial',    title:t.servicios.p3title, tag:t.servicios.p3tag, intro:t.servicios.p3intro, services:t.servicios.p3services, img:PERSONA_IMGS[2] },
    { id:'industrial',   title:t.servicios.p4title, tag:t.servicios.p4tag, intro:t.servicios.p4intro, services:t.servicios.p4services, img:PERSONA_IMGS[3] },
    { id:'obra-publica', title:t.servicios.p5title, tag:t.servicios.p5tag, intro:t.servicios.p5intro, services:t.servicios.p5services, img:PERSONA_IMGS[4] },
  ];

  const SERVICIOS_DETALLE = [
    { title:t.servicios.sd1title, desc:t.servicios.sd1desc },
    { title:t.servicios.sd2title, desc:t.servicios.sd2desc },
    { title:t.servicios.sd3title, desc:t.servicios.sd3desc },
    { title:t.servicios.sd4title, desc:t.servicios.sd4desc },
    { title:t.servicios.sd5title, desc:t.servicios.sd5desc },
    { title:t.servicios.sd6title, desc:t.servicios.sd6desc },
    { title:t.servicios.sd7title, desc:t.servicios.sd7desc },
    { title:t.servicios.sd8title, desc:t.servicios.sd8desc },
  ];

  return (
    <>
      {/* Hero */}
      <div className="relative pt-24 pb-14 sm:pt-32 sm:pb-18 bg-carbon">
        <div className="absolute inset-0 opacity-30">
          <Image src="/images/hero-1.jpg" alt="" fill className="object-cover mix-blend-overlay" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <motion.p className="font-accent text-[11px] sm:text-xs tracking-[4px] uppercase text-gold mb-3"
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            {t.servicios.tag}
          </motion.p>
          <motion.h1 className="font-display font-bold text-3xl sm:text-5xl text-white mb-4"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}>
            {t.servicios.heroTitle}
          </motion.h1>
          <motion.p className="text-white/75 text-sm sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}>
            {t.servicios.heroSub}
          </motion.p>
        </div>
      </div>

      {/* Persona panels */}
      <section className="bg-bone py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-12">
            <span className="font-accent text-[11px] tracking-[4px] uppercase text-green-cta mb-3 block">{t.servicios.soluciones}</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-4">{t.servicios.quienEresTu}</h2>
            <div className="gold-divider w-16 mx-auto mb-4" />
            <p className="text-titanium text-sm sm:text-base max-w-xl mx-auto">{t.servicios.cadaClienteUnico}</p>
          </ScrollReveal>
          <div className="space-y-14 sm:space-y-20">
            {PERSONAS.map((p, i) => (
              <motion.div key={p.id} id={p.id}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.15 }} transition={{ duration:0.65, ease:[0.22,1,0.36,1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-lg bg-white ${i%2===1?'lg:[&>div:first-child]:order-2':''}`}>
                <div className="relative min-h-[220px] sm:min-h-[320px] overflow-hidden group">
                  <Image src={p.img} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
                  <span className="text-[11px] font-display font-semibold uppercase tracking-[3px] text-green-cta mb-2 flex items-center gap-2">
                    <span className="w-5 h-px bg-green-cta inline-block" />{p.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-carbon mb-4 leading-tight">{p.title}</h3>
                  <p className="text-titanium text-sm leading-relaxed mb-6">{p.intro}</p>
                  <ul className="space-y-2 mb-7">
                    {p.services.map((s: string) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-titanium">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-[7px]" />{s}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/precotizador?tipo=${p.id}`}
                    className="inline-flex items-center bg-green-cta text-white font-display font-semibold text-sm px-6 py-3 rounded-lg hover:bg-green-arch transition-colors self-start">
                    {t.servicios.cta} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intermediate CTA */}
      <section className="bg-white py-14 sm:py-20 text-center">
        <ScrollReveal className="max-w-xl mx-auto px-4">
          <Image src="/images/logo-icon.png" alt="Tekton" width={40} height={40} className="object-contain mx-auto mb-5 opacity-60" />
          <h3 className="font-display font-bold text-xl sm:text-3xl text-carbon mb-3">{t.servicios.ctaFinal}</h3>
          <p className="text-titanium text-sm mb-7">{t.servicios.ctaFinalSub}</p>
          <Link href="/precotizador" className="inline-block bg-green-cta text-white font-display font-bold text-sm px-8 py-3.5 rounded-lg hover:bg-green-arch transition-colors">
            {t.servicios.usePrecot}
          </Link>
        </ScrollReveal>
      </section>

      {/* Servicios Detalle — dark section */}
      <section className="bg-carbon py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-12">
            <span className="font-accent text-[11px] tracking-[4px] uppercase text-gold mb-3 block">{t.servicios.catalogoCompleto}</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">{t.servicios.nuestrosServicios}</h2>
            <div className="gold-divider w-16 mx-auto mb-4" />
            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">{t.servicios.serviciosDesc}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {SERVICIOS_DETALLE.map((s, i) => (
              <ScrollReveal key={s.title} delay={i*0.07}>
                <motion.div whileHover={{ y:-6 }} transition={{ type:'spring', stiffness:300, damping:20 }}
                  className="bg-white/8 rounded-2xl p-6 h-full border border-white/10 hover:bg-white/12 hover:border-gold/30 transition-all duration-300 flex flex-col items-center text-center gap-4 sm:items-start sm:text-left">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    {ServiceIcons[i]}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white leading-snug mb-2">{s.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
