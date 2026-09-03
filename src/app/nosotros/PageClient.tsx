'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import StatsSection from '@/components/home/StatsSection';
import CtaSection from '@/components/home/CtaSection';

// SVG value icons — brand palette, no emojis
const ValueIcons = [
  // Commitment — handshake
  <svg key="c" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-green-arch">
    <path d="M6 28l8-8 6 4 8-8 8 8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 36l8-6 6 3 8-5 8 5 6-3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="12" r="4"/>
  </svg>,
  // Innovation — lightbulb
  <svg key="i" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
    <path d="M24 8a12 12 0 019 19.8c-1.5 1.7-3 3.2-3 5.2v1H18v-1c0-2-1.5-3.5-3-5.2A12 12 0 0124 8z" strokeLinejoin="round"/>
    <path d="M18 34h12M20 38h8" strokeLinecap="round"/>
    <path d="M24 8V5M10 14l-2-2M38 14l2-2M8 26H5M43 26h-3"/>
  </svg>,
  // Sustainability — leaf
  <svg key="s" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-green-cta">
    <path d="M12 36c2-10 10-20 28-24-4 16-14 24-28 24z" strokeLinejoin="round"/>
    <path d="M12 36l8-8" strokeLinecap="round"/>
    <path d="M14 42c0-4 4-6 6-6" strokeLinecap="round"/>
  </svg>,
  // Integrity — scale
  <svg key="int" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-green-arch">
    <path d="M24 6v36M10 42h28" strokeLinecap="round"/>
    <path d="M14 12L6 22h16L14 12zM34 12l-8 10h16L34 12z" strokeLinejoin="round"/>
    <circle cx="24" cy="6" r="2" fill="currentColor" strokeWidth="0"/>
  </svg>,
  // Quality — diamond
  <svg key="q" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
    <path d="M24 8l12 8-12 26L12 16z" strokeLinejoin="round"/>
    <path d="M12 16h24" strokeLinecap="round"/>
    <path d="M17 16l7 24M31 16l-7 24"/>
  </svg>,
];

const AWARDS = [
  { year:'2024', name:'Premio a la Excelencia Constructiva', desc:'Reconocimiento por calidad en obra residencial, Hidalgo.' },
  { year:'2023', name:'Mejor Proyecto Comercial', desc:'Premio regional por diseño e innovación en proyecto comercial.' },
  { year:'2022', name:'Construcción Sustentable', desc:'Reconocimiento por prácticas sostenibles en construcción.' },
  { year:'2021', name:'Empresa Confiable Hidalgo', desc:'Certificación de confianza otorgada por CMIC Hidalgo.' },
];

const TEAM_IMGS = [
  '/images/nosotros/equipo-1.webp',
  '/images/nosotros/equipo-2.webp',
  '/images/nosotros/equipo-3.webp',
  '/images/nosotros/equipo-4.webp',
];

