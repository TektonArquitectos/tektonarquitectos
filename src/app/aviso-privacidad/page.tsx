import { Metadata } from "next";
import AvisoPrivacidadPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Aviso de Privacidad — Tekton Arquitectos",
  description:
    "Aviso de privacidad de Tekton Arquitectos: cómo recabamos, usamos y protegemos tus datos personales conforme a la LFPDPPP en México.",
  alternates: { canonical: "/aviso-privacidad" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Aviso de Privacidad | Tekton Arquitectos",
    description: "Cómo Tekton Arquitectos recaba, usa y protege tus datos personales.",
    url: "https://tektonarquitectos.com/aviso-privacidad",
  },
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Aviso de Privacidad", path: "/aviso-privacidad" }]} />
      <AvisoPrivacidadPageClient />
    </>
  );
}
