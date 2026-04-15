import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ru, en, ka, type Language } from '../locales';
import type { Translations } from '../locales';


type Translation = Record<string, string>;
export const LOCALES = {
  GEORGIAN: 'ka',
  ENGLISH: 'en',
  RUSSIAN: 'ru',
} as const;

interface LocaleState {
  lang: Language;
  translations: Translation;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

export const translations: Record<Language, Translation> = {
  ka,
  en,
  ru,
};

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      lang: LOCALES.GEORGIAN,
      translations: translations[LOCALES.GEORGIAN],
      setLang: (lang) => {
        set({
          lang,
          translations: translations[lang] || translations[LOCALES.GEORGIAN],
        });
      },
      t: (key) => {
        const { lang } = get();
        return translations[lang]?.[key] ?? translations.ka?.[key] ?? translations.en?.[key] ?? key;
      },
    }),
    { name: 'locale-storage' }
  )
);

export { Language };
