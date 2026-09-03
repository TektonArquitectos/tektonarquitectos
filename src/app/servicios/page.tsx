import { Metadata } from "next";
import ServiciosPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Servicios de Arquitectura y Construcción en Hidalgo",
  description:
    "Diseño y construcción de casas, remodelaciones, ampliaciones, diseño de interiores, asesoría INFONAVIT, topografía y más. Tekton Arquitectos en Hidalgo.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Construcción en Hidalgo | Tekton Arquitectos",
    description:
      "Diseño de casas, remodelaciones, interiores, créditos INFONAVIT y más en Hidalgo.",
    url: "https://tektonarquitectos.com/servicios",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Servicios", path: "/servicios" }]} />
      <ServiciosPageClient />
    </>
  );
}
