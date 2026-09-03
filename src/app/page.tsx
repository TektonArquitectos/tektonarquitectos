import { Metadata } from "next";
import HomePageClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Tekton Arquitectos | Construcción de Calidad en Hidalgo",
  description:
    "Empresa de arquitectura y construcción en Hidalgo. Diseño residencial, comercial e industrial. Más de 200 proyectos y 500 clientes satisfechos.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tekton Arquitectos | Construcción de Calidad en Hidalgo",
    description: "Diseño y construcción en Hidalgo. Residencial, comercial e industrial. +200 proyectos.",
    url: "https://tektonarquitectos.com",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
