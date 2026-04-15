import { Helmet } from "react-helmet-async";
import { useTranslate } from "../hooks/useTranslate";

function Privacy() {
  const { t } = useTranslate();

  return (
    <div className="p-[20px]  text-[#e5e7eb]">
      <Helmet>
        <title>Privacy Policy | TryOneHub</title>
        <meta
          name="description"
          content="Read the privacy policy of TryOneHub and learn how cookies, analytics, and site functionality may be used to improve the user experience."
        />
      </Helmet>
      <h2 className="text-[1.875rem] font-bold text-center mb-[16px]">
        {t("privacy_title")}
      </h2>
      {t("privacy_text")
        .split("\n\n")
        .map((p, i) => (
          <p key={i} className="max-w-[800px] mt-[0] mx-[auto] mb-[16px]">
            {p}
          </p>
        ))}
    </div>
  );
}

export default Privacy;
