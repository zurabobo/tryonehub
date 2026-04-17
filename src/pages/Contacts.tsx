import { Helmet } from "react-helmet-async";
import { useTranslate } from "../hooks/useTranslate";
import { useThemeStore } from "../store/theme/theme.store";

function Contacts() {
  const { t } = useTranslate();
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <div className="p-[20px] text-center text-[#e5e7eb]">
      <Helmet>
        <title>Contact Us | TryOneHub</title>
        <meta
          name="description"
          content="Contact TryOneHub for feedback, suggestions, partnerships, or general questions about the website."
        />
      </Helmet>

      <h1
        className={`text-3xl font-bold text-center mb-4 ${
          isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
        }`}
      >
        {t("contacts_title")}
      </h1>
      <p
        className={`max-w-[800px] mx-auto leading-7 ${
          isDark ? "text-[#CBD5E1]" : "text-[#475569]"
        }`}
      >
        {t("contacts_text")}
      </p>
      <a className="text-[#38bdf8]" href="mailto:info@tryonehub.com">
        info@tryonehub.com
      </a>
    </div>
  );
}

export default Contacts;
