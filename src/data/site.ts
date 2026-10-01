import { u } from '@/lib/url';
// Contenido central de la web. Todo el texto procede de la web original de Z4YLON y de su dossier oficial 2026.
// Edita aquí para actualizar la web sin tocar los componentes.

export const site = {
  name: 'Z4YLON',
  realName: 'Jonathan',
  title: 'Z4YLON · DJ, showman y diseñador gráfico',
  description:
    'Web oficial de Z4YLON: DJ Open Format, showman y diseñador gráfico con más de 10 años en el ocio nocturno. Shows en clubs, festivales, bodas y eventos privados. Madrid, Ciudad Real y Córdoba.',
  tagline: 'DJ · Showman · Diseñador gráfico',
  base: 'Córdoba, España',
  areas: ['Madrid', 'Ciudad Real', 'Córdoba', 'Sevilla'],
  email: 'z4ylon_music@hotmail.com',
  phone: '+34 643 67 51 28',
  phoneHref: '+34643675128',
  whatsapp: 'https://wa.me/34643675128',
  instagramHandle: '@z4ylon',
  bandsintown: 'https://www.bandsintown.com/a/15497266',
  bandsintownAppId: 'WIX_app-z4ylon',
  dossierPdf: u('/press/z4ylon-dossier-2026.pdf'),
};

export const nav = [
  { href: u('/'), label: 'Inicio' },
  { href: u('/shows'), label: 'Shows' },
  { href: u('/musica'), label: 'Música' },
  { href: u('/press-kit'), label: 'Press Kit' },
  { href: u('/diseno'), label: 'Diseño gráfico' },
  { href: u('/contacto'), label: 'Contacto' },
] as const;

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/z4ylon/', handle: '@z4ylon' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@z4ylon', handle: '@z4ylon' },
  { id: 'twitch', label: 'Twitch', href: 'https://www.twitch.tv/z4ylon_music', handle: 'z4ylon_music' },
  { id: 'x', label: 'X (Twitter)', href: 'https://x.com/z4ylon', handle: '@z4ylon' },
  { id: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/user/quh6ze127xb54v109907rib37', handle: 'Z4YLON' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/Z4ylon-DJ-Organizador-de-eventos-449745535390461/', handle: 'Z4ylon DJ' },
  { id: 'mixcloud', label: 'Mixcloud', href: 'https://www.mixcloud.com/Z4YLON/', handle: 'Z4YLON' },
  { id: 'soundcloud', label: 'SoundCloud', href: 'https://soundcloud.com/z4ylon', handle: 'z4ylon' },
] as const;

export const genres = [
  'URBAN',
  'HOUSE',
  'LATIN',
  'BASS',
  'NU DISCO',
  'R&B',
  'POP',
  'AFRO HOUSE',
  'TECHNO',
  'INDIE',
  'BREAKS',
  'FLAMENCO',
  'AMBIENT',
  'OPEN FORMAT',
];

export const stats = [
  { value: 10, prefix: '+', suffix: '', label: 'años de experiencia DJ' },
  { value: 100, prefix: '+', suffix: '', label: 'eventos realizados' },
  { value: 4000, prefix: '+', suffix: '', label: 'asistentes en un solo show' },
  { value: 5, prefix: '+', suffix: '', label: 'festivales' },
];

