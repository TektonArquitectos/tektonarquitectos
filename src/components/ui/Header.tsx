'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const alwaysSolid = ['/contacto','/blog','/aviso-privacidad','/terminos'];
  useEffect(() => {
    if (alwaysSolid.includes(pathname)) { setSolid(true); return; }
    const fn = () => setSolid(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href:'/', label:t.nav.inicio },
    { href:'/proyectos', label:t.nav.proyectos },
    { href:'/servicios', label:t.nav.servicios },
    { href:'/nosotros', label:t.nav.nosotros },
    { href:'/contacto', label:t.nav.contacto },
  ];
  const isActive = (href: string) => href==='/' ? pathname==='/' : pathname.startsWith(href);

  return (
    <>
      <motion.header
        animate={{
          backgroundColor: solid ? 'rgba(245,245,240,0.97)' : 'rgba(0,0,0,0)',
          backdropFilter: solid ? 'blur(14px)' : 'blur(0px)',
          boxShadow: solid ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
          paddingTop: solid ? 10 : 18,
          paddingBottom: solid ? 10 : 18,
        }}
        transition={{ duration:0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/images/logo-icon.png" alt="Tekton Arquitectos" width={44} height={44}
              className="object-contain transition-all duration-300"
              style={{ height: solid?36:44, width:'auto' }} priority />
            <motion.span animate={{ opacity:solid?1:0, x:solid?0:-8 }} transition={{ duration:0.25 }}
              className={`font-display font-bold text-base tracking-tight hidden sm:block ${solid?'text-carbon':'text-white'}`}>
              TEKTON
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`relative font-body font-semibold text-[13px] uppercase tracking-widest px-3 py-2 rounded group transition-colors duration-200
                  ${solid?'text-carbon hover:text-green-arch':'text-white/90 hover:text-white'}`}>
                {label}
                <span className={`absolute bottom-1 left-3 right-3 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isActive(href)?'!scale-x-100':''}`} />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/precotizador"
              className="hidden md:inline-flex bg-green-cta text-white font-display font-semibold text-[12px] uppercase tracking-wide px-4 py-2 rounded hover:bg-green-arch transition-colors hover:shadow-lg hover:shadow-green-cta/30 whitespace-nowrap">
              {t.nav.cta}
            </Link>
            {/* Hamburger — only on mobile/tablet */}
            <button onClick={()=>setMobileOpen(true)} className="lg:hidden p-1.5 -mr-1" aria-label="Menú">
              {[0,1,2].map(i=>(
                <span key={i} className={`block w-[22px] h-[2px] mb-[5px] last:mb-0 rounded-full transition-colors ${solid?'bg-carbon':'bg-white'}`} />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{opacity:0,x:'100%'}} animate={{opacity:1,x:0}} exit={{opacity:0,x:'100%'}}
            transition={{type:'tween',duration:0.28}}
            className="fixed inset-0 z-[60] bg-bone flex flex-col">

            {/* Top bar — logo + close only */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-carbon/10">
              <Image src="/images/logo-icon.png" alt="Tekton" width={36} height={36} className="object-contain" />
              <button onClick={()=>setMobileOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-carbon/8 text-carbon text-xl leading-none" aria-label="Cerrar">
                ×
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center px-6 gap-0.5 overflow-y-auto">
              {navLinks.map(({href,label},i)=>(
                <motion.div key={href} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:i*0.055}}>
                  <Link href={href} onClick={()=>setMobileOpen(false)}
                    className={`block font-display font-bold text-2xl py-3 border-b border-carbon/8 transition-colors ${isActive(href)?'text-green-arch':'text-carbon hover:text-green-cta'}`}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="px-6 pb-10 pt-4">
              <Link href="/precotizador" onClick={()=>setMobileOpen(false)}
                className="block w-full text-center bg-green-cta text-white font-display font-bold text-base py-3.5 rounded-xl hover:bg-green-arch transition-colors">
                {t.nav.cta}
              </Link>
              <p className="text-center text-sm text-titanium mt-3">
                <a href="tel:+527711964068" className="hover:text-green-arch transition-colors">771 196 4068</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
