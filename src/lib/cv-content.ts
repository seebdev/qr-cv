export const CONTACT = {
  name: "Sebastián Solórzano Carvajal",
  company: "Tolentino SW",
  emails: ["sebastianssc01@gmail.com", "tolentinosftw@gmail.com"],
  phoneDisplay: "+57 310 885 3158",
  phoneHref: "tel:+573108853158",
  whatsappUrl: "https://wa.me/573108853158",
  linkedin:
    "https://www.linkedin.com/in/sebastian-solorzano-carvajal-993139281/",
  location: "Colombia",
  availability: "Available globally"
} as const;

export const locales = [
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
  { code: "zh", label: "中文", short: "中文" }
] as const;

export type Locale = (typeof locales)[number]["code"];

export const content = {
  en: {
    languageName: "English",
    nav: [
      { href: "#services", label: "Services" },
      { href: "#projects", label: "Projects" },
      { href: "#process", label: "Process" },
      { href: "#contact", label: "Contact" }
    ],
    hero: {
      eyebrow: "Founder & Technology Solutions Developer",
      title: "Sebastián Solórzano Carvajal",
      role: "Founder & Software Developer at Tolentino SW",
      headline:
        "I build custom software, AI systems, business databases and digital platforms for companies that need to organize, automate and scale their operations.",
      subheadline:
        "Through Tolentino SW, I create tailored digital solutions for public and private organizations, including companies, institutions, local governments and teams that need technology adapted to their real operational needs.",
      asia:
        "Positioned for international B2B collaboration with Asia-facing founders, operators and executives who need practical software for growth.",
      cardText:
        "Custom software, AI systems and business databases for global operations.",
      buttons: {
        projects: "View Projects",
        download: "Download CV",
        contact: "Contact Me"
      },
      badges: [
        "Custom Software",
        "Artificial Intelligence",
        "Business Databases",
        "CRM Systems",
        "Dashboards",
        "UX/UI",
        "Public & Private Sector Solutions"
      ],
      stats: [
        { value: "B2B", label: "Software focus" },
        { value: "AI + Data", label: "Core capability" },
        { value: "Global", label: "Remote availability" }
      ]
    },
    about: {
      eyebrow: "About",
      title: "Technology that adapts to the business, not the other way around.",
      body:
        "I am Sebastián Solórzano Carvajal, founder of Tolentino SW, a digital solutions company focused on building specialized software for businesses and organizations. I understand that every company has different needs, processes and challenges, which is why I build technology that adapts to each organization instead of forcing organizations to adapt to generic tools.",
      points: [
        "Custom software for companies, institutions and internal teams",
        "Robust databases that replace Excel-based workflows",
        "AI assistants for clients, employees, suppliers and distributors",
        "Executive dashboards, reporting systems and decision support",
        "UX/UI, onboarding and training for non-technical users",
        "Experience across public and private sector requirements"
      ]
    },
    services: {
      eyebrow: "Specialties",
      title: "Enterprise software capabilities for real operations.",
      description:
        "A focused set of services for organizations that need control, visibility, automation and scalable digital infrastructure.",
      items: [
        {
          title: "Custom Software Development",
          description:
            "Tailored software for companies that need systems adapted to their internal operations, clients, suppliers, distributors and teams."
        },
        {
          title: "Business Databases",
          description:
            "Robust databases designed to replace Excel-based workflows, centralize information and improve operational control."
        },
        {
          title: "Artificial Intelligence Systems",
          description:
            "AI assistants and agents for customer service, internal employees, suppliers, distributors and executive reporting."
        },
        {
          title: "CRM & Internal Platforms",
          description:
            "CRM systems and internal platforms to manage clients, contacts, sales, suppliers, follow-ups, categories and business workflows."
        },
        {
          title: "Dashboards & Metrics",
          description:
            "Executive dashboards with real-time metrics, segmentation, categories, charts and performance reports for decision-making."
        },
        {
          title: "UX/UI Design",
          description:
            "Intuitive interfaces designed for real users, making complex business systems easy to use for employees and collaborators."
        },
        {
          title: "Cybersecurity & Scalability",
          description:
            "Software architecture focused on security, roles, permissions, scalability and long-term business growth."
        },
        {
          title: "Training & Implementation",
          description:
            "Training and support for company teams to ensure successful adoption of the software."
        }
      ]
    },
    value: {
      eyebrow: "Business Value",
      title: "How I help companies scale their operations.",
      lead:
        "I help organizations transform manual processes and fragmented data into centralized, scalable and intelligent software systems.",
      items: [
        "Replace Excel with centralized digital systems",
        "Organize scattered information",
        "Build robust business databases",
        "Create dashboards with real-time metrics",
        "Automate repetitive processes",
        "Detect operational gaps",
        "Generate immediate reports",
        "Improve communication between teams",
        "Support executives with updated data",
        "Create AI agents for internal and external users",
        "Improve decision-making through statistics and charts",
        "Build systems for clients, employees, suppliers and distributors"
      ]
    },
    projects: {
      eyebrow: "Selected Work",
      title: "Projects shaped around communication, commerce and operations.",
      carouselEyebrow: "Live Projects",
      carouselTitle: "Interactive launches and business websites.",
      carouselDescription:
        "A quick carousel of real projects, online stores, digital menus and AI-assisted customer experiences.",
      liveItems: [
        {
          name: "Crepes & Waffles Digital Menu",
          category: "AI-assisted restaurant menu",
          description:
            "Interactive customer menu with multilingual UX, product browsing and an AI WhatsApp contact path for ordering support.",
          image: "/projects/crepes-waffles.png",
          href: "https://crepes-and-waffles.vercel.app/cliente",
          cta: "Open menu",
          tags: ["Restaurant UX", "Digital Menu", "WhatsApp AI"]
        },
        {
          name: "WhatsApp AI Assistant",
          category: "Conversational AI",
          description:
            "Direct WhatsApp access to an AI assistant for customer interaction, support and business automation.",
          image: "/projects/whatsapp-ia.svg",
          href: "https://wa.me/573001330213",
          cta: "Open AI WhatsApp",
          tags: ["WhatsApp", "AI Assistant", "Automation"]
        },
        {
          name: "Perrote y Gatote",
          category: "Pet e-commerce",
          description:
            "Online pet-products experience with visual product categories, fast browsing and direct purchase flow.",
          image: "/projects/perrote-gatote.png",
          href: "https://www.perroteygatote.com/",
          cta: "Open store",
          tags: ["E-commerce", "Catalog", "Pets"]
        },
        {
          name: "Gorras Sigma / Buff-Head COL",
          category: "Retail landing page",
          description:
            "Commercial landing page for hats, customization services and national sales positioning.",
          image: "/projects/gorras-sigma.png",
          href: "https://gorras-sigma.vercel.app/",
          cta: "Open project",
          tags: ["Retail", "Landing Page", "Catalog"]
        },
        {
          name: "Celus Col",
          category: "Mobile devices and services",
          description:
            "Technology storefront for cellphones, accessories, technical services and repairs.",
          image: "/projects/celus-col.png",
          href: "https://celus-col.vercel.app/",
          cta: "Open project",
          tags: ["Tech Store", "Services", "Responsive Web"]
        },
        {
          name: "Ferre Col",
          category: "Hardware store website",
          description:
            "Clean website concept for hardware products, tools and construction material services.",
          image: "/projects/ferre-col.png",
          href: "https://ferre-col.vercel.app/",
          cta: "Open project",
          tags: ["Business Website", "Products", "Local Services"]
        }
      ],
      items: [
        {
          name: "Rionegro AI WhatsApp Assistant",
          description:
            "AI-powered communication system designed for institutional communication, citizen support, announcements, reports and administrative management.",
          features: [
            "WhatsApp automation",
            "AI responses",
            "Admin dashboard",
            "Citizen reports",
            "Knowledge base",
            "Metrics",
            "Scheduled announcements",
            "Public institution use case"
          ],
          tech:
            "Next.js, Node.js, PostgreSQL, Prisma, OpenAI, WhatsApp API, Render, Vercel",
          impact:
            "Built as a scalable MVP for public-sector communication and citizen service."
        },
        {
          name: "VoiceCart AI",
          description:
            "Voice and WhatsApp commerce assistant designed to help users search products, ask questions, confirm orders and interact with an online store through AI.",
          features: [
            "Voice assistant",
            "WhatsApp integration",
            "AI product guidance",
            "Order flow",
            "Customer interaction",
            "E-commerce support"
          ],
          tech: "Next.js, OpenAI, ElevenLabs, WhatsApp API, Render, Vercel",
          impact:
            "Built as an AI-powered e-commerce experience focused on making digital shopping easier and more conversational."
        },
        {
          name: "Tolentino SW Business Systems",
          description:
            "Custom business systems focused on databases, CRM, dashboards, automation, AI agents and operational organization for companies.",
          features: [
            "Excel-to-database transformation",
            "CRM structure",
            "Supplier and distributor organization",
            "Executive dashboards",
            "AI reporting agents",
            "UX/UI interfaces",
            "Training and support"
          ],
          tech:
            "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, OpenAI, Tailwind CSS",
          impact:
            "Designed for companies that need control, data structure and scalable internal technology."
        }
      ]
    },
    stack: {
      eyebrow: "Technology Stack",
      title: "Tools for modern business platforms.",
      items: [
        ["Frontend", "React, Next.js, TypeScript, HTML, CSS, Tailwind CSS"],
        ["Backend", "Node.js, Express, REST APIs, business logic, automation workflows"],
        ["Databases", "PostgreSQL, Prisma, SQL, Excel/CSV data migration, data modeling"],
        [
          "Artificial Intelligence",
          "OpenAI, AI agents, knowledge bases, AI assistants, intelligent workflows, automated responses"
        ],
        ["Cloud & Deployment", "Vercel, Render, Supabase and similar cloud platforms"],
        ["Integrations", "WhatsApp API, UltraMsg, ElevenLabs, Google APIs, external APIs"],
        [
          "Business Systems",
          "CRM, dashboards, admin panels, reporting systems, internal management platforms"
        ],
        ["UX/UI", "Responsive design, user-friendly interfaces, business workflow design"]
      ]
    },
    process: {
      eyebrow: "Process",
      title: "My development process.",
      steps: [
        {
          title: "Discovery",
          description:
            "I understand the company’s real workflow, current tools, pain points and business goals."
        },
        {
          title: "Data Structure",
          description:
            "I design the database, categories, user roles, permissions and information architecture."
        },
        {
          title: "Software Development",
          description:
            "I build the platform, dashboard, automations, integrations and business logic."
        },
        {
          title: "AI & Automation",
          description:
            "I implement AI agents, intelligent workflows, reports and decision-support tools when needed."
        },
        {
          title: "UX/UI Optimization",
          description:
            "I design intuitive interfaces so employees and collaborators can use the system easily."
        },
        {
          title: "Training & Support",
          description:
            "I train the team and support the adoption of the software inside the organization."
        }
      ]
    },
    useCases: {
      eyebrow: "Use Cases",
      title: "Solutions I can build.",
      items: [
        "Inventory Management Systems",
        "Supplier & Distributor Portals",
        "Customer Relationship Management",
        "Internal Operation Dashboards",
        "Executive Reports",
        "AI Customer Service Assistants",
        "AI Agents for Employees",
        "AI Agents for Suppliers and Distributors",
        "Excel-to-Software Transformation",
        "Public Institution Communication Systems",
        "Business Intelligence Platforms",
        "Web Applications for Global Operations"
      ]
    },
    sector: {
      eyebrow: "Public & Private Sector",
      title: "Experience across public and private sector needs.",
      body:
        "My work focuses on building technology for both private companies and public-sector contexts, including business operations, institutional communication, citizen support, customer service, internal management, automation and data-driven decision-making.",
      groups: [
        "Companies",
        "Public institutions",
        "Local governments / mayor’s offices",
        "Suppliers",
        "Distributors",
        "Internal teams",
        "Executives",
        "Customers / citizens"
      ]
    },
    downloads: {
      eyebrow: "Download",
      title: "Download a concise CV.",
      body:
        "Choose the language your team prefers. The web version remains interactive, and the PDF files are ready for sharing.",
      english: "Download CV in English",
      spanish: "Descargar CV en Español"
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s build the software your company actually needs.",
      subtitle:
        "If your company depends on Excel, manual processes or disconnected tools, I can help you turn that operation into a centralized, intelligent and scalable software system.",
      emailLabel: "Email",
      phoneLabel: "WhatsApp / Phone",
      linkedinLabel: "LinkedIn",
      locationLabel: "Location",
      contactButton: "Contact Tolentino SW",
      mailSubject: "Business software consultation with Tolentino SW"
    },
    footer:
      "© 2026 Tolentino SW - Custom Software, AI Systems and Digital Solutions."
  },
  es: {
    languageName: "Español",
    nav: [
      { href: "#services", label: "Servicios" },
      { href: "#projects", label: "Proyectos" },
      { href: "#process", label: "Proceso" },
      { href: "#contact", label: "Contacto" }
    ],
    hero: {
      eyebrow: "Fundador y Desarrollador de Soluciones Tecnológicas",
      title: "Sebastián Solórzano Carvajal",
      role: "Fundador y Desarrollador de Software en Tolentino SW",
      headline:
        "Construyo software a la medida, sistemas con inteligencia artificial, bases de datos empresariales y plataformas digitales para compañías que necesitan organizar, automatizar y escalar su operación.",
      subheadline:
        "A través de Tolentino SW, creo soluciones digitales para organizaciones públicas y privadas, incluyendo empresas, instituciones, gobiernos locales y equipos que necesitan tecnología adaptada a sus necesidades reales.",
      asia:
        "Posicionado para colaboración B2B internacional con fundadores, operadores y directivos conectados con Asia que necesitan software práctico para crecer.",
      cardText:
        "Software a la medida, sistemas de IA y bases de datos para operaciones globales.",
      buttons: {
        projects: "Ver proyectos",
        download: "Descargar CV",
        contact: "Contactarme"
      },
      badges: [
        "Software a la medida",
        "Inteligencia Artificial",
        "Bases de datos empresariales",
        "Sistemas CRM",
        "Dashboards",
        "UX/UI",
        "Soluciones para sector público y privado"
      ],
      stats: [
        { value: "B2B", label: "Enfoque de software" },
        { value: "IA + Datos", label: "Capacidad principal" },
        { value: "Global", label: "Disponibilidad remota" }
      ]
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Tecnología que se adapta al negocio, no al revés.",
      body:
        "Soy Sebastián Solórzano Carvajal, fundador de Tolentino SW, una empresa de soluciones digitales enfocada en construir software especializado para empresas y organizaciones. Entiendo que cada compañía tiene necesidades, procesos y desafíos diferentes, por eso desarrollo tecnología que se adapta a cada organización en lugar de obligarla a usar herramientas genéricas.",
      points: [
        "Software a la medida para empresas, instituciones y equipos internos",
        "Bases de datos robustas para reemplazar procesos basados en Excel",
        "Asistentes de IA para clientes, empleados, proveedores y distribuidores",
        "Dashboards ejecutivos, reportes y soporte para toma de decisiones",
        "UX/UI, capacitación y acompañamiento para usuarios no técnicos",
        "Experiencia con necesidades del sector público y privado"
      ]
    },
    services: {
      eyebrow: "Especialidades",
      title: "Capacidades de software empresarial para operaciones reales.",
      description:
        "Un conjunto de servicios enfocado en organizaciones que necesitan control, visibilidad, automatización e infraestructura digital escalable.",
      items: [
        {
          title: "Desarrollo de software a la medida",
          description:
            "Sistemas adaptados a la operación interna, clientes, proveedores, distribuidores y equipos de cada empresa."
        },
        {
          title: "Bases de datos empresariales",
          description:
            "Bases de datos robustas para reemplazar flujos de Excel, centralizar información y mejorar el control operativo."
        },
        {
          title: "Sistemas de inteligencia artificial",
          description:
            "Asistentes y agentes de IA para atención al cliente, empleados internos, proveedores, distribuidores y reportes ejecutivos."
        },
        {
          title: "CRM y plataformas internas",
          description:
            "CRM y plataformas internas para gestionar clientes, contactos, ventas, proveedores, seguimientos, categorías y flujos empresariales."
        },
        {
          title: "Dashboards y métricas",
          description:
            "Dashboards ejecutivos con métricas en tiempo real, segmentación, categorías, gráficas y reportes de rendimiento."
        },
        {
          title: "Diseño UX/UI",
          description:
            "Interfaces intuitivas diseñadas para usuarios reales, haciendo fáciles de usar los sistemas empresariales complejos."
        },
        {
          title: "Ciberseguridad y escalabilidad",
          description:
            "Arquitectura enfocada en seguridad, roles, permisos, escalabilidad y crecimiento empresarial a largo plazo."
        },
        {
          title: "Capacitación e implementación",
          description:
            "Entrenamiento y soporte para que los equipos adopten correctamente el software implementado."
        }
      ]
    },
    value: {
      eyebrow: "Valor empresarial",
      title: "Cómo ayudo a empresas a escalar su operación.",
      lead:
        "Ayudo a organizaciones a transformar procesos manuales y datos fragmentados en sistemas centralizados, escalables e inteligentes.",
      items: [
        "Reemplazar Excel con sistemas digitales centralizados",
        "Organizar información dispersa",
        "Construir bases de datos empresariales robustas",
        "Crear dashboards con métricas en tiempo real",
        "Automatizar procesos repetitivos",
        "Detectar fallas operativas",
        "Generar reportes inmediatos",
        "Mejorar la comunicación entre equipos",
        "Apoyar directivos con datos actualizados",
        "Crear agentes de IA para usuarios internos y externos",
        "Mejorar decisiones mediante estadísticas y gráficas",
        "Construir sistemas para clientes, empleados, proveedores y distribuidores"
      ]
    },
    projects: {
      eyebrow: "Trabajo seleccionado",
      title: "Proyectos pensados para comunicación, comercio y operación.",
      carouselEyebrow: "Proyectos en vivo",
      carouselTitle: "Lanzamientos interactivos y webs empresariales.",
      carouselDescription:
        "Un carrusel rápido de proyectos reales, tiendas online, menús digitales y experiencias de atención con IA.",
      liveItems: [
        {
          name: "Crepes & Waffles Menú Digital",
          category: "Menú de restaurante con IA",
          description:
            "Menú interactivo para clientes con UX multilenguaje, navegación de productos y ruta hacia WhatsApp IA.",
          image: "/projects/crepes-waffles.png",
          href: "https://crepes-and-waffles.vercel.app/cliente",
          cta: "Abrir menú",
          tags: ["Restaurante", "Menú digital", "WhatsApp IA"]
        },
        {
          name: "WhatsApp AI Assistant",
          category: "IA conversacional",
          description:
            "Acceso directo por WhatsApp a un asistente de IA para atención, soporte y automatización empresarial.",
          image: "/projects/whatsapp-ia.svg",
          href: "https://wa.me/573001330213",
          cta: "Abrir WhatsApp IA",
          tags: ["WhatsApp", "Asistente IA", "Automatización"]
        },
        {
          name: "Perrote y Gatote",
          category: "E-commerce de mascotas",
          description:
            "Experiencia online para productos de mascotas con categorías visuales, navegación rápida y flujo de compra.",
          image: "/projects/perrote-gatote.png",
          href: "https://www.perroteygatote.com/",
          cta: "Abrir tienda",
          tags: ["E-commerce", "Catálogo", "Mascotas"]
        },
        {
          name: "Gorras Sigma / Buff-Head COL",
          category: "Landing retail",
          description:
            "Landing comercial para gorras, servicios de personalización y posicionamiento de venta nacional.",
          image: "/projects/gorras-sigma.png",
          href: "https://gorras-sigma.vercel.app/",
          cta: "Abrir proyecto",
          tags: ["Retail", "Landing page", "Catálogo"]
        },
        {
          name: "Celus Col",
          category: "Celulares y servicios",
          description:
            "Vitrina tecnológica para celulares, accesorios, servicios técnicos y reparaciones.",
          image: "/projects/celus-col.png",
          href: "https://celus-col.vercel.app/",
          cta: "Abrir proyecto",
          tags: ["Tienda tech", "Servicios", "Web responsive"]
        },
        {
          name: "Ferre Col",
          category: "Web de ferretería",
          description:
            "Concepto web limpio para productos de ferretería, herramientas y servicios de materiales de construcción.",
          image: "/projects/ferre-col.png",
          href: "https://ferre-col.vercel.app/",
          cta: "Abrir proyecto",
          tags: ["Web empresarial", "Productos", "Servicios locales"]
        }
      ],
      items: [
        {
          name: "Rionegro AI WhatsApp Assistant",
          description:
            "Sistema de comunicación con IA diseñado para comunicación institucional, atención ciudadana, anuncios, reportes y gestión administrativa.",
          features: [
            "Automatización de WhatsApp",
            "Respuestas con IA",
            "Dashboard administrativo",
            "Reportes ciudadanos",
            "Base de conocimiento",
            "Métricas",
            "Anuncios programados",
            "Caso de uso institucional"
          ],
          tech:
            "Next.js, Node.js, PostgreSQL, Prisma, OpenAI, WhatsApp API, Render, Vercel",
          impact:
            "Construido como MVP escalable para comunicación pública y atención ciudadana."
        },
        {
          name: "VoiceCart AI",
          description:
            "Asistente de comercio por voz y WhatsApp diseñado para buscar productos, resolver preguntas, confirmar pedidos e interactuar con una tienda mediante IA.",
          features: [
            "Asistente de voz",
            "Integración con WhatsApp",
            "Guía de productos con IA",
            "Flujo de pedidos",
            "Interacción con clientes",
            "Soporte e-commerce"
          ],
          tech: "Next.js, OpenAI, ElevenLabs, WhatsApp API, Render, Vercel",
          impact:
            "Construido como experiencia de comercio con IA para hacer la compra digital más conversacional."
        },
        {
          name: "Tolentino SW Business Systems",
          description:
            "Sistemas empresariales a la medida enfocados en bases de datos, CRM, dashboards, automatización, agentes de IA y organización operativa.",
          features: [
            "Transformación de Excel a base de datos",
            "Estructura CRM",
            "Organización de proveedores y distribuidores",
            "Dashboards ejecutivos",
            "Agentes de IA para reportes",
            "Interfaces UX/UI",
            "Capacitación y soporte"
          ],
          tech:
            "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, OpenAI, Tailwind CSS",
          impact:
            "Diseñado para compañías que necesitan control, estructura de datos y tecnología interna escalable."
        }
      ]
    },
    stack: {
      eyebrow: "Stack tecnológico",
      title: "Herramientas para plataformas empresariales modernas.",
      items: [
        ["Frontend", "React, Next.js, TypeScript, HTML, CSS, Tailwind CSS"],
        ["Backend", "Node.js, Express, APIs REST, lógica de negocio, automatización"],
        ["Bases de datos", "PostgreSQL, Prisma, SQL, migración Excel/CSV, modelado de datos"],
        [
          "Inteligencia Artificial",
          "OpenAI, agentes de IA, bases de conocimiento, asistentes, flujos inteligentes y respuestas automatizadas"
        ],
        ["Cloud & Deployment", "Vercel, Render, Supabase y plataformas cloud similares"],
        ["Integraciones", "WhatsApp API, UltraMsg, ElevenLabs, Google APIs, APIs externas"],
        [
          "Sistemas empresariales",
          "CRM, dashboards, paneles administrativos, reportes y plataformas internas"
        ],
        ["UX/UI", "Diseño responsive, interfaces amigables y diseño orientado al flujo de trabajo"]
      ]
    },
    process: {
      eyebrow: "Proceso",
      title: "Mi proceso de desarrollo.",
      steps: [
        {
          title: "Discovery",
          description:
            "Entiendo el flujo real de la empresa, herramientas actuales, problemas y objetivos de negocio."
        },
        {
          title: "Estructura de datos",
          description:
            "Diseño la base de datos, categorías, roles, permisos y arquitectura de información."
        },
        {
          title: "Desarrollo de software",
          description:
            "Construyo la plataforma, dashboard, automatizaciones, integraciones y lógica empresarial."
        },
        {
          title: "IA y automatización",
          description:
            "Implemento agentes de IA, flujos inteligentes, reportes y herramientas de soporte a decisiones cuando se necesitan."
        },
        {
          title: "Optimización UX/UI",
          description:
            "Diseño interfaces intuitivas para que empleados y colaboradores puedan usar el sistema fácilmente."
        },
        {
          title: "Capacitación y soporte",
          description:
            "Capacito al equipo y acompaño la adopción del software dentro de la organización."
        }
      ]
    },
    useCases: {
      eyebrow: "Casos de uso",
      title: "Soluciones que puedo construir.",
      items: [
        "Sistemas de inventario",
        "Portales para proveedores y distribuidores",
        "Gestión de relaciones con clientes",
        "Dashboards de operación interna",
        "Reportes ejecutivos",
        "Asistentes de IA para atención al cliente",
        "Agentes de IA para empleados",
        "Agentes de IA para proveedores y distribuidores",
        "Transformación de Excel a software",
        "Sistemas de comunicación institucional",
        "Plataformas de inteligencia de negocio",
        "Aplicaciones web para operaciones globales"
      ]
    },
    sector: {
      eyebrow: "Sector público y privado",
      title: "Experiencia con necesidades del sector público y privado.",
      body:
        "Mi trabajo se enfoca en construir tecnología para empresas privadas y contextos del sector público, incluyendo operación empresarial, comunicación institucional, atención ciudadana, servicio al cliente, gestión interna, automatización y toma de decisiones basada en datos.",
      groups: [
        "Empresas",
        "Instituciones públicas",
        "Gobiernos locales / alcaldías",
        "Proveedores",
        "Distribuidores",
        "Equipos internos",
        "Directivos",
        "Clientes / ciudadanos"
      ]
    },
    downloads: {
      eyebrow: "Descarga",
      title: "Descarga un CV resumido.",
      body:
        "Elige el idioma que prefiera tu equipo. La versión web se mantiene interactiva y los archivos PDF quedan listos para compartir.",
      english: "Download CV in English",
      spanish: "Descargar CV en Español"
    },
    contact: {
      eyebrow: "Contacto",
      title: "Construyamos el software que tu empresa realmente necesita.",
      subtitle:
        "Si tu empresa depende de Excel, procesos manuales o herramientas desconectadas, puedo ayudarte a convertir esa operación en un sistema centralizado, inteligente y escalable.",
      emailLabel: "Correo",
      phoneLabel: "WhatsApp / Teléfono",
      linkedinLabel: "LinkedIn",
      locationLabel: "Ubicación",
      contactButton: "Contactar a Tolentino SW",
      mailSubject: "Consulta de software empresarial con Tolentino SW"
    },
    footer:
      "© 2026 Tolentino SW - Software a la medida, sistemas de IA y soluciones digitales."
  },
  zh: {
    languageName: "中文",
    nav: [
      { href: "#services", label: "服务" },
      { href: "#projects", label: "项目" },
      { href: "#process", label: "流程" },
      { href: "#contact", label: "联系" }
    ],
    hero: {
      eyebrow: "创始人兼技术解决方案开发者",
      title: "Sebastián Solórzano Carvajal",
      role: "Tolentino SW 创始人兼软件开发者",
      headline:
        "我为需要组织、自动化并扩展运营的企业构建定制软件、AI 系统、企业数据库和数字平台。",
      subheadline:
        "通过 Tolentino SW，我为公私营组织、企业、机构、地方政府和运营团队打造符合真实业务需求的数字解决方案。",
      asia:
        "面向亚洲及国际 B2B 合作，服务需要实用软件来增长的创始人、运营负责人和企业管理层。",
      cardText: "面向全球运营的定制软件、AI 系统和企业数据库。",
      buttons: {
        projects: "查看项目",
        download: "下载简历",
        contact: "联系我"
      },
      badges: [
        "定制软件",
        "人工智能",
        "企业数据库",
        "CRM 系统",
        "数据看板",
        "UX/UI",
        "公私营部门解决方案"
      ],
      stats: [
        { value: "B2B", label: "软件方向" },
        { value: "AI + Data", label: "核心能力" },
        { value: "Global", label: "远程合作" }
      ]
    },
    about: {
      eyebrow: "关于",
      title: "让技术适应业务，而不是让业务迁就工具。",
      body:
        "我是 Sebastián Solórzano Carvajal，Tolentino SW 的创始人。Tolentino SW 专注于为企业和组织构建专业数字解决方案与定制软件。我理解每家公司都有不同的流程、挑战和增长目标，因此我构建的是贴合组织实际运营的软件，而不是让企业被通用工具限制。",
      points: [
        "为企业、机构和内部团队构建定制软件",
        "用稳健数据库替代基于 Excel 的流程",
        "为客户、员工、供应商和分销商构建 AI 助手",
        "执行层数据看板、报告系统和决策支持",
        "面向非技术用户的 UX/UI、培训和上线支持",
        "覆盖公私营部门需求的解决方案经验"
      ]
    },
    services: {
      eyebrow: "专业方向",
      title: "面向真实运营场景的企业软件能力。",
      description:
        "为需要控制力、可视化、自动化和可扩展数字基础设施的组织提供聚焦型服务。",
      items: [
        {
          title: "定制软件开发",
          description:
            "为需要系统贴合内部运营、客户、供应商、分销商和团队流程的企业构建定制软件。"
        },
        {
          title: "企业数据库",
          description:
            "设计稳健数据库，用于替代 Excel 流程、集中信息并提升运营控制力。"
        },
        {
          title: "人工智能系统",
          description:
            "为客户服务、内部员工、供应商、分销商和执行报告构建 AI 助手与智能代理。"
        },
        {
          title: "CRM 与内部平台",
          description:
            "构建 CRM 和内部平台，用于管理客户、联系人、销售、供应商、跟进、分类和业务流程。"
        },
        {
          title: "数据看板与指标",
          description:
            "构建包含实时指标、细分、分类、图表和绩效报告的管理层看板。"
        },
        {
          title: "UX/UI 设计",
          description:
            "为真实用户设计直观界面，让复杂的企业系统更容易被员工和协作者使用。"
        },
        {
          title: "安全与可扩展性",
          description:
            "以安全、角色、权限、可扩展性和长期业务增长为核心的软件架构。"
        },
        {
          title: "培训与实施",
          description:
            "为企业团队提供培训和支持，确保软件能够被顺利采用并产生实际价值。"
        }
      ]
    },
    value: {
      eyebrow: "商业价值",
      title: "我如何帮助企业扩展运营。",
      lead:
        "我帮助组织将人工流程和分散数据转化为集中、可扩展且智能的软件系统。",
      items: [
        "用集中式数字系统替代 Excel",
        "整理分散的信息",
        "构建稳健的企业数据库",
        "创建实时指标数据看板",
        "自动化重复流程",
        "发现运营漏洞",
        "即时生成报告",
        "改善团队之间的沟通",
        "用最新数据支持管理层",
        "为内部和外部用户创建 AI 代理",
        "通过统计和图表提升决策质量",
        "为客户、员工、供应商和分销商构建系统"
      ]
    },
    projects: {
      eyebrow: "精选项目",
      title: "围绕沟通、商业和运营打造的项目。",
      carouselEyebrow: "在线项目",
      carouselTitle: "交互式上线项目和企业网站。",
      carouselDescription:
        "展示真实项目、线上商店、数字菜单以及 AI 辅助客户体验的快速轮播。",
      liveItems: [
        {
          name: "Crepes & Waffles 数字菜单",
          category: "AI 辅助餐厅菜单",
          description:
            "面向客户的交互式菜单，包含多语言体验、产品浏览和 WhatsApp AI 联系路径。",
          image: "/projects/crepes-waffles.png",
          href: "https://crepes-and-waffles.vercel.app/cliente",
          cta: "打开菜单",
          tags: ["餐厅 UX", "数字菜单", "WhatsApp AI"]
        },
        {
          name: "WhatsApp AI Assistant",
          category: "对话式 AI",
          description:
            "通过 WhatsApp 直接访问 AI 助手，用于客户互动、支持和业务自动化。",
          image: "/projects/whatsapp-ia.svg",
          href: "https://wa.me/573001330213",
          cta: "打开 AI WhatsApp",
          tags: ["WhatsApp", "AI 助手", "自动化"]
        },
        {
          name: "Perrote y Gatote",
          category: "宠物电商",
          description:
            "宠物用品在线购物体验，包含可视化分类、快速浏览和直接购买流程。",
          image: "/projects/perrote-gatote.png",
          href: "https://www.perroteygatote.com/",
          cta: "打开商店",
          tags: ["电商", "产品目录", "宠物"]
        },
        {
          name: "Gorras Sigma / Buff-Head COL",
          category: "零售落地页",
          description:
            "用于帽子销售、定制服务和全国销售定位的商业落地页。",
          image: "/projects/gorras-sigma.png",
          href: "https://gorras-sigma.vercel.app/",
          cta: "打开项目",
          tags: ["零售", "落地页", "目录"]
        },
        {
          name: "Celus Col",
          category: "手机与技术服务",
          description:
            "面向手机、配件、技术服务和维修的科技门店展示网站。",
          image: "/projects/celus-col.png",
          href: "https://celus-col.vercel.app/",
          cta: "打开项目",
          tags: ["科技商店", "服务", "响应式网站"]
        },
        {
          name: "Ferre Col",
          category: "五金商店网站",
          description:
            "用于五金产品、工具和建筑材料服务的简洁企业网站概念。",
          image: "/projects/ferre-col.png",
          href: "https://ferre-col.vercel.app/",
          cta: "打开项目",
          tags: ["企业网站", "产品", "本地服务"]
        }
      ],
      items: [
        {
          name: "Rionegro AI WhatsApp Assistant",
          description:
            "面向机构沟通、市民支持、公告、报告和行政管理的 AI 通信系统。",
          features: [
            "WhatsApp 自动化",
            "AI 回复",
            "管理后台",
            "市民报告",
            "知识库",
            "指标",
            "定时公告",
            "公共机构场景"
          ],
          tech:
            "Next.js, Node.js, PostgreSQL, Prisma, OpenAI, WhatsApp API, Render, Vercel",
          impact:
            "作为公共部门沟通与市民服务的可扩展 MVP 构建。"
        },
        {
          name: "VoiceCart AI",
          description:
            "语音与 WhatsApp 商务助手，帮助用户搜索产品、提问、确认订单并通过 AI 与在线商店互动。",
          features: [
            "语音助手",
            "WhatsApp 集成",
            "AI 产品引导",
            "订单流程",
            "客户互动",
            "电商支持"
          ],
          tech: "Next.js, OpenAI, ElevenLabs, WhatsApp API, Render, Vercel",
          impact:
            "构建为 AI 驱动的电商体验，让数字购物更加简单和对话化。"
        },
        {
          name: "Tolentino SW Business Systems",
          description:
            "面向企业数据库、CRM、看板、自动化、AI 代理和运营组织的定制业务系统。",
          features: [
            "Excel 转数据库",
            "CRM 结构",
            "供应商和分销商组织",
            "管理层看板",
            "AI 报告代理",
            "UX/UI 界面",
            "培训和支持"
          ],
          tech:
            "Next.js, React, TypeScript, Node.js, PostgreSQL, Prisma, OpenAI, Tailwind CSS",
          impact:
            "为需要控制力、数据结构和可扩展内部技术的企业而设计。"
        }
      ]
    },
    stack: {
      eyebrow: "技术栈",
      title: "构建现代企业平台的工具。",
      items: [
        ["前端", "React, Next.js, TypeScript, HTML, CSS, Tailwind CSS"],
        ["后端", "Node.js, Express, REST APIs, 业务逻辑, 自动化流程"],
        ["数据库", "PostgreSQL, Prisma, SQL, Excel/CSV 数据迁移, 数据建模"],
        [
          "人工智能",
          "OpenAI, AI 代理, 知识库, AI 助手, 智能流程, 自动回复"
        ],
        ["云端与部署", "Vercel, Render, Supabase 以及类似云平台"],
        ["集成", "WhatsApp API, UltraMsg, ElevenLabs, Google APIs, 外部 API"],
        [
          "企业系统",
          "CRM, 数据看板, 管理后台, 报告系统, 内部管理平台"
        ],
        ["UX/UI", "响应式设计, 易用界面, 业务流程设计"]
      ]
    },
    process: {
      eyebrow: "流程",
      title: "我的开发流程。",
      steps: [
        {
          title: "需求发现",
          description:
            "了解公司的真实工作流、现有工具、痛点和业务目标。"
        },
        {
          title: "数据结构",
          description:
            "设计数据库、分类、用户角色、权限和信息架构。"
        },
        {
          title: "软件开发",
          description:
            "构建平台、看板、自动化、集成和业务逻辑。"
        },
        {
          title: "AI 与自动化",
          description:
            "在需要时实现 AI 代理、智能流程、报告和决策支持工具。"
        },
        {
          title: "UX/UI 优化",
          description:
            "设计直观界面，让员工和协作者能够轻松使用系统。"
        },
        {
          title: "培训与支持",
          description:
            "培训团队并支持软件在组织内部的采用。"
        }
      ]
    },
    useCases: {
      eyebrow: "应用场景",
      title: "我可以构建的解决方案。",
      items: [
        "库存管理系统",
        "供应商与分销商门户",
        "客户关系管理",
        "内部运营看板",
        "管理层报告",
        "AI 客户服务助手",
        "员工 AI 代理",
        "供应商和分销商 AI 代理",
        "Excel 转软件系统",
        "公共机构沟通系统",
        "商业智能平台",
        "面向全球运营的 Web 应用"
      ]
    },
    sector: {
      eyebrow: "公私营部门",
      title: "覆盖公私营部门需求的经验。",
      body:
        "我的工作聚焦于为私营企业和公共部门场景构建技术，包括业务运营、机构沟通、市民支持、客户服务、内部管理、自动化和数据驱动决策。",
      groups: [
        "企业",
        "公共机构",
        "地方政府 / 市政部门",
        "供应商",
        "分销商",
        "内部团队",
        "管理层",
        "客户 / 市民"
      ]
    },
    downloads: {
      eyebrow: "下载",
      title: "下载简明版简历。",
      body:
        "请选择团队偏好的语言。网页版本保持交互式，PDF 文件可直接分享。",
      english: "下载英文简历",
      spanish: "下载西班牙语简历"
    },
    contact: {
      eyebrow: "联系",
      title: "让我们构建你的公司真正需要的软件。",
      subtitle:
        "如果你的公司依赖 Excel、人工流程或彼此断开的工具，我可以帮助你把运营转化为集中、智能且可扩展的软件系统。",
      emailLabel: "邮箱",
      phoneLabel: "WhatsApp / 电话",
      linkedinLabel: "LinkedIn",
      locationLabel: "位置",
      contactButton: "联系 Tolentino SW",
      mailSubject: "Tolentino SW 企业软件咨询"
    },
    footer:
      "© 2026 Tolentino SW - 定制软件、AI 系统和数字解决方案。"
  }
} as const;
