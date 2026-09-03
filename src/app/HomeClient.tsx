'use client';
import Hero from '@/components/home/Hero';
import QuienesSomosVideo from '@/components/home/QuienesSomosVideo';
import ProjectCarousel from '@/components/home/ProjectCarousel';
import ProcessSection from '@/components/home/ProcessSection';
import StatsSection from '@/components/home/StatsSection';
import PrecotSection from '@/components/home/PrecotSection';
import CtaSection from '@/components/home/CtaSection';
import EsenciaSection from '@/components/home/EsenciaSection';

export default function HomePageClient() {
  return (
    <>
      <Hero />
      <EsenciaSection />
      <QuienesSomosVideo />
      <ProjectCarousel />
      <PrecotSection />
      <StatsSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}
