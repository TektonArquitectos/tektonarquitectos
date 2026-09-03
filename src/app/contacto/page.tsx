import { Metadata } from "next";
import ContactoPageClient from "./PageClient";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contacto — Arquitectos en Tezontepec de Aldama, Hidalgo",
  description:
    "Contáctanos para tu proyecto de construcción en Hidalgo. WhatsApp: 771 196 4068. Visítanos en Tezontepec de Aldama, Hidalgo.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Tekton Arquitectos — Tezontepec de Aldama, Hidalgo",
    description: "WhatsApp: 771 196 4068. Visítanos en Tezontepec de Aldama, Hidalgo.",
    url: "https://tektonarquitectos.com/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contacto", path: "/contacto" }]} />
      <ContactoPageClient />
    </>
  );
}
