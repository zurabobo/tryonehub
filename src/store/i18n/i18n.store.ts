import {create} from "zustand";

type Messages = Record<string, string>;

type I18nState = {
  locale: string;
  messages: Record<string, Messages>;
  setLocale: (locale: string) => void;
  registerMessages: (locale: string, msgs: Messages) => void;
  t: (key: string) => string;
};

export const useI18n = create<I18nState>((set, get) => ({
  locale: "ru",
  messages: {
    ru: {} // можно зарегистрировать сообщения при старте
  },
  setLocale: (locale: string) => set({ locale }),
  registerMessages: (locale: string, msgs: Messages) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [locale]: { ...(s.messages[locale] || {}), ...msgs },
      },
    })),
  t: (key: string) => {
    const { locale, messages } = get();
    return messages[locale]?.[key] ?? messages["en"]?.[key] ?? key;
  },
}));