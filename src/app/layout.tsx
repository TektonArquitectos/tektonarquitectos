import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const BASE_URL = "https://tektonarquitectos.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Tekton Arquitectos | Construcción de Calidad en Hidalgo",
    template: "%s | Tekton Arquitectos",
  },
  description:
    "Diseño y construcción residencial, comercial e industrial en Hidalgo. Más de 200 proyectos y 500 clientes satisfechos. Llámanos: 771 196 4068.",
  keywords: [
    "construcción Hidalgo",
    "arquitectos Pachuca",
    "construcción residencial Hidalgo",
    "obra civil Hidalgo",
    "Tekton Arquitectos",
    "casas Tezontepec de Aldama",
    "remodelación Hidalgo",
    "diseño de interiores Hidalgo",
    "crédito INFONAVIT Hidalgo",
  ],
  authors: [{ name: "Tekton Arquitectos", url: BASE_URL }],
  creator: "Tekton Arquitectos",
  publisher: "Tekton Arquitectos",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: BASE_URL,
    siteName: "Tekton Arquitectos",
    title: "Tekton Arquitectos | Construcción de Calidad en Hidalgo",
    description:
      "Diseño y construcción residencial, comercial e industrial en Hidalgo. Más de 200 proyectos entregados.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1424,
        height: 752,
        alt: "Tekton Arquitectos — Diseño y Construcción en Hidalgo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekton Arquitectos | Construcción en Hidalgo",
    description:
      "Diseño y construcción residencial, comercial e industrial en Hidalgo. +200 proyectos entregados.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    // Agrega aquí tu código de Google Search Console cuando lo tengas
    // google: "TU_CODIGO_AQUI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": BASE_URL,
  name: "Tekton Arquitectos, Diseño e Ingeniería",
  description:
    "Empresa de construcción y arquitectura en Hidalgo. Proyectos residenciales, comerciales, industriales y de obra pública.",
  url: BASE_URL,
  telephone: "+52-771-196-4068",
  email: "tekton.arquitectos.tekton@gmail.com",
  image: `${BASE_URL}/images/og-image.png`,
  logo: `${BASE_URL}/images/logo-full.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tezontepec de Aldama",
    addressLocality: "Hidalgo",
    addressCountry: "MX",
    addressRegion: "Hidalgo",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 20.1625734,
    longitude: -99.2618362,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/tektonarquitectos",
    "https://www.instagram.com/tekton_arquitectos",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Construcción",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño y Construcción de Casas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remodelación de Viviendas" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño de Interiores" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Asesoría de Créditos INFONAVIT" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Obra Civil e Industrial" } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700&family=Raleway:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bone text-carbon antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>
      </body>
    </html>
  );
}
