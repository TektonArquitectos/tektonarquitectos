"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

/**
 * Carga Google Analytics 4 (gtag.js) y envía un evento `page_view`
 * en cada cambio de ruta dentro del App Router (Next.js no recarga
 * la página en navegación interna, así que GA4 no lo detecta solo).
 *
 * Requiere la variable de entorno NEXT_PUBLIC_GA_MEASUREMENT_ID
 * (formato G-XXXXXXXXXX). Si no está configurada, el componente
 * no renderiza nada y el sitio funciona con normalidad.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") return;
    // El primer page_view ya lo envía la config inicial de gtag.
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            send_page_view: true,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
