import type { Locale } from '../locales';
import type { ShowcaseCopy } from './types';
import { es } from './copy/es';
import { en } from './copy/en';
import { fr } from './copy/fr';
import { de } from './copy/de';
import { it } from './copy/it';
import { zh } from './copy/zh';
import { ja } from './copy/ja';
import { pt } from './copy/pt';

// Imported only by server components. Interactive islands receive the current locale's copy.
export const electronicsCopy: Record<Locale, ShowcaseCopy> = { es, en, fr, de, it, zh, ja, pt };
