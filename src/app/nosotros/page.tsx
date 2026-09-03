import { Metadata } from "next";
import NosotrosPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Quiénes Somos — Arquitectos en Hidalgo",
  description:
    "Conoce al equipo de Tekton Arquitectos. Más de 8 años construyendo sueños en Hidalgo con transparencia, calidad y compromiso.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Quiénes Somos | Tekton Arquitectos en Hidalgo",
    description: "Más de 8 años construyendo sueños en Hidalgo con el equipo de Tekton Arquitectos.",
    url: "https://tektonarquitectos.com/nosotros",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Quiénes Somos", path: "/nosotros" }]} />
      <NosotrosPageClient />
    </>
  );
}
