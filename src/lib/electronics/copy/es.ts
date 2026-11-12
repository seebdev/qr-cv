import type { ShowcaseCopy } from '../types';
export const es: ShowcaseCopy = {
  featured: 'Proyecto destacado',
  badge: 'Plataforma de software B2B',
  lead: 'Del número de parte a la próxima oportunidad.',
  summary:
    'Clientes, inventarios, abastecimiento e inteligencia de datos en un mismo espacio de trabajo para el negocio de componentes electrónicos.',
  back: 'Volver al portafolio',
  explore: 'Explorar funcionalidades',
  live: 'Ver plataforma',
  auth: 'El acceso operativo puede requerir una cuenta.',
  study:
    'Software desarrollado y presentado como caso de estudio. Esta presentación es pública y no requiere iniciar sesión.',
  overview: 'El producto',
  problemLabel: 'El reto',
  problemTitle: 'Datos dispersos. Decisiones desconectadas.',
  problemBody:
    'Un número de parte aparece en una hoja de cálculo, la disponibilidad en otra y la necesidad del comprador en una conversación. Reconstruir ese contexto exige búsquedas manuales y dificulta el seguimiento comercial.',
  solutionLabel: 'La propuesta',
  solutionTitle: 'Un contexto común para cada componente.',
  solutionBody:
    'Electronic Parts Intelligence reúne organizaciones, registros de catálogo, stock y necesidades. Conecta la consulta de información con el análisis de oportunidades y el trabajo del equipo, sin prometer resultados comerciales no medidos.',
  modulesTitle: 'Un producto. Operaciones conectadas.',
  modulesIntro:
    'Explora el propósito y el flujo de cada módulo. Las vistas esquemáticas explican el producto; no son sesiones conectadas ni resultados reales.',
  moduleFlow: 'Recorrido del módulo',
  modules: [
    [
      'Clientes',
      'El contexto comercial empieza aquí.',
      'Un directorio de organizaciones y sus fichas permite consultar el contexto del cliente antes de trabajar sus necesidades. La captura aportada muestra este módulo.',
      'Directorio → ficha de organización → contexto comercial',
    ],
    [
      'Oportunidades',
      'Relacionar demanda y disponibilidad.',
      'El código revisado normaliza MPN y evalúa stock, demanda y ofertas. La coincidencia de una referencia no equivale por sí sola a una venta confirmada.',
      'Archivos de origen → comparación por MPN → revisión de oportunidades',
    ],
    [
      'Stock y necesidades',
      'Entender qué se puede cubrir.',
      'El modelo distingue existencias, cobertura parcial, faltantes y datos desconocidos. Conserva la relación con las cargas de origen para revisar el contexto.',
      'Necesidad → disponibilidad → cobertura y faltantes',
    ],
    [
      'Búsqueda',
      'Encontrar la referencia con su contexto.',
      'Consulta estructurada de registros y números de parte. Los campos consultables y los resultados se delimitan según el acceso del usuario; esta búsqueda es distinta de la IA generativa.',
      'Consulta → campos permitidos → registros',
    ],
    [
      'IA e inteligencia de datos',
      'Preguntas de negocio con evidencia.',
      'El asistente combina herramientas de consulta autorizadas con respuestas deterministas y, cuando está configurado, generación de lenguaje con OpenAI. El alcance se aplica en el servidor.',
      'Pregunta → herramienta autorizada → respuesta contextual',
    ],
    [
      'Chat',
      'Dar continuidad a la colaboración.',
      'Conversaciones entre participantes de la plataforma. El código incluye comprobaciones de pertenencia a la conversación y acceso diferenciado a la auditoría.',
      'Conversación → participantes → seguimiento',
    ],
    [
      'Cargas',
      'Convertir catálogos en información consultable.',
      'Importación de Excel y CSV con validación y procesamiento mediante trabajos en segundo plano en el código revisado. Los errores de carga forman parte del seguimiento.',
      'Archivo → validación y procesamiento → registros',
    ],
    [
      'Usuarios y perfiles',
      'Organizar quién puede hacer qué.',
      'El código define empleado, responsable, administrador y administrador técnico. Las capacidades se comprueban por rol; su configuración en producción no se ha auditado.',
      'Cuenta → perfil y rol → capacidades permitidas',
    ],
    [
      'Registros',
      'Mantener la trazabilidad del dato.',
      'Consulta de información importada y normalizada, con referencias a la carga de origen. Permite revisar el contenido antes de utilizarlo en análisis comerciales.',
      'Carga → registro normalizado → consulta',
    ],
    [
      'Administración de clientes',
      'Dar estructura al directorio.',
      'Rutas de creación y edición de organizaciones con capacidades de gestión diferenciadas. Complementa la consulta comercial con el mantenimiento administrativo.',
      'Permiso de gestión → alta o edición → directorio',
    ],
    [
      'Abastecimiento',
      'Continuar cuando hace falta suministro.',
      'El código incluye solicitudes, ofertas y decisiones de abastecimiento. Permite seguir estas gestiones sin presentar una oferta como una compra cerrada.',
      'Solicitud → ofertas → revisión y seguimiento',
    ],
  ],
  illustration: 'Vista ilustrativa',
  source: 'Revisado en código',
  sourceNote:
    'Evidencia: interfaz aportada y código local de Electronic Parts Demo. La equivalencia exacta con la versión publicada y su configuración operativa no se han verificado. No se afirman clientes reales, métricas de impacto ni garantías de seguridad.',
  aiLabel: 'Inteligencia con contexto',
  aiTitle: 'Preguntar mejor empieza por datos bien conectados.',
  aiBody:
    'El valor no está solo en generar texto: está en recuperar información pertinente, respetar su alcance y explicar qué sustenta la respuesta. Este recorrido representa el código revisado, sin ejecutar consultas desde esta página.',
  aiSteps: [
    'Pregunta del usuario',
    'Aplicación y control de acceso',
    'Consulta autorizada',
    'Procesamiento',
    'Respuesta contextualizada',
  ],
  structuredTitle: 'Consulta estructurada',
  structuredBody:
    'Herramientas específicas consultan MPN, stock, oportunidades y registros dentro del alcance autorizado. Algunos resultados se construyen de forma determinista.',
  generativeTitle: 'Lenguaje generativo',
  generativeBody:
    'La integración con OpenAI procesa contexto filtrado cuando está configurada. No sustituye a la base de datos ni garantiza que cada respuesta use un modelo generativo.',
  boundaryTitle: 'El permiso precede a la respuesta',
  boundaryBody:
    'El código comprueba sesión, rol y alcance de las consultas, filtra campos sensibles y limita solicitudes. Describe controles implementados, no una certificación ni una auditoría de producción.',
  architectureTitle: 'Diseñado alrededor del flujo de información.',
  architectureBody:
    'Arquitectura observada en el código local. La configuración del alojamiento y los proveedores de la demo pública queda pendiente de verificación.',
  layers: [
    ['Experiencia', 'Next.js · React · TypeScript'],
    ['Aplicación', 'Rutas de servidor · validación · autorización'],
    ['Datos', 'Supabase · PostgreSQL · almacenamiento'],
    ['Procesamiento', 'Importaciones en segundo plano · OpenAI opcional'],
  ],
  workflowTitle: 'Del catálogo al siguiente paso comercial.',
  workflowBody:
    'Recorrido posible entre los módulos revisados. Cada paso requiere datos y permisos adecuados; no representa una automatización completa sin intervención.',
  workflowSteps: [
    'Cargar catálogos',
    'Organizar registros',
    'Buscar y analizar',
    'Revisar oportunidades',
    'Gestionar abastecimiento',
    'Colaborar',
  ],
  videoTitle: 'Mira el producto en acción.',
  videoIntro:
    'Dos recorridos, una misma plataforma. El idioma del video es independiente del idioma de esta presentación.',
  videoEnglish: 'Demostración en inglés',
  videoChinese: 'Demostración en chino',
  videoEnglishBody: 'Recorrido en inglés por el espacio de trabajo y el flujo comercial.',
  videoChineseBody: 'Recorrido en chino simplificado por los módulos y sus usos.',
  comingSoon: 'Video próximamente',
  videoError: 'El video no está disponible en este momento.',
  useTitle: 'Para equipos que trabajan con componentes.',
  uses: [
    ['Distribuidores electrónicos', 'Reunir catálogos, disponibilidad y contexto comercial.'],
    ['Ventas B2B', 'Preparar conversaciones a partir de necesidades y oportunidades.'],
    ['Abastecimiento', 'Seguir solicitudes y evaluar las ofertas recibidas.'],
    ['Gestión de catálogos', 'Organizar archivos, referencias y registros de origen.'],
    ['Compras', 'Consultar referencias y analizar necesidades de suministro.'],
  ],
  galleryTitle: 'Dentro del espacio de trabajo.',
  galleryBody:
    'Una mirada a los principales módulos. Cuando no hay una captura publicable, se muestra un esquema identificado como ilustración.',
  placeholder: 'Captura pendiente',
  zoom: 'Ampliar vista',
  close: 'Cerrar galería',
  previous: 'Vista anterior',
  next: 'Vista siguiente',
  screenshot: 'Captura de interfaz',
  demoData: 'Los nombres y empresas de demostración no implican relaciones comerciales.',
  engineeringTitle: 'El trabajo detrás del producto.',
  engineering: [
    [
      'Desarrollo integral',
      'Interfaz, rutas de servidor y modelos de datos coordinados alrededor de operaciones B2B.',
    ],
    [
      'Datos antes que promesas',
      'Normalización de referencias, procedencia de las cargas y distinción entre datos ausentes y disponibilidad.',
    ],
    [
      'IA con límites explícitos',
      'Separación entre recuperación de datos, autorización y generación de lenguaje.',
    ],
  ],
  stackLabel: 'Tecnologías observadas en el código',
  contactTitle: 'Conversemos sobre tu próxima plataforma.',
  contactBody:
    '¿Buscas organizar operaciones B2B o explorar una solución similar? Contacta al desarrollador para conversar sobre el producto o solicitar una demostración.',
  contact: 'Contactar al desarrollador',
  readCase: 'Conocer el proyecto',
};