export const bio = {
  lead: 'Jonathan, artísticamente conocido como Z4YLON, es DJ, diseñador gráfico y showman con más de una década de experiencia en la escena del ocio nocturno.',
  paragraphs: [
    'Desde 2015 ha realizado más de un centenar de eventos en discotecas, festivales y shows digitales, llevando su energía a Madrid, Ciudad Real, Córdoba y otras zonas clave a nivel nacional.',
    'Su trayectoria y estilo único le han permitido compartir cartel con referentes de la industria como Garabatto (Warner Chappell Music), Subshock & Evangelos (DOPE SQVAD) y Shake Coconut. Z4YLON se ha consolidado como un artista resiliente, capaz de conectar con todo tipo de público y eventos.',
    'Visionario y emprendedor, en 2017 creó Overload Sqvad, una comunidad a nivel nacional de profesionales emergentes del sector. Con la colaboración de la radio digital Actuality FM nacieron dos festivales online: Actuality Spring Fest 2018 y Actuality Summer Fest 2018, en el que participaron más de 30 artistas durante 3 días.',
    'Actualmente reside en Córdoba, donde sus shows ya forman parte del ocio nocturno, creando experiencias inolvidables para su público. Sé parte de ellas.',
  ],
};

export const musicStyle = [
  'Z4YLON se caracteriza por su versatilidad en cabina, desarrollándose como DJ Open Format y adaptando su selección musical a cada tipo de público y contexto.',
  'Su rango abarca desde sonidos urbanos y comerciales hasta propuestas underground, construyendo sets dinámicos que priorizan la energía de pista, el local, el público y la conexión con la audiencia.',
  'Su criterio musical, técnica y lectura del ambiente le permiten ofrecer experiencias consistentes, dinámicas y adaptadas que invitan al público a quedarse hasta el final y a repetir.',
];

export const highlights = [
  { event: 'Fiestas de San Fernando', place: 'Aranjuez', year: '2017', audience: '+4000 personas' },
  { event: 'Holi Colours Festival', place: 'Ciudad Real', year: '2023', audience: '+1800 personas' },
  { event: 'Holi Colours Festival', place: 'Ciudad Real', year: '2022', audience: '+1500 personas' },
  { event: "K'NOAS Festival · I Edición", place: 'Aranjuez', year: '2016', audience: '+400 personas' },
  { event: 'Sala ON', place: 'Madrid', year: '2021', audience: '+700 personas' },
  { event: 'Actuality Summer Fest', place: 'Actuality FM (online)', year: '2018', audience: 'Picos de 200 oyentes por set' },
];

export const residencies = [
  { name: 'Mansión de Ikebana', place: 'Ciudad Real' },
  { name: 'Makao Street Food · Music & Dinner', place: 'Ciudad Real' },
];

export const sharedLineup = [
  'Garabatto', 'Subshock & Evangelos', 'Shake Coconut', 'Whisix', 'Try It', 'Key Blaxx', 'SuperPig', 'Yeyo', 'Sansixto', 'Gioser',
];

export const brands = ["Martin Miller's Gin", 'Actuality FM', 'Overload Sqvad', 'Holi Colours Festival', 'Mansión de Ikebana', 'Makao Street Food', 'Sojo Mercado', 'Sala ON Madrid'];

/** Bloques "All in One" del dossier */
export const services = [
  { id: 'musica', title: 'Música', text: 'Mezclas enérgicas de música urbana y electrónica con gran lectura de público, géneros y técnicas de mezcla.', href: u('/musica') },
  { id: 'hitos', title: 'Hitos', text: '+10 años de experiencia, +4000 asistentes en vivo, +100 eventos, +5 festivales y colaboración con Martin Miller’s Gin.', href: u('/press-kit#hitos') },
  { id: 'marca', title: 'Marca', text: 'Conoce cómo usar esta firma gráfica junto a la tuya con promoción cruzada.', href: u('/press-kit#marca') },
  { id: 'rider', title: 'Rider', text: 'Requisitos mínimos necesarios para garantizar el mejor show.', href: u('/press-kit#rider') },
  { id: 'diseno', title: 'Diseño', text: 'Del concepto a la experiencia: impulsa tu marca con servicios de marketing visual.', href: u('/diseno') },
  { id: 'stage', title: 'Stage', text: 'Haz que tu evento alcance su máximo potencial contratando equipo de sonido e iluminación profesional.', href: u('/contacto') },
];

