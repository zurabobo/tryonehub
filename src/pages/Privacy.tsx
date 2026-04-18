import { Helmet } from "react-helmet-async";
import { useThemeStore } from "../store/theme/theme.store";
import { useTranslate } from "../hooks/useTranslate";

export default function Privacy() {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";
  const { t } = useTranslate();

  const paragraphs = t("privacy_text")
    .split("\n\n")
    .filter(Boolean);

  return (
    <div className="p-4">
      <Helmet>
        <title>Privacy Policy | TryOneHub</title>
        <meta
          name="description"
          content="Read the privacy policy of TryOneHub and learn how cookies, analytics, and site functionality may be used to improve the user experience."
        />
      </Helmet>

      <h1
        className={`text-3xl font-bold text-center mb-4 ${
          isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
        }`}
      >
        {t("privacy_title")}
      </h1>

      <div className="max-w-[800px] mx-auto">
        <p className={`mb-4 text-center  ${
              isDark ? "text-[#CBD5E1]" : "text-[#475569]"
            }`}>{t("privacy_update")}</p>
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`mb-4 leading-7 ${
              isDark ? "text-[#CBD5E1]" : "text-[#475569]"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}