export default function NosotrosPageClient() {
  const { t } = useLanguage();
  const vals = [
    { title:t.nosotros.v1n, desc:t.nosotros.v1d },
    { title:t.nosotros.v2n, desc:t.nosotros.v2d },
    { title:t.nosotros.v3n, desc:t.nosotros.v3d },
    { title:t.nosotros.v4n, desc:t.nosotros.v4d },
    { title:t.nosotros.v5n, desc:t.nosotros.v5d },
  ];

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
            {t.nosotros.heroTitle}
          </motion.h1>
          <motion.p className="text-white/70 text-sm sm:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {t.nosotros.heroSub}
          </motion.p>
        </div>
      </div>

      {/* Historia */}
      <section className="bg-bone py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-5">{t.nosotros.histTitle}</h2>
              <div className="gold-divider w-16 mb-6" />
              <p className="text-titanium text-sm sm:text-base leading-relaxed mb-5">{t.nosotros.hist1}</p>
              <p className="text-titanium text-sm sm:text-base leading-relaxed mb-7">{t.nosotros.hist2}</p>
              <div className="flex items-center gap-3 mt-2">
                <Image src="/images/logo-icon.png" alt="Tekton Arquitectos" width={44} height={44} className="object-contain opacity-80" loading="lazy" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="grid grid-cols-2 gap-3">
                {/* equipo-1: tall portrait spanning rows visually */}
                <div className="relative rounded-xl overflow-hidden shadow-sm aspect-[3/4] row-span-2">
                  <Image src={TEAM_IMGS[0]}
                    alt={`${t.nosotros.equipoAlt} — 1`}
                    fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                {/* equipo-2: square */}
                <div className="relative rounded-xl overflow-hidden shadow-sm aspect-square">
                  <Image src={TEAM_IMGS[1]}
                    alt={`${t.nosotros.equipoAlt} — 2`}
                    fill className="object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
                {/* equipo-3: square 1:1 */}
                <div className="relative rounded-xl overflow-hidden shadow-sm aspect-square">
                  <Image src={TEAM_IMGS[2]}
                    alt={`${t.nosotros.equipoAlt} — 3`}
                    fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                {/* equipo-4: square 1:1 */}
                <div className="relative rounded-xl overflow-hidden shadow-sm aspect-square col-start-2">
                  <Image src={TEAM_IMGS[3]}
                    alt={`${t.nosotros.equipoAlt} — 4`}
                    fill className="object-cover object-center hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.nosotros.mvTitle}</h2>
            <div className="gold-divider w-16 mx-auto" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
              { label:t.nosotros.mLabel, text:t.nosotros.mText, accent:'border-green-arch bg-green-arch/5',
                icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-green-arch"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="8"/><circle cx="24" cy="24" r="2" fill="currentColor" strokeWidth="0"/></svg> },
              { label:t.nosotros.vLabel, text:t.nosotros.vText, accent:'border-gold bg-gold/5',
                icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold"><path d="M24 6l4 12h13l-10 8 4 12-11-8-11 8 4-12L7 18h13z" strokeLinejoin="round"/></svg> },
            ].map(c=>(
              <ScrollReveal key={c.label}>
                <div className={`p-7 sm:p-10 rounded-2xl border-t-4 shadow-sm ${c.accent}`}>
                  <div className="mb-4">{c.icon}</div>
                  <h3 className="font-display font-bold text-xl text-carbon mb-4">{c.label}</h3>
                  <p className="text-titanium text-sm leading-relaxed italic">"{c.text}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Valores — SVG icons only, no emojis */}
      <section className="bg-carbon py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-3">{t.nosotros.valTitle}</h2>
            <div className="gold-divider w-16 mx-auto" />
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {vals.map((v,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.55, ease:[0.22,1,0.36,1] }}
                className="bg-white/8 rounded-2xl p-5 sm:p-6 text-center border border-white/10 hover:bg-white/12 hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-center mb-3 sm:mb-4">{ValueIcons[i]}</div>
                <h4 className="font-display font-bold text-sm sm:text-base text-white mb-2">{v.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Premios */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal className="text-center mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.nosotros.awardsTitle}</h2>
            <div className="gold-divider w-16 mx-auto" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AWARDS.map((a,i)=>(
              <motion.div key={i}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.5 }}
                className="bg-bone rounded-2xl p-6 border-t-3 border-gold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ borderTopWidth:3, borderTopColor:'#C9A86A' }}>
                <p className="font-display font-bold text-gold text-xs tracking-[3px] uppercase mb-3">{a.year}</p>
                <h4 className="font-display font-bold text-sm sm:text-base text-carbon mb-2 leading-snug">{a.name}</h4>
                <p className="text-titanium text-xs leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bacru alliance */}
      <section className="bg-carbon py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-8">
          <ScrollReveal>
            <div className="bg-white/8 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-gold mx-auto mb-4">
                <path d="M24 6l6 10h10l-8 6 3 11-11-7-11 7 3-11L8 16h10z" strokeLinejoin="round"/>
                <path d="M24 24v18" strokeLinecap="round"/>
                <path d="M15 30l9 12 9-12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4">{t.nosotros.bacruTitle}</h3>
              <div className="gold-divider w-16 mx-auto mb-5" />
              <p className="text-white/65 text-sm leading-relaxed mb-7 max-w-md mx-auto">{t.nosotros.bacruText}</p>
              <Image src="/images/logo-icon.png" alt="Tekton" width={36} height={36} className="object-contain mx-auto mb-5 opacity-40" />
              <a href="/contacto" className="inline-block bg-green-cta text-white font-display font-bold text-sm px-7 py-3 rounded-lg hover:bg-green-arch transition-colors">
                {t.nosotros.cta}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