export const venues = ['Clubs y discotecas', 'Festivales', 'Rooftops y hoteles', 'Bodas', 'Comuniones y bautizos', 'Graduaciones', 'Eventos corporativos', 'Celebraciones privadas'];

export const process = [
  { title: 'Contacto', text: 'Se comprueba la viabilidad del evento con el promotor.' },
  { title: 'Reunión', text: 'Se deciden los servicios necesarios para el evento.' },
  { title: 'Planificación', text: 'Logística del evento, coordinación y marketing.' },
  { title: 'Promoción', text: 'Acciones cruzadas en redes sociales con la organización.' },
  { title: 'Actuación', text: 'Selección musical adaptada a la energía del público.' },
  { title: 'Post-show', text: 'Contenido exclusivo para ampliar la experiencia.' },
];

export const equipment = {
  mixer: {
    name: 'Denon DJ Prime 4',
    text: 'Cabina profesional All-in-One que le permite ofrecer shows versátiles y de alta calidad en cualquier entorno, gracias al análisis de la música en su propio sistema y a sus prestaciones avanzadas.',
    features: ['4 canales reales', 'Motor Engine DJ', 'Conexiones profesionales', 'Stems', '2 entradas de micrófono', 'Control detallado de FX'],
  },
  headphones: ['V-Moda M10', 'Pioneer HDJ-700'],
};

export const rider = {
  required: [
    'Personal de seguridad suficiente durante montaje, show y desmontaje.',
    'Sonido profesional: sistema principal (main P.A.) adecuado al aforo y características del espacio, así como monitores de cabina (booth).',
    'Microfonía, sistema de iluminación y efectos adaptados al espacio.',
    'Tomas de corriente estabilizadas y salidas de audio profesionales por cable XLR directo a la main P.A. o D.I.',
    'Espacio reservado, seguro y vigilado para la cabina y el equipo técnico.',
    'Facilidades de transporte y, cuando sea necesario, hospedaje.',
    'Acceso logístico al recinto para carga y descarga.',
    'Cabina acondicionada o con ventilador.',
    'Agua fresca a disposición del artista.',
    'Puntualidad, facilidades, buen trato y coordinación por parte del promotor y del staff del evento.',
  ],
  note: 'Si no se cumplen estos requisitos, la actuación podría verse comprometida en cualquier fase del show. En cualquier caso, es necesario comunicarlo al artista y buscar una alternativa.',
  optional: [
    'Refrescos, bebidas espirituosas, cachimba y catering básico.',
    'Asistencia técnica adicional para la coordinación de visuales.',
    'Camerino o espacio privado para el artista y su equipo.',
    'Técnico de sonido e iluminación del recinto. Si no lo hubiera, se requerirá acceso al control de luces y pantallas de visuales.',
  ],
};

export const brandGuidelines = {
  intro: 'La estrategia de marketing detrás de cada espectáculo es clave para atraer al público y garantizar una experiencia memorable. Estas son las pautas para el uso de cartelería en redes sociales:',
  rules: [
    { title: 'Logo de Z4YLON', text: 'Siempre visible, sin deformaciones ni manipulaciones. En carteles con varios artistas debe mantener el mismo tamaño que el resto. Si el diseño lo requiere, puede usarse el nombre artístico con una tipografía legible y en armonía con el resto del diseño.' },
    { title: 'Flyer o videoflyer', text: 'El logo debe estar siempre presente con un diseño profesional que maximice el impacto del evento, en alta resolución y con dimensiones adaptadas al formato: impresión o redes sociales.' },
    { title: 'Imagen del artista', text: 'Z4YLON facilita diversas imágenes para cartelería. Su uso es opcional pero recomendado, sobre todo en carteles con varios artistas, siempre integrada visualmente en la composición.' },
  ],
  outro: 'Debe evitarse el uso excesivo de IA en los elementos de promoción. Cualquier otro uso de la marca Z4YLON debe consultarse con el artista, así como compartir los resultados de marketing de cada evento en un tiempo razonable para hacer promoción cruzada.',
};

