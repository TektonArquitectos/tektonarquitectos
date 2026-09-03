// ─── PROJECT DATA ─────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  area: string;
  category: 'residencial' | 'comercial' | 'industrial' | 'obra-publica' | 'otros';
  description: string;
  images: string[];
  badge: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Construcción Residencial Tezontepec',
    location: 'Tezontepec de Aldama, Hidalgo',
    year: '2025',
    area: '180 m²',
    category: 'residencial',
    description: 'Casa habitación de dos plantas con acabados de primera, diseño contemporáneo y eficiencia energética. Proyecto entregado en tiempo y forma con total transparencia en el proceso.',
    images: ['/images/proyectos/p1.webp', '/images/proyectos/p2.webp', '/images/proyectos/p3.webp'],
    badge: 'Residencial',
  },
  {
    id: 'p2',
    title: 'Desarrollo de Infraestructura Urbana',
    location: 'Pachuca, Hidalgo',
    year: '2024',
    area: '1,200 m²',
    category: 'obra-publica',
    description: 'Obra de infraestructura urbana con pavimentación hidráulica de alta resistencia. Proyecto ejecutado con los más altos estándares de calidad y seguridad, cumpliendo plazos y presupuesto establecidos.',
    images: ['/images/proyectos/p4.webp', '/images/proyectos/p5.webp', '/images/proyectos/p6.webp'],
    badge: 'Obra Pública',
  },
  {
    id: 'p3',
    title: 'Acabados y Remodelación Integral',
    location: 'Hidalgo',
    year: '2025',
    area: '240 m²',
    category: 'residencial',
    description: 'Remodelación integral de espacio residencial con aplicación de acabados premium, pisos, aplanados y pintura. Transformación completa del espacio en tiempo récord con resultados que superan expectativas.',
    images: ['/images/proyectos/p7.webp', '/images/proyectos/p8.webp', '/images/proyectos/p9.webp'],
    badge: 'Residencial',
  },
  {
    id: 'p4',
    title: 'Obra Civil Especializada',
    location: 'Hidalgo',
    year: '2024',
    area: '850 m²',
    category: 'comercial',
    description: 'Proyecto de obra civil con estructura metálica y concreto armado, diseñado para uso comercial de alta demanda. Construcción robusta y duradera entregada con garantía por escrito.',
    images: ['/images/proyectos/p10.webp', '/images/proyectos/p11.webp', '/images/proyectos/p12.webp'],
    badge: 'Comercial',
  },
  {
    id: 'p5',
    title: 'Cubierta Industrial de Gran Luz',
    location: 'Hidalgo',
    year: '2024',
    area: '600 m²',
    category: 'industrial',
    description: 'Cubierta metálica de gran luz para uso industrial con sistema de captación de agua pluvial y acabados resistentes a la intemperie. Diseño estructural optimizado para máxima eficiencia.',
    images: ['/images/proyectos/p13.webp', '/images/proyectos/p14.webp', '/images/proyectos/p15.webp'],
    badge: 'Industrial',
  },
  {
    id: 'p6',
    title: 'Lienzo Charro Tehado',
    location: 'Hidalgo',
    year: '2025',
    area: '3,500 m²',
    category: 'obra-publica',
    description: 'Diseño y construcción de lienzo charro con capacidad para cientos de espectadores. Arquitectura que honra la tradición mexicana con materiales contemporáneos, arcos de mampostería y cubierta metálica curva de gran espectacularidad.',
    images: ['/images/proyectos/p21.webp'],
    badge: 'Obra Pública',
  },
  {
    id: 'p7',
    title: 'Residencia Contemporánea Tekton',
    location: 'Hidalgo',
    year: '2024',
    area: '420 m²',
    category: 'residencial',
    description: 'Residencia de lujo con materiales de autor: concreto aparente, madera natural y grandes ventanales. Diseño bioclimático que integra espacios interiores y exteriores con alberca de borde, jardines curados y estacionamiento techado.',
    images: ['/images/proyectos/p19.webp', '/images/proyectos/p20.webp'],
    badge: 'Residencial',
  },
  {
    id: 'p8',
    title: 'Casa de Jubilados',
    location: 'Pachuca, Hidalgo',
    year: '2025',
    area: '1,800 m²',
    category: 'obra-publica',
    description: 'Centro de atención y esparcimiento para adultos mayores con diseño accesible, jardines terapéuticos e iluminación cálida. Proyecto de impacto social que combina funcionalidad y dignidad arquitectónica para la tercera edad.',
    images: ['/images/proyectos/p22.webp'],
    badge: 'Obra Pública',
  },
  {
    id: 'p9',
    title: 'Casa de Campo con Acabados en Piedra',
    location: 'Hidalgo',
    year: '2023',
    area: '280 m²',
    category: 'residencial',
    description: 'Residencia de campo con fachada de piedra natural y cantera local. Iluminación arquitectónica de diseño, jardines tropicales, acceso privado y acabados de primera que fusionan la rusticidad de los materiales con el confort moderno.',
    images: ['/images/proyectos/p23.webp'],
    badge: 'Residencial',
  },
  {
    id: 'p-otros-1',
    title: 'Proyecto de Referencia I',
    location: 'Hidalgo',
    year: '2023',
    area: '—',
    category: 'otros',
    description: 'Proyecto de referencia que muestra la versatilidad y alcance de Tekton Arquitectos en diferentes tipologías de obra y acabados especializados.',
    images: ['/images/proyectos/p16.webp'],
    badge: 'Referencia',
  },
  {
    id: 'p-otros-2',
    title: 'Proyecto de Referencia II',
    location: 'Hidalgo',
    year: '2023',
    area: '—',
    category: 'otros',
    description: 'Proyecto de referencia adicional que ilustra la capacidad técnica y estética del equipo de Tekton Arquitectos en obras de distintas escalas.',
    images: ['/images/proyectos/p17.webp'],
    badge: 'Referencia',
  },
  {
    id: 'p-otros-3',
    title: 'Proyecto de Referencia III',
    location: 'Hidalgo',
    year: '2022',
    area: '—',
    category: 'otros',
    description: 'Proyecto de referencia que demuestra la experiencia acumulada del despacho en distintos tipos de construcción, acabados y soluciones arquitectónicas.',
    images: ['/images/proyectos/p18.webp'],
    badge: 'Referencia',
  },
];

