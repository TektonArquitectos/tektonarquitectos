'use client';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';
import { trackWhatsAppClick } from '@/lib/analytics';

export default function CtaSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-green-arch">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
        <ScrollReveal>
          <div className="flex justify-center mb-6">
            <div className="bg-white/15 rounded-full p-3">
              <Image src="/images/logo-icon.png" alt="Tekton" width={40} height={40} className="object-contain"  loading="lazy" />
            </div>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">{t.cta.title}</h2>
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">{t.cta.sub}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/precotizador"
              className="bg-white text-green-arch font-display font-bold text-sm uppercase tracking-wide px-7 py-3.5 rounded-lg hover:bg-bone transition-colors">
              {t.cta.btn1}
            </Link>
            <a href="https://wa.me/527711964068" target="_blank" rel="noreferrer"
              onClick={()=>trackWhatsAppClick('cta_section')}
              className="flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-display font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-white/25 transition-colors">
              {t.cta.btn2}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
