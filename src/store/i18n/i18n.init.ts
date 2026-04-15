import { useI18nStore } from './i18n.store';
import { Locale } from './messages';

export function initI18n() {
  const saved = localStorage.getItem('locale') as Locale | null;

  if (saved) {
    useI18nStore.getState().setLocale(saved);
  }
}
