import { useLocaleStore } from '../store/localeStore';
import { translations } from '../store/localeStore'

export const useTranslate = () => {
  const locale = useLocaleStore((s) => s.lang)

  const t = (key: string, fallback = ''): string => {
    return translations[locale]?.[key] ?? (fallback || key)
  }

  return { t }
}
