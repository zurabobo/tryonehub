import { Helmet } from "react-helmet-async";
import { useTranslate } from "../hooks/useTranslate";
import { useThemeStore } from "../store/theme/theme.store";

export default function About() {
  const { t } = useTranslate();
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <div className="p-4">
      <Helmet>
        <title>About Us | TryOneHub</title>
        <meta
          name="description"
          content="Learn more about TryOneHub — a multilingual directory of useful websites across categories for Georgian, English, and Russian-speaking users."
        />
      </Helmet>

      <h1
        className={`text-3xl font-bold text-center mb-4 ${
          isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
        }`}
      >
        {t("about_title")}
      </h1>

      <p
        className={`max-w-[800px] mx-auto leading-7 ${
          isDark ? "text-[#CBD5E1]" : "text-[#475569]"
        }`}
      >
        {t("about_text")}
      </p>
    </div>
  );
}