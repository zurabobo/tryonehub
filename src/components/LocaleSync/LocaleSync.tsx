import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocaleStore } from "../../store/localeStore";
import { isValidLocale } from "../../utils/locale";

export default function LocaleSync() {
  const { lang } = useParams();
  const setLang = useLocaleStore((s) => s.setLang);

  useEffect(() => {
    if (isValidLocale(lang)) {
      setLang(lang);
    }
  }, [lang, setLang]);

  return null;
}