// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { ru, en, ka, type Language } from '../locales';
// import type { Translations } from '../locales';

// type Translation = Record<string, string>;

// export const LOCALES = {
//   GEORGIAN: 'ka',
//   ENGLISH: 'en',
//   RUSSIAN: 'ru',
// } as const;

// interface LocaleState {
//   lang: Language;
//   translations: Translation;
//   setLang: (lang: Language) => void;
//   t: (key: keyof Translations) => string;
// }

// export const translations: Record<Language, Translation> = {
//   ka,
//   en,
//   ru,
// };

// const detectInitialLanguage = (): Language => {
//   if (typeof window === 'undefined') {
//     return LOCALES.ENGLISH;
//   }

//   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const browserLang = window.navigator.language.toLowerCase();

//   // თუ მომხმარებელი საქართველოშია -> ქართული
//   if (timeZone === 'Asia/Tbilisi') {
//     return LOCALES.GEORGIAN;
//   }

//   // საქართველოს გარეთ -> ბრაუზერის ენით
//   if (browserLang.startsWith('ru')) {
//     return LOCALES.RUSSIAN;
//   }

//   // ყველა დანარჩენი -> ინგლისური
//   return LOCALES.ENGLISH;
// };

// export const useLocaleStore = create<LocaleState>()(
//   persist(
//     (set, get) => {
//       const initialLang = detectInitialLanguage();

//       return {
//         lang: initialLang,
//         translations: translations[initialLang],

//         setLang: (lang) => {
//           set({
//             lang,
//             translations: translations[lang] || translations[LOCALES.ENGLISH],
//           });
//         },

//         t: (key) => {
//           const { lang } = get();

//           return (
//             translations[lang]?.[key] ??
//             translations[LOCALES.ENGLISH]?.[key] ??
//             translations[LOCALES.GEORGIAN]?.[key] ??
//             key
//           );
//         },
//       };
//     },
//     {
//       name: 'locale-storage',
//     }
//   )
// );

// export { Language };

import { create } from "zustand";
import { ru, en, ka, type Language } from "../locales";
import type { Translations } from "../locales";

type Translation = Record<string, string>;

export const LOCALES = {
  GEORGIAN: "ka",
  ENGLISH: "en",
  RUSSIAN: "ru",
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

export const useLocaleStore = create<LocaleState>()((set, get) => ({
  lang: LOCALES.GEORGIAN,
  translations: translations[LOCALES.GEORGIAN],

  setLang: (lang) => {
    set({
      lang,
      translations: translations[lang] || translations[LOCALES.ENGLISH],
    });
  },

  t: (key) => {
    const { lang } = get();

    return (
      translations[lang]?.[key] ??
      translations[LOCALES.ENGLISH]?.[key] ??
      translations[LOCALES.GEORGIAN]?.[key] ??
      key
    );
  },
}));

export { Language };