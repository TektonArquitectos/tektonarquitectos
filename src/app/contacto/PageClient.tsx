'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { trackFormSubmit, trackWhatsAppClick } from '@/lib/analytics';

const FB = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IG = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const TT = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>;
const WA = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

// Google Maps embed — no API key needed for basic embed
function GoogleMapEmbed() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-md" style={{ height: 260 }}>
      <iframe
        src="https://maps.google.com/maps?q=20.1625734,-99.2618362&t=m&z=17&output=embed&iwloc=near"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación Tekton Arquitectos — Tezontepec de Aldama, Hidalgo"
      />
      {/* Overlay badge */}
      <div className="absolute top-2 left-2 bg-white text-carbon text-[11px] font-display font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 pointer-events-none">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-green-arch">
          <path d="M8 1a5 5 0 00-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 00-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
        </svg>
        Tezontepec de Aldama, Hgo.
      </div>
    </div>
  );
}

const INFO_ITEMS = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-arch"><path d="M12 2a7 7 0 00-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/></svg>,
    label: 'Ubicación', val: 'Presas Tezontepec de Aldama, Hidalgo',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-arch"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
    label: 'Teléfono / WhatsApp', val: '771 196 4068',
    href: 'tel:+527711964068',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-arch"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
    label: 'Correo Electrónico', val: 'tekton.arquitectos.tekton@gmail.com',
    href: 'mailto:tekton.arquitectos.tekton@gmail.com',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-arch"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    label: 'Horario', val: 'Lun – Vie: 9:00–18:00 | Sáb: 9:00–14:00',
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-green-arch"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    label: 'Cobertura', val: 'Hidalgo · San Luis Potosí · Puebla',
  },
];

