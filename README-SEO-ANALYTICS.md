# SEO y Analítica — Tekton Arquitectos

Resumen de lo que se revisó, lo que ya existía y lo que se agregó.

## ✅ 1. Titles y Meta Descriptions

Cada página principal tiene un `title` único con palabra clave y una
`description` que invita al clic. Se corrigió `/contacto`, que excedía
el límite de 155 caracteres.

| Página | Title (chars) | Description (chars) |
|---|---|---|
| `/` | 55 | 143 |
| `/servicios` | 51 | 152 |
| `/proyectos` | 36 | 147 |
| `/contacto` | 55 | 124 ✏️ corregido |
| `/nosotros` | 38 | 125 |
| `/precotizador` | 46 | 131 |
| `/blog` | 35 | 150 |
| `/terminos` | 43 ✏️ nuevo | 105 ✏️ nuevo |
| `/aviso-privacidad` | 40 ✏️ nuevo | 132 ✏️ nuevo |

`/terminos` y `/aviso-privacidad` **no tenían metadata** porque eran
Client Components directos (`'use client'` en `page.tsx`, y Next.js no
permite `export const metadata` ahí). Se refactorizaron al mismo patrón
que el resto del sitio: `PageClient.tsx` (contenido) + `page.tsx`
(Server Component con metadata y canonical).

## ✅ 2. Encabezados H1/H2/H3

Cada página tiene un único `<h1>` en el hero, y las secciones internas
usan `<h2>`/`<h3>`/`<h4>` de forma jerárquica y con palabras clave
naturales (ej. "Servicios de Construcción en Hidalgo", "Proyectos
Residenciales", etc.). No se detectaron duplicados de `<h1>` en el
contenido visible.

## ✅ 3. URLs amigables

Ya eran limpias y descriptivas en español: `/servicios`, `/proyectos`,
`/contacto`, `/nosotros`, `/precotizador`, `/blog`, `/terminos`,
`/aviso-privacidad`. Sin parámetros ni IDs técnicos.

## ✅ 4. SEO técnico

- **`sitemap.xml`** (`src/app/sitemap.ts`): ya existía; se agregaron
  `/aviso-privacidad` y `/terminos`, que faltaban.
- **`robots.txt`** (`src/app/robots.ts`): ya existía y apunta al sitemap.
- **Datos estructurados JSON-LD**:
  - `LocalBusiness` global en `layout.tsx` (ya existía): nombre,
    dirección, teléfono, horarios, catálogo de servicios, redes sociales.
  - **Nuevo**: `BreadcrumbList` en cada página interna
    (`src/components/seo/BreadcrumbJsonLd.tsx`) para que Google entienda
    la jerarquía de navegación y pueda mostrar migas de pan en resultados.

## ✅ 5. Analítica — Google Analytics 4

**No existía ninguna integración de analítica.** Se agregó desde cero:

- `src/components/analytics/GoogleAnalytics.tsx`: carga `gtag.js` y
  envía `page_view` en cada navegación interna (Next.js App Router no
  recarga la página, así que GA4 no lo detecta por sí solo).
- `src/lib/analytics.ts`: funciones centralizadas para disparar eventos
  personalizados.

### ⚠️ Acción requerida antes de publicar

1. Crea una propiedad **GA4** en https://analytics.google.com
2. Copia tu **ID de medición** (formato `G-XXXXXXXXXX`)
3. Renombra `.env.example` a `.env.local` y pega el ID ahí
4. En producción (Vercel u otro hosting), agrega la variable de entorno
   `NEXT_PUBLIC_GA_MEASUREMENT_ID` con el mismo valor

Sin esta variable, el sitio funciona normalmente pero **no se envían
datos a GA4**.

### Métricas clave — cómo se cubre cada una

| Métrica solicitada | Cómo se obtiene |
|---|---|
| **Tasa de rebote en inicio** | Automática vía GA4 (Enhanced Measurement / engagement rate). No requiere código. Revísala en GA4 → Informes → Interacción → Páginas y pantallas, filtrando por `/`. |
| **% que inicia el pre-cotizador** | Evento personalizado `precotizador_start`, disparado la primera vez que el usuario avanza del paso 1 al 2 (selecciona tipo de proyecto y da clic en "Siguiente"). Incluye parámetro `start_source` (`home_section` o `precotizador_page`) para saber desde dónde entró. |
| **% que lo completa** | Evento `precotizador_complete`, disparado al terminar los 6 pasos y enviar el mensaje por WhatsApp. Incluye `complete_source`, `project_type`, `scale`, `investment`. Divide `precotizador_complete` ÷ `precotizador_start` en GA4 (Exploración) para el % de finalización. |
| **Clics a WhatsApp** | Evento `whatsapp_click` en **todos** los puntos de contacto: botón flotante, footer (ícono y botón), sección CTA de la home, botón directo y redes sociales de `/contacto`, envío del formulario de contacto, y finalización del pre-cotizador. Cada uno trae `click_source` para distinguir el origen. |
| **Envíos de formulario** | Evento `form_submit` en el formulario de `/contacto`, con `form_name: "contacto_form"` e `interest_type` (tipo de proyecto seleccionado). |
| **Tiempo en página** | Automático vía GA4 (`engagement_time_msec` / tiempo medio de interacción por página). |
| **Dispositivo y ubicación** | Automático vía GA4 (Informes → Tecnología / Usuarios → Datos demográficos). GA4 detecta dispositivo, navegador y ubicación geográfica sin configuración adicional. |

### Eventos personalizados — referencia rápida

```
whatsapp_click        { click_source }
form_submit           { form_name, interest_type }
precotizador_start    { start_source }
precotizador_complete { complete_source, project_type, scale, investment }
```

Puedes crear **conversiones** en GA4 marcando `form_submit`,
`whatsapp_click` y `precotizador_complete` como eventos de conversión
(GA4 → Administrar → Eventos → marcar como conversión clave).

## Notas adicionales

- Se creó `.gitignore` (no existía) para evitar subir `node_modules`,
  `.next` y archivos `.env*.local` al repositorio.
- `npm run build` se ejecutó sin errores tras todos los cambios
  (14/14 páginas generadas correctamente).
- **Se actualizó Next.js de `14.2.3` a `14.2.35`**, la última versión
  parcheada de la línea 14.x, que corrige varias vulnerabilidades de
  seguridad reportadas en diciembre de 2025 (RSC / App Router). Se
  verificó que el proyecto sigue compilando sin errores tras la
  actualización.
