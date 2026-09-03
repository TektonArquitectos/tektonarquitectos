const BASE_URL = "https://tektonarquitectos.com";

interface Crumb {
  name: string;
  path: string; // e.g. "/servicios"
}

/**
 * Inyecta datos estructurados BreadcrumbList (schema.org) para que
 * Google entienda la jerarquía de navegación de cada página y
 * pueda mostrar la ruta de migas de pan en los resultados de búsqueda.
 * Usar solo en Server Components (page.tsx).
 */
export default function BreadcrumbJsonLd({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      ...items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: `${BASE_URL}${c.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