export default function ContactoPageClient() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ nombre:'', tel:'', tipo:'' });
  const [sent, setSent] = useState(false);
  const tipos = t.tipos as string[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hola Tekton! Soy ${form.nombre}. Tel: ${form.tel}. Me interesa: ${form.tipo}.`);
    window.open(`https://wa.me/527711964068?text=${msg}`, '_blank');
    trackFormSubmit('contacto_form', { interest_type: form.tipo });
    trackWhatsAppClick('contact_form_submit');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section className="bg-bone pt-28 sm:pt-36 pb-16 sm:pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <motion.div className="mb-10 sm:mb-14"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-carbon mb-3">{t.contacto.title}</h1>
          <div className="gold-divider w-16 mb-4" />
          <p className="text-titanium text-sm sm:text-base max-w-md">{t.contacto.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ── Form ── */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-green-cta/15 text-green-cta text-2xl flex items-center justify-center mx-auto mb-4">✓</div>
                  <h3 className="font-display font-bold text-lg text-carbon mb-2">¡Mensaje enviado!</h3>
                  <p className="text-titanium text-sm">WhatsApp abierto. Te contactamos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-display font-semibold text-sm text-carbon mb-1.5">{t.contacto.nombre} *</label>
                    <input required value={form.nombre} onChange={e=>setForm(f=>({...f,nombre:e.target.value}))}
                      placeholder="¿Cómo te llamas?"
                      className="w-full border border-bone bg-bone rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-cta transition-colors font-body" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-carbon mb-1.5">{t.contacto.tel} *</label>
                    <input required value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))}
                      placeholder="10 dígitos" type="tel"
                      className="w-full border border-bone bg-bone rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-cta transition-colors font-body" />
                  </div>
                  <div>
                    <label className="block font-display font-semibold text-sm text-carbon mb-1.5">{t.contacto.tipo} *</label>
                    <select required value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}
                      className="w-full border border-bone bg-bone rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-cta transition-colors font-body appearance-none">
                      <option value="">{t.contacto.tipoPlaceholder}</option>
                      {tipos.map((tp: string) => <option key={tp}>{tp}</option>)}
                    </select>
                  </div>
                  <button type="submit"
                    className="w-full bg-green-cta text-white font-display font-bold text-sm py-4 rounded-xl hover:bg-green-arch transition-colors">
                    {t.contacto.send}
                  </button>
                  <p className="text-xs text-titanium text-center">
                    <Link href="/aviso-privacidad" className="text-green-arch underline">{t.privacy}</Link>
                  </p>
                </form>
              )}

              {/* Direct WA */}
              <div className="mt-5 pt-5 border-t border-bone">
                <p className="text-xs text-titanium text-center mb-3">{t.contacto.or}</p>
                <a href="https://wa.me/527711964068" target="_blank" rel="noreferrer"
                  onClick={()=>trackWhatsAppClick('contacto_direct_button')}
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-display font-bold text-sm py-3.5 rounded-xl hover:bg-[#1da851] transition-colors">
                  <WA /> {t.contacto.waBtn}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* ── Info + Map ── */}
          <ScrollReveal direction="right">
            <h3 className="font-display font-bold text-xl text-carbon mb-5">{t.contacto.infoTitle}</h3>

            {/* Info items */}
            <div className="space-y-3.5 mb-6">
              {INFO_ITEMS.map(item => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-green-arch/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-xs text-carbon">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-titanium text-xs sm:text-sm mt-0.5 hover:text-green-arch transition-colors">
                        {item.val}
                      </a>
                    ) : (
                      <p className="text-titanium text-xs sm:text-sm mt-0.5">{item.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Google Maps ── */}
            <div className="mb-5">
              <p className="font-display font-semibold text-xs text-carbon mb-2 flex items-center gap-1.5">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-green-arch">
                  <path d="M8 1a5 5 0 00-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 00-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                </svg>
                Cómo llegar
              </p>
              <GoogleMapEmbed />
              <a href="https://www.google.com/maps/place/Tekton+Arquitectos,+Dise%C3%B1o+e+Ingenieria/@20.1627267,-99.2615695,335m/data=!3m1!1e3!4m14!1m7!3m6!1s0x85d3d59632ef89e7:0xa071f12ededd978f!2sTekton+Arquitectos,+Dise%C3%B1o+e+Ingenieria!8m2!3d20.1625734!4d-99.2618362!16s%2Fg%2F11h4g04smj!3m5!1s0x85d3d59632ef89e7:0xa071f12ededd978f!8m2!3d20.1625734!4d-99.2618362!16s%2Fg%2F11h4g04smj"
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-green-arch text-xs font-display font-semibold mt-2 hover:underline">
                Abrir en Google Maps →
              </a>
            </div>

            {/* Social */}
            <div className="pt-4 border-t border-bone">
              <p className="font-display font-semibold text-xs uppercase tracking-widest text-titanium mb-2.5">Redes Sociales</p>
              <div className="flex gap-2">
                {[
                  { href:'https://facebook.com', icon:<FB />, label:'Facebook', color:'hover:bg-[#1877f2]' },
                  { href:'https://www.instagram.com/tektonarquitectos?igsi=MWlmN2g0M3EwYWZuZg==', icon:<IG />, label:'Instagram', color:'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]' },
                  { href:'https://www.tiktok.com/@tekton.arquitecto', icon:<TT />, label:'TikTok', color:'hover:bg-carbon' },
                  { href:'https://wa.me/527711964068', icon:<WA />, label:'WhatsApp', color:'hover:bg-[#25D366]' },
                ].map(s=>(
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    onClick={()=>{ if (s.label === 'WhatsApp') trackWhatsAppClick('contacto_social_icons'); }}
                    className={`w-8 h-8 rounded-full border border-bone bg-white flex items-center justify-center text-titanium ${s.color} hover:text-white hover:border-transparent transition-all duration-200`}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Response badge */}
            <div className="mt-5 bg-green-cta/8 border border-green-cta/20 rounded-xl p-4 flex gap-3 items-start">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-green-cta flex-shrink-0 mt-0.5">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="font-display font-semibold text-green-arch text-sm">{t.contacto.fast}</p>
                <p className="text-titanium text-xs mt-0.5">{t.contacto.fastSub}</p>
              </div>
            </div>

            {/* Precot link */}
            <div className="mt-4 bg-bone rounded-xl p-4">
              <p className="font-display font-semibold text-sm text-carbon mb-1">{t.contacto.precotAlt}</p>
              <p className="text-titanium text-xs mb-3">{t.contacto.precotAltSub}</p>
              <Link href="/precotizador"
                className="inline-block bg-green-cta text-white font-display font-bold text-xs px-5 py-2 rounded-lg hover:bg-green-arch transition-colors">
                {t.contacto.usePrecot}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
