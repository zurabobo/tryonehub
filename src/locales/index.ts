import { ru } from './ru';
import { en } from './en';
import { ka } from './ka';

import type { Translations } from './types';

export type Language = 'ka' | 'en' | 'ru';

export const languages: Language[] = ['ka', 'en', 'ru'];

export const languageNames: Record<Language, string> = {
  ka: 'ქართული',
  en: 'English',
  ru: 'Русский',
};

export { ru, en, ka };

export type { Translations };