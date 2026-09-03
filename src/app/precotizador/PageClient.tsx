'use client';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Precotizador from '@/components/home/Precotizador';
import Image from 'next/image';

export default function PrecotizadorPageClient() {
  const { t } = useLanguage();
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-arch to-[#145c32] pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
            className="flex justify-center mb-5">
            <div className="bg-white/15 rounded-full p-3">
              <Image src="/images/logo-icon.png" alt="Tekton" width={48} height={48} className="object-contain" />
            </div>
          </motion.div>
          <motion.p className="font-accent text-[11px] sm:text-xs tracking-[4px] uppercase text-gold mb-3"
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            Diagnóstico Gratuito
          </motion.p>
          <motion.h1 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.32 }}>
            {t.precot.title}
          </motion.h1>
          <motion.p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}>
            {t.precot.sub}
          </motion.p>
          <motion.div className="flex flex-wrap gap-2 justify-center"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}>
            {['Sin costo','Sin compromiso','Respuesta en 24h','Datos privados'].map(b=>(
              <span key={b} className="bg-white/15 border border-white/25 text-white text-[11px] font-display font-semibold px-3 py-1 rounded-full">
                ✓ {b}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <section className="bg-bone py-12 sm:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-8">
          <Suspense fallback={<div className="h-64 bg-white rounded-2xl animate-pulse" />}>
            <Precotizador />
          </Suspense>
          <p className="text-center text-sm text-titanium mt-5">
            ¿Prefieres llamar? <a href="tel:+527711964068" className="text-green-arch font-semibold hover:underline">771 196 4068</a>
          </p>
        </div>
      </section>
    </>
  );
}