export const designClients = {
  intro: 'Más de 12 años de experiencia en diseño gráfico, creando y potenciando identidades visuales para:',
  groups: [
    { label: 'Marcas y eventos', items: ["Martin Miller's Gin", 'Paranoia Exclusive Club', 'Secret Benidorm', 'Music & Dinner', 'Overload Sqvad'] },
    { label: 'Discotecas y salas', items: ['Quality (Madrid)', 'One More Night Club (Madrid)', 'La Club', 'Mansión de Ikebana', 'Makao Street Food'] },
    { label: 'Festivales', items: ['Actuality Spring Fest 2018', 'Actuality Summer Fest 2018'] },
    { label: 'Artistas', items: ['Vity Domínguez (Foro DJ)', 'DJ Janu', 'ELVER M'] },
  ],
};

export type Faq = { q: string; a: string[] };

export const faqs: Faq[] = [
  { q: '¿Quién es Z4YLON?', a: [bio.lead, ...bio.paragraphs] },
  { q: '¿Qué tipo de música usa Z4YLON durante sus shows?', a: musicStyle },
  {
    q: '¿Qué puedo esperar de un show de Z4YLON?',
    a: [
      'Una mezcla creativa y de gran calidad, con canciones que te harán recordar grandes momentos del pasado y los éxitos más recientes que no podrás dejar de bailar.',
      'Además, Z4YLON ofrece una experiencia visual que hace el show aún más emocionante, con sorpresas únicas en cada evento. Un espectáculo completo que combina música y visuales: si buscas energía y buena música, lo has encontrado.',
    ],
  },
  { q: '¿Qué diferencia a Z4YLON de otros artistas?', a: ['Una propuesta única que une producción musical de vanguardia y experiencias inmersivas, creando un show lleno de energía y conexión con el público. Una sola firma resuelve todo el show: dirección técnica, estética y operativa bajo un mismo control.'] },
  {
    q: '¿Cómo puedo contratar a Z4YLON?',
    a: [
      'Para un trato profesional, usa el formulario de la sección Contacto: allí también tienes el dossier del artista para consultarlo online o descargarlo en PDF.',
      'Si prefieres un trato más cercano, escribe directamente por Instagram (@z4ylon), WhatsApp o llamada. Contrato y condiciones bajo solicitud directa.',
    ],
  },
  { q: '¿Cómo prepara Z4YLON cada show?', a: process.map((p) => `${p.title}: ${p.text}`) },
  { q: '¿Dónde realiza Z4YLON sus shows?', a: ['En clubs, discotecas, rooftops, hoteles, festivales, bodas, comuniones, bautizos, graduaciones, eventos corporativos, celebraciones privadas y cualquier espacio habilitado que busque potenciar su impacto. Cada show se adapta al contexto y al público, desde sets íntimos hasta grandes formatos.'] },
  {
    q: '¿Con qué equipo trabaja Z4YLON?',
    a: [`${equipment.mixer.name}: ${equipment.mixer.text}`, `Prestaciones: ${equipment.mixer.features.join(', ')}.`, `Auriculares: ${equipment.headphones.join(' o ')}.`],
  },
  { q: 'Si contrato a Z4YLON, ¿cómo debe hacerse el diseño del marketing digital?', a: [brandGuidelines.intro, ...brandGuidelines.rules.map((r) => `${r.title}: ${r.text}`), brandGuidelines.outro] },
  {
    q: '¿Dónde ha actuado Z4YLON?',
    a: [
      'Desde 2015 en más de 100 eventos, en salas y discotecas de Madrid, Ciudad Real y Córdoba y sus municipios.',
      'Grandes fiestas y festivales: Fiestas de San Fernando de Aranjuez (más de 4000 personas), Holi Colours Ciudad Real 2022 y 2023 (1500 y 1800 personas), Sala ON Madrid (700 personas), K’NOAS Festival Aranjuez (I Edición), Actuality Spring Fest 2018 y Actuality Summer Fest 2018.',
      'Eventos más íntimos: La Parrilla de La Máquina (Madrid) y residencia en Makao Street Food (Ciudad Real), donde creó la marca de eventos Music & Dinner y colaboró con Martin Miller’s Gin. Consulta el archivo completo en la sección Shows.',
    ],
  },
  {
    q: '¿Con qué artistas ha colaborado Z4YLON?',
    a: [
      'Con artistas locales, nacionales e internacionales gracias a sus actuaciones en festivales físicos y online creados bajo su proyecto Overload Sqvad: Subshock & Evangelos, Shake Coconut, Garabatto, Whisix, Try It, KEY BLAXX (#81 en el TOP100 DJANE SPAIN), SuperPig (Sergei Rez + Gonso Rivas), YEYO, Sansixto y Gioser, entre otros.',
      'Además, mantiene contacto activo con más de 600 DJs de toda España, desde Madrid (Grupo DJs España) hasta Sevilla (Grupo ForoDJ).',
    ],
  },
  {
    q: '¿Dónde se pueden seguir las novedades de Z4YLON?',
    a: [
      'En la web oficial (material exclusivo, próximas fechas y servicios), en Bandsintown (avisos de nuevos eventos por email y notificaciones en el móvil) y en redes sociales: actividad principal en Instagram y directos en TikTok y Twitch.',
    ],
  },
  { q: '¿Con qué marcas o eventos ha trabajado Z4YLON?', a: ['Destaca la colaboración con Martin Miller’s Gin en Makao Street Food (Ciudad Real) y con la radio digital Actuality FM junto a su comunidad Overload Sqvad en dos ediciones de su festival online (Spring y Summer Fest 2018), además de eventos de pequeño, mediano y gran formato.'] },
];

