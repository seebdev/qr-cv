import type { Locale } from '../locales';

export type ModuleCopy = [title: string, benefit: string, description: string, workflow: string];
export type ShowcaseCopy = {
  featured: string;
  badge: string;
  lead: string;
  summary: string;
  back: string;
  explore: string;
  live: string;
  auth: string;
  study: string;
  overview: string;
  problemLabel: string;
  problemTitle: string;
  problemBody: string;
  solutionLabel: string;
  solutionTitle: string;
  solutionBody: string;
  modulesTitle: string;
  modulesIntro: string;
  moduleFlow: string;
  modules: ModuleCopy[];
  illustration: string;
  source: string;
  sourceNote: string;
  aiLabel: string;
  aiTitle: string;
  aiBody: string;
  aiSteps: string[];
  structuredTitle: string;
  structuredBody: string;
  generativeTitle: string;
  generativeBody: string;
  boundaryTitle: string;
  boundaryBody: string;
  architectureTitle: string;
  architectureBody: string;
  layers: [string, string][];
  workflowTitle: string;
  workflowBody: string;
  workflowSteps: string[];
  videoTitle: string;
  videoIntro: string;
  videoEnglish: string;
  videoChinese: string;
  videoEnglishBody: string;
  videoChineseBody: string;
  comingSoon: string;
  videoError: string;
  useTitle: string;
  uses: [string, string][];
  galleryTitle: string;
  galleryBody: string;
  placeholder: string;
  zoom: string;
  close: string;
  previous: string;
  next: string;
  screenshot: string;
  demoData: string;
  engineeringTitle: string;
  engineering: [string, string][];
  stackLabel: string;
  contactTitle: string;
  contactBody: string;
  contact: string;
  readCase: string;
};
export type LocalizedText = Record<Locale, string>;
export const moduleIds = [
  'clients',
  'opportunities',
  'stock',
  'search',
  'ai',
  'chat',
  'uploads',
  'users',
  'records',
  'administration',
  'sourcing',
] as const;
export type ModuleId = (typeof moduleIds)[number];
