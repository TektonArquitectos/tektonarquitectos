import { Metadata } from "next";
import ProyectosPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Proyectos de Construcción en Hidalgo",
  description:
    "Más de 200 proyectos residenciales, comerciales e industriales en Hidalgo. Casas, naves industriales, obra pública y más. Conoce nuestros trabajos.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos de Construcción en Hidalgo | Tekton Arquitectos",
    description: "Más de 200 proyectos en Hidalgo. Residencial, comercial, industrial y obra pública.",
    url: "https://tektonarquitectos.com/proyectos",
    images: [{ url: "/images/proyectos/p1.webp", alt: "Proyectos de construcción Tekton Arquitectos en Hidalgo" }],
  },
};

export default function ProyectosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Proyectos", path: "/proyectos" }]} />
      <ProyectosPageClient />
    </>
  );
}