export const designFaqs = {
  logos: [
    { q: '¿Qué contiene un logo?', a: ['Logo principal vectorizado.', 'Adaptación a redes sociales.', 'Versión en PNG con fondo transparente.'] },
    {
      q: '¿Qué debe entregar el cliente?',
      a: [
        'Ejemplos de lo que SÍ y lo que NO quiere, qué usos le va a dar y cómo ampliará su marca en el futuro.',
        'Presupuesto disponible y plazo de entrega estimado. Un plazo inferior a 14 días tiene un coste adicional del 150 %.',
        'Los documentos se entregan por Google Drive.',
      ],
    },
    { q: '¿Y si ya tengo logo?', a: ['Si te gusta tu logo pero quieres corregirlo y/o vectorizarlo, también se realizan esos servicios. No aplica a logos hechos con IA.'] },
  ],
  visuales: [
    {
      q: '¿Qué contienen unos visuales?',
      a: [
        'Vídeo del montaje completo en 16:9, 1080p (1920 × 1080) a 30 fps en .mp4 (H.264).',
        'Imágenes de la sesión fotográfica que se usen en los visuales, recortadas profesionalmente (.png).',
        '2 revisiones incluidas; cada revisión extra tiene un coste añadido.',
      ],
    },
    {
      q: '¿Qué debe entregar el cliente?',
      a: [
        'Ejemplos de lo que SÍ y lo que NO quiere, logo vectorizado profesionalmente (si no lo está, tiene coste adicional), imágenes de sesión fotográfica y vídeos de shows en alta calidad.',
        'Presupuesto disponible y plazo de entrega estimado. Un plazo inferior a 14 días tiene un coste adicional del 150 %.',
        'Los documentos se entregan por Google Drive.',
      ],
    },
  ],
} satisfies Record<string, Faq[]>;

export const contactRoles = ['Promotor', 'Particular (boda, cumpleaños, evento privado)', 'Empresa / evento corporativo', 'Cliente para diseño gráfico', 'Agente de prensa', 'DJ o productor', 'Una persona con una duda', 'Otros'];

