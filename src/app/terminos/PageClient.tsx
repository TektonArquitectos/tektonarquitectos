'use client';
import Link from 'next/link';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-bone last:border-0">
      <h3 className="font-display font-bold text-base sm:text-lg text-green-arch mb-2">{title}</h3>
      <div className="text-titanium text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function TerminosPageClient() {
  return (
    <section className="bg-bone pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-carbon mb-2">Términos y Condiciones</h1>
        <p className="text-titanium text-xs mb-8">Última actualización: Mayo 2026</p>
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm">
          <Section title="1. Aceptación">
            <p>Al acceder y utilizar el sitio web de Tekton Arquitectos Diseño e Ingeniería S.A. de C.V., usted acepta los presentes términos y condiciones en su totalidad.</p>
          </Section>
          <Section title="2. Servicios">
            <p>La información contenida en este sitio tiene carácter informativo. Los presupuestos y cotizaciones son orientativos y requieren una evaluación técnica formal para ser vinculantes.</p>
          </Section>
          <Section title="3. Propiedad Intelectual">
            <p>Todo el contenido (textos, imágenes, logotipos, diseños) es propiedad exclusiva de Tekton Arquitectos o de sus licenciantes. Queda prohibida su reproducción sin autorización escrita.</p>
          </Section>
          <Section title="4. Responsabilidad">
            <p>Tekton Arquitectos no se hace responsable de errores u omisiones en el contenido del sitio, ni de decisiones tomadas con base exclusiva en la información publicada.</p>
          </Section>
          <Section title="5. Privacidad">
            <p>El tratamiento de datos personales se rige por nuestro{' '}
              <Link href="/aviso-privacidad" className="text-green-arch underline hover:text-green-cta">Aviso de Privacidad</Link>.
            </p>
          </Section>
          <Section title="6. Ley Aplicable">
            <p>Los presentes términos se rigen por la legislación mexicana. Cualquier controversia se someterá a los tribunales competentes de Hidalgo, México, con renuncia a cualquier otro fuero.</p>
          </Section>
          <Section title="7. Contacto">
            <p>📧 tekton.arquitectos.tekton@gmail.com · 📞 771 196 4068</p>
          </Section>
        </div>
        <div className="mt-8">
          <Link href="/" className="inline-flex items-center border border-gold text-carbon font-display font-semibold text-sm px-5 py-2.5 rounded hover:bg-gold/10 transition-colors gap-2">
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