// ─── PROCESS STEPS ────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Consulta Inicial',
    desc: 'Escuchamos tus ideas, necesidades y presupuesto. Resolvemos todas tus dudas sin compromiso, en persona o por videollamada.',
    img: '/images/proceso/consulta.webp',
    icon: '💬',
  },
  {
    num: '02',
    title: 'Diseño y Planificación',
    desc: 'Creamos planos arquitectónicos y renders 3D fotorrealistas para que visualices tu proyecto antes de construir el primer ladrillo.',
    img: '/images/proceso/diseno.webp',
    icon: '📐',
  },
  {
    num: '03',
    title: 'Presupuesto Transparente',
    desc: 'Desglose claro de costos, materiales y tiempos. Sin sorpresas ocultas, sin sobrecostos injustificados.',
    img: '/images/proceso/presupuesto.webp',
    icon: '📋',
  },
  {
    num: '04',
    title: 'Construcción con Calidad',
    desc: 'Ejecutamos con los más altos estándares y te enviamos reportes de avance en tiempo real.',
    img: '/images/proceso/construccion.webp',
    icon: '🏗️',
  },
  {
    num: '05',
    title: 'Entrega y Garantía',
    desc: 'Recibes tu espacio terminado con garantía por escrito y seguimiento post-entrega.',
    img: '/images/proceso/entrega.webp',
    icon: '🏠',
  },
];