export const sessions = [
  {
    key: '/Z4YLON/z4ylon-afro-house-melodic-techno-session-may-26/',
    title: 'Afro House & Melodic Techno Session',
    edition: "May '26",
    date: '2026-05-22',
    seconds: 3497,
    tags: ['Afro House', 'Minimal Techno', 'Ambient Techno', 'Deep Techno'],
    cover: 'afro',
  },
  {
    key: '/Z4YLON/z4ylon-exclusive-tech-bass-session-feb-2023/',
    title: 'Exclusive Tech & Bass Session',
    edition: 'Feb. 2023',
    date: '2023-02-23',
    seconds: 3429,
    tags: ['Tech House', 'Tech Bass', 'Bass House', 'Latin Tech House'],
    cover: 'techbass',
  },
  {
    key: '/Z4YLON/z4ylon-zoewie-dj-contest-set/',
    title: 'Zoewie Fest DJ Contest Set',
    edition: '2018',
    date: '2018-09-23',
    seconds: 1218,
    tags: ['EDM', 'Festival'],
    cover: 'zoewie',
  },
] as const;

export type Session = (typeof sessions)[number];

export const playlists = [
  { id: '2SSbBJfw2iVYApYvy7Jv7U', title: '#THEZ4YLONPLAYLIST', edition: 'ENE 2022 · Special Birthday', cover: 'ene2022' },
  { id: '47p32chTNlE4flRcXOkkc8', title: '#THEZ4YLONPLAYLIST', edition: 'DIC 2021', cover: 'dec2021' },
  { id: '1MRan6cAYSDUry2vitq9jg', title: '#THEZ4YLONPLAYLIST', edition: 'NOV 2021', cover: 'nov2021' },
  { id: '3CS845yON1vWXkLxsfMJ2w', title: '#THEZ4YLONPLAYLIST', edition: 'OCT 2021', cover: 'sep2021' },
] as const;

/** Descripción de cada flyer de src/assets/flyers (flyer-01 … flyer-24), usada como texto alternativo */
export const flyerCaptions = [
  'Tanteo The Club · DJ set, 17 de junio de 2023',
  'Envy Café Teatro, Valdepeñas · sábado 6 de mayo',
  'La Fragua Disco Pub · Semana Santa 2023, sábado 1 de abril',
  'Holi Colours Festival · Ciudad Real',
  'Zurra 2022 · La Mansión de Ikebana',
  'Tropical Night · La Mansión de Ikebana, 21 de mayo',
  'Carnaval Party · Zona VIP Miguelturra, 18 de febrero',
  'Terraza Gusto · La Mansión de Ikebana, viernes 1 de julio',
  'Xmas Matinee · Aranjuez',
  'Summer Party · La Mansión de Ikebana',
  'Summer Night · La Mansión de Ikebana',
  'Fiesta del Semáforo · La Mansión de Ikebana, sábado 11 de junio',
  'Summer Vibes · La Mansión de Ikebana, 13 de agosto',
  'Summer Vibes Tonight · La Mansión de Ikebana',
  'Saturday Night Fever · La Mansión de Ikebana',
  'Noche de San Juan en Actuality FM con Z4YLON, Zortness, Pastoriovs y Whisix',
  'Summer Paradise Party · La Mansión de Ikebana',
  'Sábado con Ikebana Team DJs · 14 de mayo',
  'Sábado Santo · La Mansión de Ikebana, 16 de abril',
  'Pantera Club Ciudad Real · viernes 17 de marzo con Marttin, Joe Pop y Z4YLON',
  'Sábado 10 de septiembre de 2022 · La Mansión de Ikebana',
  'Pandorga 2022 · La Mansión de Ikebana',
  'Anniversary Week · Origen Club, lunes 5 de diciembre',
  "Special New Year's Eve · Makao Street Food",
];
