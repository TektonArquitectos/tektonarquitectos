'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/lib/translations';

export type Lang = 'es' | 'en';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type T = any;

interface LangCtx {
  lang: Lang;
  t: T;
}

const LanguageContext = createContext<LangCtx>({
  lang: 'es',
  t: translations.es,
});

/**
 * Detecta el idioma del navegador y muestra el sitio automáticamente
 * en ese idioma (ya no hay botón manual). Español es el idioma por
 * defecto para cualquier idioma que no sea inglés.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    try {
      const browserLangs = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];
      const isEnglish = browserLangs.some(l => l.toLowerCase().startsWith('en'));
      setLangState(isEnglish ? 'en' : 'es');
    } catch {
      setLangState('es');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
