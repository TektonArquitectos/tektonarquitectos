'use client';
import Link from 'next/link';

function LegalLayout({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <section className="bg-bone pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-carbon mb-2">{title}</h1>
        <p className="text-titanium text-xs mb-8">Última actualización: Mayo 2026</p>
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm space-y-0">
          {children}
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

function Section({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <div className="py-4 border-b border-bone last:border-0">
      <h3 className="font-display font-bold text-base sm:text-lg text-green-arch mb-2">{title}</h3>
      <div className="text-titanium text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function AvisoPrivacidadPageClient() {
  return (
    <LegalLayout title="Aviso de Privacidad">
      <Section title="Responsable del Tratamiento">
        <p><strong className="text-carbon">Tekton Arquitectos Diseño e Ingeniería S.A. de C.V.</strong>, con domicilio en Presas Tezontepec de Aldama, Hidalgo, México, es responsable del uso y protección de sus datos personales conforme a la LFPDPPP.</p>
      </Section>
      <Section title="Datos que Recabamos">
        <ul className="space-y-1 list-disc list-inside">
          <li>Nombre completo</li><li>Número de teléfono o WhatsApp</li>
          <li>Correo electrónico (opcional)</li><li>Información sobre el proyecto de construcción</li>
        </ul>
      </Section>
      <Section title="Finalidades">
        <p><strong className="text-carbon">Primarias:</strong> Brindar atención a solicitudes de consulta, elaborar cotizaciones, gestionar la relación contractual.</p>
        <p><strong className="text-carbon">Secundarias:</strong> Envío de boletines informativos (puede oponerse escribiendo a tekton.arquitectos.tekton@gmail.com).</p>
      </Section>
      <Section title="Transferencia de Datos">
        <p>Sus datos podrán compartirse con Bacru Inmobiliaria para soluciones integrales. No realizamos ninguna otra transferencia sin su consentimiento.</p>
      </Section>
      <Section title="Derechos ARCO">
        <p>Puede Acceder, Rectificar, Cancelar u Oponerse al tratamiento enviando un correo a <strong className="text-carbon">tekton.arquitectos.tekton@gmail.com</strong> con el asunto "Derechos ARCO". Respuesta en 20 días hábiles.</p>
      </Section>
      <Section title="Contacto">
        <p>📧 tekton.arquitectos.tekton@gmail.com · 📞 771 196 4068</p>
      </Section>
    </LegalLayout>
  );
}
