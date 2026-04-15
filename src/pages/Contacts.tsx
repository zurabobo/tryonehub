import { Helmet } from "react-helmet-async";
import { useTranslate } from "../hooks/useTranslate";

function Contacts() {
  const { t } = useTranslate();
  return (
    <div className="p-[20px]  text-[#e5e7eb]">
      <Helmet>
        <title>Contact Us | TryOneHub</title>
        <meta
          name="description"
          content="Contact TryOneHub for feedback, suggestions, partnerships, or general questions about the website."
        />
      </Helmet>
      <h2 className="text-[1.875rem] font-bold text-center mb-[16px]">
        {t("contacts_title")}
      </h2>
      <p className="max-w-[800px] mt-[0] mx-[auto] mb-[16px]">
        {t("contacts_text")}
      </p>
    </div>
  );
}

export default Contacts;
