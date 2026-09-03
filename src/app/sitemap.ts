import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tektonarquitectos.com";
  const now = new Date();
  return [
    { url: base,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/proyectos`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contacto`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/nosotros`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/precotizador`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/aviso-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terminos`,      lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
