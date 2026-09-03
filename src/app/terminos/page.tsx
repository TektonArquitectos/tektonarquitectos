import { Metadata } from "next";
import TerminosPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Tekton Arquitectos",
  description:
    "Términos y condiciones de uso del sitio web de Tekton Arquitectos Diseño e Ingeniería en Hidalgo, México.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Términos y Condiciones | Tekton Arquitectos",
    description: "Términos y condiciones de uso del sitio web de Tekton Arquitectos en Hidalgo.",
    url: "https://tektonarquitectos.com/terminos",
  },
};

export default function TerminosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Términos y Condiciones", path: "/terminos" }]} />
      <TerminosPageClient />
    </>
  );
}