// ─── PRE-COTIZADOR OPTIONS ─────────────────────────────────────
export const PRECOT_TYPES = [
  {
    id: 'residencial',
    label: 'Hogar Personalizado',
    sublabel: 'Casa habitación a tu medida',
    before: 'https://images.unsplash.com/photo-1610079732357-0d20c1a98ceb?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    after:  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  },
  {
    id: 'desarrollo',
    label: 'Desarrollo Inmobiliario',
    sublabel: 'Fraccionamiento o condominios',
    before: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    after:  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 'comercial',
    label: 'Local Comercial',
    sublabel: 'Tienda, restaurante u oficinas',
    before: 'https://plus.unsplash.com/premium_photo-1678132565698-7bedf56c76c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbnN0cnVjY2lvbiUyMGxvY2FsfGVufDB8fDB8fHww',
    after:  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
  },
  {
    id: 'industrial',
    label: 'Nave Industrial',
    sublabel: 'Bodega, planta o instalación',
    before: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    after:  'https://media.istockphoto.com/id/2163336180/es/foto/edificio-de-oficinas-de-comercio-industrial.webp?a=1&b=1&s=612x612&w=0&k=20&c=nT6WZIoHX9d51hlLVmaOXZjyf3PGGCMvUDcQ56mG6uE=',
  },
  {
    id: 'obra-publica',
    label: 'Obra Pública',
    sublabel: 'Gobierno, escuela u hospital',
    before: '/images/proceso/construccion.webp',
    after:  '/images/proyectos/p4.webp',
  },
];

export const WA_NUMBER = '527711964068';
export const WA_BASE = `https://wa.me/${WA_NUMBER}`;

// ─── BLOG SEED DATA (usado solo para poblar la base de datos la primera vez) ───
export interface BlogPostSeed {
  id: string;
  title: string;
  body: string;
  full: string;
  image: string;
  tag: string;
  read: string;
  date: string;
}

export const BLOG_SEED: BlogPostSeed[] = [
  {
    id: 'materiales-correctos-casa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=75&auto=format&fit=crop',
    date: 'Mayo 2026', read: '6 min', tag: 'Materiales',
    title: 'Cómo Elegir los Materiales Correctos para tu Casa',
    body: 'Desde el tipo de varilla hasta el acabado de los muros, cada material impacta en la calidad y durabilidad.',
    full: `Elegir los materiales correctos es una de las decisiones más críticas en cualquier proyecto de construcción. Un error en esta etapa puede traducirse en sobrecostos, problemas estructurales o mantenimientos constantes que erosionan la inversión.

**Estructura y cimentación**
El acero de refuerzo (varilla) debe cumplir con la norma NMX-B-294. Pide siempre certificados de calidad al proveedor. Para el concreto, un f'c de 250 kg/cm² es el mínimo recomendado en vivienda; para zonas sísmicas, consulta con tu ingeniero estructural.

**Mampostería y muros**
El block de cemento 15×20×40 cm es la elección más común en Hidalgo por su relación costo-resistencia. Los muros de tabique rojo recocido ofrecen mayor inercia térmica, lo que reduce el consumo de aires acondicionados.

**Impermeabilización**
Es el rubro donde más se escatima y más caro termina siendo el error. Invertir el 3-5% del presupuesto total en una impermeabilización de alta gama (sistemas acrílicos con manto bituminoso) ahorra decenas de miles en filtraciones futuras.

**Acabados**
Los pisos porcelánicos de alto tráfico (≥ PEI 4) son ideales para áreas comunes. Para cocina y baños, prioriza materiales con bajo índice de absorción de agua (<0.5%).

En Tekton Arquitectos trabajamos únicamente con proveedores certificados. Contáctanos para una asesoría gratuita sobre materiales para tu proyecto.`,
  },
  {
    id: 'errores-sobrecosto-construccion',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=75&auto=format&fit=crop',
    date: 'Abril 2026', read: '8 min', tag: 'Presupuesto',
    title: '7 Errores que Disparan el Costo de tu Construcción',
    body: 'Los sobrecostos no son inevitables. Conoce los 7 errores más comunes y cómo evitarlos.',
    full: `Más del 60% de los proyectos de construcción en México termina con un sobrecosto de entre 20% y 40% respecto al presupuesto inicial. Aquí los 7 errores más frecuentes y cómo evitarlos:

**1. No contar con un proyecto ejecutivo completo**
Construir con planos incompletos es la causa número uno de sobrecostos. Los cambios durante la obra son hasta 10 veces más caros que haberlos definido en papel.

**2. No incluir imprevistos en el presupuesto**
Reserva siempre entre el 10% y el 15% del presupuesto total para contingencias. No es pesimismo, es buena planeación.

**3. Cambiar especificaciones a mitad de la obra**
Cada cambio tiene un costo directo (material y mano de obra) y un costo indirecto (tiempo detenido). Define todo antes de poner el primer ladrillo.

**4. No solicitar cotizaciones comparativas**
Obtén mínimo 3 propuestas de diferentes contratistas. Compara no solo el precio, sino alcances, materiales especificados y garantías.

**5. Elegir al contratista más barato sin verificar referencias**
El precio más bajo casi nunca es el más económico al final. Solicita referencias verificables y visita obras anteriores.

**6. No tener contrato por escrito**
Un contrato bien redactado protege a ambas partes. Debe incluir alcances, materiales, pagos por avance y penalizaciones por retraso.

**7. Omitir los costos de tramitología**
Licencias, derechos de conexión de servicios y gestión catastral pueden representar entre el 2% y el 5% del proyecto. No los ignores.`,
  },
  {
    id: 'diseno-biofilico-naturaleza-hogar',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=900&q=75&auto=format&fit=crop',
    date: 'Marzo 2026', read: '5 min', tag: 'Diseño',
    title: 'Diseño Biofílico: Naturaleza Dentro de Tu Hogar',
    body: 'Incorporar elementos naturales en la arquitectura mejora el bienestar y reduce el estrés.',
    full: `El diseño biofílico es una tendencia que lleva la naturaleza al interior de los espacios construidos, mejorando el bienestar psicológico, reduciendo el estrés y aumentando la productividad hasta un 15%.

**¿Qué es el diseño biofílico?**
Es una filosofía arquitectónica que integra elementos naturales —luz, vegetación, agua, materiales orgánicos— en el entorno construido, respondiendo a la necesidad innata del ser humano de conectarse con la naturaleza.

**Elementos clave**
- *Luz natural:* Ventanales amplios orientados al norte (en el hemisferio norte) garantizan luz difusa sin deslumbramiento. Los lucernarios son ideales para espacios sin acceso a fachadas.
- *Vegetación interior:* Jardines verticales, muros verdes y plantas de interior purifican el aire y crean microclimas más agradables.
- *Materiales naturales:* Madera, piedra, bambú y terracota aportan texturas orgánicas que conectan con el mundo natural.
- *Agua:* Fuentes, espejos de agua o incluso el sonido del agua reducen el cortisol y mejoran la concentración.
- *Ventilación cruzada:* El diseño orientado al viento elimina la necesidad de aires acondicionados en climas templados como Hidalgo.

**Costo vs. beneficio**
Integrar principios biofílicos no necesariamente encarece el proyecto. Una buena orientación y diseño de ventanas es, en muchos casos, más económico que un sistema de climatización. En Tekton diseñamos con estos principios desde el primer boceto.`,
  },
  {
    id: 'tendencias-2026-espacios-trabajo',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=75&auto=format&fit=crop',
    date: 'Feb 2026', read: '7 min', tag: 'Tendencias',
    title: 'Tendencias 2026 en Espacios de Trabajo',
    body: 'Los espacios de oficina han cambiado radicalmente. Descubre qué buscan las empresas modernas.',
    full: `El concepto de oficina ha atravesado la transformación más radical de su historia en los últimos 5 años. En 2026, las empresas que diseñan espacios de trabajo sin considerar estas tendencias enfrentan dificultades para atraer y retener talento.

**1. Modelo híbrido como estándar**
El 78% de las empresas en México opera bajo un modelo híbrido. Los espacios deben diseñarse para soportar simultáneamente trabajo presencial y remoto: cabinas de videoconferencia aisladas acústicamente, zonas de trabajo individual silencioso y áreas colaborativas abiertas.

**2. Diseño centrado en el bienestar**
Ergonomía, luz natural, ventilación, plantas y espacios de descanso han dejado de ser lujos para convertirse en requisitos básicos. Empresas como Google y Spotify llevan años demostrando que la inversión en bienestar reduce el ausentismo y aumenta la productividad.

**3. Flexibilidad total**
Los muros fijos están cediendo terreno a sistemas de tabiques móviles y módulos desmontables que permiten reconfigurar el espacio en horas según las necesidades del negocio.

**4. Tecnología integrada desde el diseño**
Redes de datos, tomas de corriente, iluminación inteligente y sistemas de gestión de salas deben diseñarse desde el proyecto, no instalarse después como parche.

**5. Sustentabilidad certificada**
LEED y EDGE son certificaciones cada vez más solicitadas por empresas con compromisos ESG. Reducen costos operativos y mejoran la imagen corporativa.

En Tekton diseñamos oficinas que combinan productividad, bienestar y flexibilidad. Agenda una consulta gratuita.`,
  },
  {
    id: 'guia-permisos-construccion-hidalgo',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=75&auto=format&fit=crop',
    date: 'Ene 2026', read: '9 min', tag: 'Trámites',
    title: 'Guía Completa de Permisos de Construcción en Hidalgo',
    body: 'Paso a paso: documentos, costos y tiempos del proceso de permisos en Hidalgo.',
    full: `Tramitar los permisos de construcción puede parecer una odisea burocrática, pero con la documentación correcta y los tiempos bien planeados, el proceso es manejable. Esta guía aplica para el estado de Hidalgo.

**Documentos base (aplican a casi todos los municipios)**
- Escrituras del predio notariadas
- Boleta predial al corriente
- Identificación oficial del propietario
- Proyecto arquitectónico firmado por perito responsable de obra (PRO) con cédula profesional
- Memoria de cálculo estructural para construcciones >60 m² o >2 niveles
- Plano de instalaciones hidráulicas y sanitarias
- Estudio de impacto ambiental (solo en zonas protegidas o proyectos >1,000 m²)

**Proceso en el municipio de Tezontepec de Aldama**
1. Presentar expediente completo en la Dirección de Obras Públicas
2. Revisión de viabilidad de uso de suelo (5-10 días hábiles)
3. Pago de derechos (varía por m² de construcción, aprox. $15-$35 MXN/m²)
4. Emisión de Licencia de Construcción
5. Inicio de obra con bitácora obligatoria

**Tiempos estimados**
- Municipio pequeño (como Tezontepec): 15-25 días hábiles
- Pachuca capital: 20-35 días hábiles
- Proyectos de gran escala o impacto ambiental: 60-90 días hábiles

**Costo típico de tramitología**
Entre el 2% y el 5% del presupuesto total de construcción, incluyendo honorarios del perito, pago de derechos y gestión catastral.

En Tekton gestionamos toda la tramitología por nuestros clientes. Pregunta por este servicio en tu consulta.`,
  },
  {
    id: 'naves-industriales-hidalgo-guia',
    image: 'https://images.unsplash.com/photo-1580587771525-214b05a57fcd?w=900&q=75&auto=format&fit=crop',
    date: 'Dic 2025', read: '6 min', tag: 'Industrial',
    title: 'Naves Industriales en Hidalgo: Guía para Empresarios',
    body: 'Factores clave para construir una nave industrial en Hidalgo: ubicación, normativa y plazos.',
    full: `Hidalgo se consolida como uno de los polos de desarrollo industrial más dinámicos del centro de México, gracias a su proximidad a la CDMX, la autopista México-Pachuca y el aeropuerto AIFA. Construir una nave industrial aquí tiene ventajas competitivas claras, pero también requiere conocer la normativa y los factores clave.

**Zonas industriales recomendadas en Hidalgo**
- *Tizayuca:* La más consolidada, con parques industriales clase A y conexión directa a la autopista.
- *Tepeapulco:* Ideal para industria mediana con acceso al corredor Pachuca-Veracruz.
- *Tezontepec de Aldama:* Zona emergente con costos de terreno más competitivos.
- *Atitalaquia:* Tradición industrial química y petroquímica.

**Especificaciones técnicas mínimas para nave industrial**
- Altura libre: mínimo 8 m para almacenaje, 12 m+ para manufactura con grúas
- Capacidad de carga de piso: 5 ton/m² estándar; consulta tus procesos específicos
- Acceso: bahías de carga con puertas de 4×4 m mínimo, patio de maniobras para tractocamión (35 m de radio)
- Electricidad: substation propia si la demanda supera 100 kVA
- Cumplimiento NOM-001-SEDE para instalaciones eléctricas

**Plazos típicos de construcción**
- Nave básica (estructura metálica, 1,000 m²): 3-4 meses
- Nave con oficinas y sanitarios integrados: 5-7 meses
- Planta con cuarto limpio o instalaciones especializadas: 8-14 meses

**Incentivos fiscales**
El gobierno de Hidalgo ofrece reducción del ISN (impuesto sobre nómina) para empresas que generen empleos en zonas prioritarias. Consulta con la Secretaría de Desarrollo Económico de Hidalgo.

Contáctanos para un estudio de factibilidad sin costo.`,
  },
];
