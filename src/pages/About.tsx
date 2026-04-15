import { Helmet } from "react-helmet-async";
import { useTranslate } from "../hooks/useTranslate";

function About() {
  const { t } = useTranslate();

  return (
    <div className="p-[20px]  text-[#e5e7eb]">
      <Helmet>
        <title>About Us | TryOneHub</title>
        <meta
          name="description"
          content="Learn more about TryOneHub — a multilingual directory of useful websites across categories for Georgian, English, and Russian-speaking users."
        />
      </Helmet>

      <h2 className="text-[1.875rem] font-bold text-center mb-[16px]">
        {t("about_title")}
      </h2>
      <p className="max-w-[800px] mt-[0] mx-[auto] mb-[16px]">
        {t("about_text")}
      </p>
    </div>
  );
}

export default About;
