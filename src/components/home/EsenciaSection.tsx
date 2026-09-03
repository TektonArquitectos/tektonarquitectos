'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';

const icons = [
  // Custom Design — floor plan icon
  <svg key="d" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 sm:w-12 sm:h-12 text-gold">
    <rect x="6" y="6" width="36" height="36" rx="3"/>
    <path d="M6 20h36M6 32h36M20 6v36M32 6v36"/>
    <circle cx="13" cy="13" r="2" fill="currentColor" strokeWidth="0"/>
  </svg>,
  // Transparency — clock with check
  <svg key="t" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 sm:w-12 sm:h-12 text-gold">
    <circle cx="24" cy="24" r="18"/>
    <path d="M24 12v12l8 5"/>
    <path d="M34 36l-4-4m0 4l4-4" strokeLinecap="round"/>
  </svg>,
  // Quality — shield with star
  <svg key="q" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 sm:w-12 sm:h-12 text-gold">
    <path d="M24 4L44 12v10c0 12-8 22-20 26C12 44 4 34 4 22V12z"/>
    <path d="M24 14l2.5 7.5H34l-6.4 4.7 2.5 7.5L24 29.3l-6.1 4.4 2.5-7.5L14 21.5h7.5z" strokeLinejoin="round"/>
  </svg>,
];

export default function EsenciaSection() {
  const { t } = useLanguage();
  const cards = [
    { title:t.esencia.f1t, desc:t.esencia.f1d },
    { title:t.esencia.f2t, desc:t.esencia.f2d },
    { title:t.esencia.f3t, desc:t.esencia.f3d },
  ];

  return (
    <section className="bg-bone py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3 leading-tight whitespace-pre-line">
            {t.esencia.title}
          </h2>
          <div className="gold-divider w-16 mx-auto mb-4" />
          <p className="text-titanium text-sm sm:text-base">{t.esencia.sub}</p>
        </ScrollReveal>

        {/* Logo strip */}
        <ScrollReveal className="flex justify-center mb-10 sm:mb-14">
          <Image src="/images/logo-full.png" alt="Tekton Arquitectos" width={180} height={56} className="object-contain opacity-80"  loading="lazy" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((c,i)=>(
            <motion.div key={i}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.25 }} transition={{ delay:i*0.12, duration:0.6, ease:[0.22,1,0.36,1] }}
              className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              style={{ borderBottomWidth:3, borderBottomColor:'transparent' }}
              whileHover={{ borderBottomColor:'#C9A86A' }}
            >
              <div className="flex justify-center mb-4 sm:mb-5">{icons[i]}</div>
              <h4 className="font-display font-bold text-base sm:text-lg text-carbon mb-3">{c.title}</h4>
              <p className="text-titanium text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
