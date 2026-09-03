import { Metadata } from "next";
import PrecotizadorPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Pre-Cotizador Gratuito — Visualiza tu Proyecto",
  description:
    "Completa el diagnóstico gratuito en 6 pasos y recibe la asesoría de un experto en menos de 24 horas. Tekton Arquitectos en Hidalgo.",
  alternates: { canonical: "/precotizador" },
  openGraph: {
    title: "Pre-Cotizador Gratuito | Tekton Arquitectos",
    description: "Diagnóstico en 6 pasos, gratis, sin compromiso. Un experto te contacta en 24 hrs.",
    url: "https://tektonarquitectos.com/precotizador",
  },
};

export default function PrecotizadorPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Pre-Cotizador", path: "/precotizador" }]} />
      <PrecotizadorPageClient />
    </>
  );
}
