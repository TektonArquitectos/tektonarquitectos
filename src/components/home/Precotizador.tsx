'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { PRECOT_TYPES } from '@/lib/data';
import { useSearchParams, usePathname } from 'next/navigation';
import { trackPrecotizadorStart, trackPrecotizadorComplete, trackWhatsAppClick } from '@/lib/analytics';

// ── Before/After hover card (desktop: hover reveals after; any device: selected stays on after) ──
function TypeCard({ item, selected, onClick }: {
  item: typeof PRECOT_TYPES[0];
  selected: boolean;
  onClick: () => void;
}) {
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  const pointerTypeRef = useRef<string>('mouse');
  const { t } = useLanguage();

  // Show "after" when card is selected OR when mouse is hovering (desktop only)
  const showAfter = selected || isMouseHovering;

  const handlePointerEnter = (e: React.PointerEvent) => {
    pointerTypeRef.current = e.pointerType;
    if (e.pointerType === 'mouse') setIsMouseHovering(true);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') setIsMouseHovering(false);
  };
  const handleClick = () => {
    onClick(); // parent handles selection toggle; showAfter reacts to `selected` prop
  };

  return (
    <motion.button
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      whileTap={{ scale: 0.97 }}
      className={`relative rounded-xl overflow-hidden cursor-pointer text-left border-2 transition-all duration-200 w-full
        ${selected ? 'border-green-cta shadow-md shadow-green-cta/15 scale-[1.02]' : 'border-transparent hover:border-green-cta/40'}`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-carbon" style={{ aspectRatio: '3/1.6' }}>
        <Image src={item.before} alt={item.label + " — antes de la construcción — Tekton Arquitectos"} fill className="object-cover" unoptimized loading="lazy" />
        <motion.div
          className="absolute inset-0"
          animate={{ clipPath: showAfter ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={item.after} alt={item.label + " — después de la construcción — Tekton Arquitectos"} fill className="object-cover" unoptimized loading="lazy" />
        </motion.div>
        {/* Before/After label */}
        <span className="absolute top-1.5 left-1.5 bg-black/50 text-white text-[10px] sm:text-xs font-display uppercase tracking-widest px-1.5 py-0.5 rounded">
          {showAfter ? t.precot.afterLabel : t.precot.beforeLabel}
        </span>
        {/* Selected check */}
        {selected && (
          <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-green-cta flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8l4 4 6-7" /></svg>
          </div>
        )}
      </div>
      {/* Label */}
      <div className={`px-3 py-2 transition-colors ${selected ? 'bg-green-cta/8' : 'bg-white'}`}>
        <p className="font-display font-bold text-sm sm:text-base text-carbon leading-tight">{item.label}</p>
        <p className="text-titanium text-xs mt-0.5">{item.sublabel}</p>
      </div>
    </motion.button>
  );
}

// ── Animated step wrapper ────────────────────────────────────
function Step({ active, children }: { active:boolean; children:React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
          transition={{ duration:0.24, ease:[0.22,1,0.36,1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const ESCALA = ['60–120 m²','120–250 m²','250–500 m²','+500 m²'];
const ESTILOS = [
  { label:'Contemporáneo', img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=60&auto=format' },
  { label:'Minimalista',   img:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=300&q=60&auto=format' },
  { label:'Industrial',   img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=60&auto=format' },
  { label:'Clásico',      img:'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&q=60&auto=format' },
  { label:'Biofílico',    img:'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=300&q=60&auto=format' },
  { label:'Moderno',      img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=60&auto=format' },
];

interface Answers { tipo:string; terreno:string; escala:string; estilos:string[]; inversion:string; }

export default function Precotizador({ initialTipo='' }: { initialTipo?:string }) {
  const { t } = useLanguage();
  const params = useSearchParams();
  const pathname = usePathname();
  const source = pathname === '/precotizador' ? 'precotizador_page' : 'home_section';
  const hasTrackedStart = useRef(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Answers>({ tipo:'', terreno:'', escala:'', estilos:[], inversion:'' });
  const [form, setForm] = useState({ nombre:'', tel:'', notas:'' });

  // % que inicia el pre-cotizador: primera vez que avanza del paso 1 al 2
  const goToStep = (n: number) => {
    if (!hasTrackedStart.current && n > 0) {
      hasTrackedStart.current = true;
      trackPrecotizadorStart(source);
    }
    setStep(n);
  };

  useEffect(() => {
    const urlTipo = params?.get('tipo') || initialTipo;
    if (urlTipo) setAnswers(a => ({ ...a, tipo: urlTipo }));
  }, [initialTipo, params]);

  const TOTAL_STEPS = 6;
  const progress = (step / (TOTAL_STEPS - 1)) * 100;

  const INV = [
    { label:t.precot.inv1, sub:t.precot.inv1s },
    { label:t.precot.inv2, sub:t.precot.inv2s },
    { label:t.precot.inv3, sub:t.precot.inv3s },
    { label:t.precot.inv4, sub:t.precot.inv4s },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tipoLabel: Record<string,string> = {
      residencial:'residencial', desarrollo:'un desarrollo inmobiliario',
      comercial:'comercial', industrial:'industrial', 'obra-publica':'de obra pública',
    };
    const terrenoTxt = answers.terreno === 'si' ? 'ya cuento con el terreno' : 'aún busco el terreno';
    const estilosTxt = answers.estilos.length ? ` con estilo ${answers.estilos.join(', ')}` : '';
    const notasTxt = form.notas ? ` Notas adicionales: ${form.notas}.` : '';
    const msgText = [
      `Hola! Soy ${form.nombre} 👋`,
      `Mi proyecto es *${tipoLabel[answers.tipo] ?? answers.tipo}*${estilosTxt},`,
      `en un espacio de *${answers.escala}*.`,
      answers.terreno ? `${terrenoTxt.charAt(0).toUpperCase() + terrenoTxt.slice(1)}.` : '',
      answers.inversion ? `Mi presupuesto es de *${answers.inversion}*.` : '',
      notasTxt,
      `Mi WhatsApp / teléfono: ${form.tel}.`,
      `¡Quisiera agendar una consulta! 🏗️`,
    ].filter(Boolean).join(' ');
    const msg = encodeURIComponent(msgText);
    setTimeout(() => {
      window.open(`https://wa.me/527711964068?text=${msg}`, '_blank');
      trackPrecotizadorComplete(source, { project_type: answers.tipo, scale: answers.escala, investment: answers.inversion });
      trackWhatsAppClick('precotizador_complete');
      setDone(true);
    }, 400);
  };

  if (done) return (
    <motion.div className="text-center py-8 sm:py-12 px-4" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
      <div className="w-14 h-14 rounded-full bg-green-cta/15 text-green-cta text-2xl flex items-center justify-center mx-auto mb-4">✓</div>
      <h3 className="font-display font-bold text-lg sm:text-xl text-carbon mb-2">{t.precot.successTitle}</h3>
      <p className="text-titanium text-sm mb-6 max-w-xs mx-auto">{t.precot.successSub}</p>
      <a href="/proyectos" className="inline-block bg-green-cta text-white font-display font-bold text-sm px-6 py-3 rounded-lg hover:bg-green-arch transition-colors">
        {t.precot.seeProjects}
      </a>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-bone">
        <motion.div className="h-full bg-gradient-to-r from-green-cta to-green-arch"
          animate={{ width:`${progress}%` }} transition={{ duration:0.35 }} />
      </div>

      {/* Content — compact padding on mobile */}
      <div className="p-4 sm:p-7">
        {/* Step counter + back button */}
        <div className="flex items-center justify-between mb-4">
          {step > 0 ? (
            <button onClick={() => setStep(s => s-1)}
              className="text-titanium text-xs sm:text-sm flex items-center gap-1 hover:text-carbon transition-colors">
              ← Atrás
            </button>
          ) : <span />}
          <span className="font-accent text-xs text-titanium tracking-widest">{step+1} de {TOTAL_STEPS}</span>
        </div>

        {/* STEP 0 — tipo de proyecto with before/after */}
        <Step active={step===0}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step1title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step1sub}</p>
          {/* Mobile: 1 col (grande y legible), Desktop: 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {PRECOT_TYPES.map(item => (
              <TypeCard key={item.id} item={item}
                selected={answers.tipo===item.id}
                onClick={() => setAnswers(a => ({...a, tipo:item.id}))}
              />
            ))}
          </div>
          <button disabled={!answers.tipo} onClick={() => goToStep(1)}
            className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Siguiente →
          </button>
        </Step>

        {/* STEP 1 — terreno */}
        <Step active={step===1}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step2title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step2sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            {[
              { id:'si', label:t.precot.terreno1t, sub:t.precot.terreno1s,
                img:'https://images.unsplash.com/photo-1652049195461-83ba888a9cc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHRlcnJlbm8lMjB2YWxkaW8lMjBlbiUyMGNhbGxlfGVufDB8fDB8fHww' },
              { id:'no', label:t.precot.terreno2t, sub:t.precot.terreno2s,
                img:'https://plus.unsplash.com/premium_photo-1776740302782-20e614dee6ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHRlcnJlbm8lMjB2YWxkaW8lMjBlbiUyMGNhbGxlfGVufDB8fDB8fHww' },
            ].map(opt => (
              <button key={opt.id} onClick={() => setAnswers(a => ({...a, terreno:opt.id}))}
                className={`relative rounded-xl overflow-hidden border-2 text-left transition-all
                  ${answers.terreno===opt.id ? 'border-green-cta shadow-md' : 'border-bone hover:border-green-cta/40'}`}>
                <div className="relative overflow-hidden" style={{ height:80 }}>
                  <Image src={opt.img} alt={opt.label} fill className="object-cover" unoptimized loading="lazy" />
                  <div className="absolute inset-0 bg-black/30" />
                  <p className="absolute bottom-2 left-2.5 font-display font-bold text-white text-sm">{opt.label}</p>
                  {answers.terreno===opt.id && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-cta flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8l4 4 6-7"/></svg>
                    </div>
                  )}
                </div>
                <p className="px-2.5 py-1.5 text-titanium text-xs bg-white">{opt.sub}</p>
              </button>
            ))}
          </div>
          <button disabled={!answers.terreno} onClick={() => setStep(2)}
            className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Siguiente →
          </button>
        </Step>

        {/* STEP 2 — escala */}
        <Step active={step===2}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step3title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step3sub}</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {ESCALA.map(e => (
              <button key={e} onClick={() => setAnswers(a => ({...a, escala:e}))}
                className={`border-2 rounded-xl py-3 px-2 text-center transition-all font-display font-bold text-sm
                  ${answers.escala===e ? 'border-green-cta bg-green-cta/6 text-green-arch' : 'border-bone text-carbon hover:border-green-cta/40'}`}>
                {e}
              </button>
            ))}
          </div>
          <button disabled={!answers.escala} onClick={() => setStep(3)}
            className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Siguiente →
          </button>
        </Step>

        {/* STEP 3 — estilo */}
        <Step active={step===3}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step4title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step4sub}</p>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-4">
            {ESTILOS.map(e => {
              const sel = answers.estilos.includes(e.label);
              return (
                <button key={e.label}
                  onClick={() => setAnswers(a => ({
                    ...a,
                    estilos: sel ? a.estilos.filter(x => x!==e.label) : (a.estilos.length<3 ? [...a.estilos, e.label] : a.estilos)
                  }))}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all ${sel ? 'border-green-cta' : 'border-transparent hover:border-green-cta/30'}`}
                  style={{ aspectRatio:'1' }}
                >
                  <Image src={e.img} alt={e.label} fill className="object-cover" unoptimized loading="lazy" />
                  <div className={`absolute inset-0 transition-opacity ${sel ? 'opacity-0' : 'bg-black/15'}`} />
                  {sel && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-cta flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8l4 4 6-7"/></svg>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] sm:text-xs font-display font-semibold px-1.5 py-1 text-center truncate">{e.label}</p>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(4)}
            className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors">
            Siguiente →
          </button>
        </Step>

        {/* STEP 4 — inversión */}
        <Step active={step===4}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step5title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step5sub}</p>
          <div className="flex flex-col gap-2 mb-4">
            {INV.map(opt => (
              <button key={opt.label} onClick={() => setAnswers(a => ({...a, inversion:opt.label}))}
                className={`flex items-center gap-3 border-2 rounded-xl p-3 text-left transition-all
                  ${answers.inversion===opt.label ? 'border-green-cta bg-green-cta/6' : 'border-bone hover:border-green-cta/40'}`}>
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                  ${answers.inversion===opt.label ? 'border-green-cta bg-green-cta' : 'border-gray-300'}`}>
                  {answers.inversion===opt.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="font-display font-bold text-xs sm:text-sm text-carbon">{opt.label}</p>
                  <p className="text-titanium text-[10px] sm:text-xs mt-0.5">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
          <button disabled={!answers.inversion} onClick={() => setStep(5)}
            className="w-full bg-green-cta text-white font-display font-bold text-sm py-3 rounded-xl hover:bg-green-arch transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Ver Resumen →
          </button>
        </Step>

        {/* STEP 5 — contacto */}
        <Step active={step===5}>
          <h3 className="font-display font-bold text-base sm:text-xl text-carbon mb-0.5">{t.precot.step6title}</h3>
          <p className="text-titanium text-xs sm:text-sm mb-3">{t.precot.step6sub}</p>

          {/* Summary */}
          <div className="bg-bone rounded-xl p-3 mb-4 text-xs space-y-1.5">
            {[
              ['🏗️', 'Tipo',       answers.tipo || '—'],
              ['📐', 'Escala',     answers.escala || '—'],
              ['💰', 'Inversión',  answers.inversion || '—'],
            ].map(([icon,key,val]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-sm flex-shrink-0">{icon}</span>
                <div className="flex gap-1.5 items-baseline">
                  <p className="text-titanium text-[11px] uppercase tracking-wide">{key}:</p>
                  <p className="font-display font-semibold text-carbon text-xs">{val}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <input required value={form.nombre} onChange={e=>setForm(f=>({...f,nombre:e.target.value}))}
              placeholder={`${t.precot.nombre} *`}
              className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta transition-colors font-body" />
            <input required value={form.tel} onChange={e=>setForm(f=>({...f,tel:e.target.value}))}
              placeholder={`${t.precot.tel} *`} type="tel"
              className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta transition-colors font-body" />
            <textarea value={form.notas} onChange={e=>setForm(f=>({...f,notas:e.target.value}))}
              placeholder={t.precot.notasPlaceholder} rows={2}
              className="w-full border border-bone bg-bone rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-cta transition-colors font-body resize-none" />
            <p className="text-xs text-titanium">
              {t.precot.privacy}{' '}
              <a href="/aviso-privacidad" className="text-green-arch underline">{t.privacy}</a>
            </p>
            <button type="submit"
              className="w-full bg-green-cta text-white font-display font-bold text-sm py-3.5 rounded-xl hover:bg-green-arch transition-colors">
              {t.precot.send}
            </button>
          </form>
        </Step>
      </div>
    </div>
  );
}
