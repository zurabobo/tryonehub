export const LOCALES = {
    GEORGIAN: 'ka',
    ENGLISH: 'en',
    RUSSIAN: 'ru',
  } as const;
  
  export type Locale = typeof LOCALES[keyof typeof LOCALES];
  