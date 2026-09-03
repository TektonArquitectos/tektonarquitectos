// ── Google Analytics 4 helper ──────────────────────────────────
// Centraliza el envío de eventos personalizados a GA4 (gtag.js).
// Métricas cubiertas por este archivo (ver README-SEO-ANALYTICS.md):
//   - whatsapp_click        → Clics a WhatsApp (todos los botones/enlaces)
//   - form_submit           → Envíos de formulario (contacto)
//   - precotizador_start    → % que inicia el pre-cotizador
//   - precotizador_complete → % que completa el pre-cotizador
//
// Tasa de rebote, tiempo en página, dispositivo y ubicación se
// obtienen automáticamente por GA4 (Enhanced Measurement) sin
// necesidad de código adicional; se explican en el README.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Envía un evento genérico a GA4 si gtag ya está cargado. */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/** Clic en cualquier botón/enlace de WhatsApp. `source` identifica el punto de contacto. */
export function trackWhatsAppClick(source: string, extra: Record<string, unknown> = {}) {
  trackEvent("whatsapp_click", { click_source: source, ...extra });
}

/** El usuario comienza el flujo del pre-cotizador (primera interacción real, paso 1 → 2). */
export function trackPrecotizadorStart(source: string) {
  trackEvent("precotizador_start", { start_source: source });
}

/** El usuario completa los 6 pasos del pre-cotizador y envía sus datos. */
export function trackPrecotizadorComplete(source: string, extra: Record<string, unknown> = {}) {
  trackEvent("precotizador_complete", { complete_source: source, ...extra });
}

/** Envío de un formulario de contacto/lead. */
export function trackFormSubmit(formName: string, extra: Record<string, unknown> = {}) {
  trackEvent("form_submit", { form_name: formName, ...extra });
}
