export const LOCALES = ["ka", "ru", "en"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const isValidLocale = (value?: string): value is AppLocale => {
  return !!value && LOCALES.includes(value as AppLocale);
};

export const detectInitialLocale = (): AppLocale => {
  if (typeof window === "undefined") return "en";

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const browserLang = window.navigator.language.toLowerCase();

  if (timeZone === "Asia/Tbilisi") return "ka";
  if (browserLang.startsWith("ru")) return "ru";
  return "en";
};

