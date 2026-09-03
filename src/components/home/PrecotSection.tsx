'use client';
import { Suspense } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Precotizador from './Precotizador';
import Image from 'next/image';

export default function PrecotSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-bone py-16 sm:py-24" id="precotizador">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.precot.title}</h2>
          <div className="gold-divider w-16 mx-auto mb-4" />
          <p className="text-titanium text-sm sm:text-base max-w-xl mx-auto">{t.precot.sub}</p>
        </ScrollReveal>
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={<div className="h-64 bg-white rounded-2xl animate-pulse" />}>
            <Precotizador />
          </Suspense>
        </div>
        <div className="flex justify-center mt-8">
          <Image src="/images/logo-icon.png" alt="Tekton" width={36} height={36} className="object-contain opacity-25"  loading="lazy" />
        </div>
      </div>
    </section>
  );
}
