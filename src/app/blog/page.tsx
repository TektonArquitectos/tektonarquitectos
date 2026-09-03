import { Metadata } from "next";
import BlogPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Blog de Arquitectura y Construcción",
  description:
    "Consejos de construcción, tendencias en arquitectura, guías INFONAVIT y más. El blog de Tekton Arquitectos para ayudarte a construir mejor en Hidalgo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Construcción y Arquitectura | Tekton Arquitectos",
    description: "Consejos, tendencias y guías de construcción para proyectos en Hidalgo.",
    url: "https://tektonarquitectos.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", path: "/blog" }]} />
      <BlogPageClient />
    </>
  );
}
