import type { ShowcaseCopy } from '../types';
export const en: ShowcaseCopy = {
  featured: 'Featured project',
  badge: 'B2B software platform',
  lead: 'From part number to next opportunity.',
  summary:
    'Clients, inventory, sourcing and data intelligence in one workspace for the electronic components business.',
  back: 'Back to portfolio',
  explore: 'Explore capabilities',
  live: 'Live platform',
  auth: 'Operational access may require an account.',
  study:
    'Developed software, presented as a case study. This public presentation requires no sign-in.',
  overview: 'The product',
  problemLabel: 'The challenge',
  problemTitle: 'Scattered data. Disconnected decisions.',
  problemBody:
    'A part number lives in one spreadsheet, availability in another, and the buyer’s requirement in a conversation. Reconstructing that context takes manual searches and makes commercial follow-up difficult.',
  solutionLabel: 'The approach',
  solutionTitle: 'A shared context for every component.',
  solutionBody:
    'Electronic Parts Intelligence brings together organizations, catalog records, stock and requirements. It connects information retrieval with opportunity analysis and teamwork, without claiming unmeasured commercial results.',
  modulesTitle: 'One product. Connected operations.',
  modulesIntro:
    'Explore each module’s purpose and workflow. Schematic views explain the product; they are not connected sessions or actual results.',
  moduleFlow: 'Module workflow',
  modules: [
    [
      'Clients',
      'Commercial context starts here.',
      'An organization directory and client profiles provide context before working on requirements. The supplied screenshot shows this module.',
      'Directory → organization profile → commercial context',
    ],
    [
      'Opportunity Finder',
      'Connect demand with availability.',
      'The reviewed code normalizes MPNs and evaluates stock, demand and offers. A matching reference alone does not represent a confirmed sale.',
      'Source files → MPN comparison → opportunity review',
    ],
    [
      'Stock and Needs',
      'Understand what can be covered.',
      'The model distinguishes stock, partial coverage, shortages and unknown data. Links to source uploads preserve the context of each result.',
      'Requirement → availability → coverage and shortages',
    ],
    [
      'Search',
      'Find the reference in context.',
      'Structured retrieval of records and part numbers. Searchable fields and results are scoped to user access; this search is separate from generative AI.',
      'Query → permitted fields → records',
    ],
    [
      'AI & Data Intelligence',
      'Business questions grounded in evidence.',
      'The assistant combines authorized data tools with deterministic answers and, when configured, language generation through OpenAI. Scope is enforced on the server.',
      'Question → authorized tool → contextual answer',
    ],
    [
      'Chat',
      'Keep collaboration moving.',
      'Conversations between platform participants. The code checks conversation membership and separates access to chat auditing.',
      'Conversation → participants → follow-up',
    ],
    [
      'Uploads',
      'Turn catalogs into searchable information.',
      'Excel and CSV imports with validation and background jobs in the reviewed code. Import errors are part of the tracking workflow.',
      'File → validation and processing → records',
    ],
    [
      'Users & Profiles',
      'Organize who can do what.',
      'The code defines employee, manager, administrator and technical administrator roles. Administrative capabilities are checked by role; production configuration has not been audited.',
      'Account → profile and role → permitted capabilities',
    ],
    [
      'Records',
      'Keep data traceable.',
      'Browse imported and normalized information with references to source uploads. Review the content before using it in commercial analysis.',
      'Upload → normalized record → retrieval',
    ],
    [
      'Clients Administration',
      'Give the directory structure.',
      'Organization creation and editing routes use distinct management capabilities. Administrative maintenance complements commercial browsing.',
      'Management permission → create or edit → directory',
    ],
    [
      'Sourcing',
      'Continue when supply is missing.',
      'The code includes sourcing requests, offers and decisions. Track these activities without presenting an offer as a completed purchase.',
      'Request → offers → review and follow-up',
    ],
  ],
  illustration: 'Illustrative view',
  source: 'Reviewed in code',
  sourceNote:
    'Evidence: supplied interface and local Electronic Parts Demo source review. Exact parity with the deployed version and its operational configuration has not been verified. No real customers, impact metrics or security guarantees are claimed.',
  aiLabel: 'Intelligence in context',
  aiTitle: 'Better questions start with connected data.',
  aiBody:
    'The value goes beyond generating text: retrieve relevant information, respect its scope and explain what supports the answer. This flow represents the reviewed code; this page does not execute data queries.',
  aiSteps: [
    'User question',
    'Application and access control',
    'Authorized data query',
    'Processing',
    'Contextual answer',
  ],
  structuredTitle: 'Structured retrieval',
  structuredBody:
    'Purpose-built tools query MPNs, stock, opportunities and records within the authorized scope. Some results are produced deterministically.',
  generativeTitle: 'Generative language',
  generativeBody:
    'The OpenAI integration processes filtered context when configured. It does not replace the database or imply that every answer uses a generative model.',
  boundaryTitle: 'Permission comes before the answer',
  boundaryBody:
    'The code checks sessions, roles and query scope, filters sensitive fields and limits requests. These are implemented controls, not a certification or a production security audit.',
  architectureTitle: 'Built around the flow of information.',
  architectureBody:
    'Architecture observed in the local code. Hosting and provider configuration of the public demo remain unverified.',
  layers: [
    ['Experience', 'Next.js · React · TypeScript'],
    ['Application', 'Server routes · validation · authorization'],
    ['Data', 'Supabase · PostgreSQL · storage'],
    ['Processing', 'Background imports · optional OpenAI'],
  ],
  workflowTitle: 'From catalog to next commercial step.',
  workflowBody:
    'A possible journey through the reviewed modules. Each step needs appropriate data and permissions; it does not imply fully unattended automation.',
  workflowSteps: [
    'Upload catalogs',
    'Organize records',
    'Search and analyze',
    'Review opportunities',
    'Manage sourcing',
    'Collaborate',
  ],
  videoTitle: 'See the product in motion.',
  videoIntro:
    'Two walkthroughs, one platform. Video language is independent of this presentation’s language.',
  videoEnglish: 'English walkthrough',
  videoChinese: 'Chinese walkthrough',
  videoEnglishBody: 'An English tour of the workspace and commercial workflow.',
  videoChineseBody: 'A Simplified Chinese tour of the modules and their use cases.',
  comingSoon: 'Video coming soon',
  videoError: 'The video is currently unavailable.',
  useTitle: 'For teams working with components.',
  uses: [
    ['Electronics distributors', 'Bring catalogs, availability and commercial context together.'],
    ['B2B sales', 'Prepare conversations using requirements and opportunities.'],
    ['Sourcing teams', 'Track requests and evaluate incoming offers.'],
    ['Catalog management', 'Organize files, references and source records.'],
    ['Purchasing', 'Look up references and analyze supply requirements.'],
  ],
  galleryTitle: 'Inside the workspace.',
  galleryBody:
    'A look at the core modules. Where no publishable screenshot is available, a schematic is clearly labeled as an illustration.',
  placeholder: 'Screenshot pending',
  zoom: 'Enlarge view',
  close: 'Close gallery',
  previous: 'Previous view',
  next: 'Next view',
  screenshot: 'Interface screenshot',
  demoData: 'Demo names and companies do not imply commercial relationships.',
  engineeringTitle: 'The work behind the product.',
  engineering: [
    [
      'Full-stack development',
      'Interface, server routes and data models coordinated around B2B operations.',
    ],
    [
      'Data before promises',
      'Reference normalization, source traceability and a distinction between missing data and availability.',
    ],
    [
      'Explicit boundaries for AI',
      'Separation of data retrieval, authorization and language generation.',
    ],
  ],
  stackLabel: 'Technologies observed in the source',
  contactTitle: 'Let’s talk about your next platform.',
  contactBody:
    'Looking to organize B2B operations or explore a similar solution? Contact the developer to discuss the product or request a demonstration.',
  contact: 'Contact the developer',
  readCase: 'Explore the project',
};
