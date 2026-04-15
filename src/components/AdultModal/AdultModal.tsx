import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";

type Props = {
  slug: string;
  onClose: () => void;
};

export default function AdultModal({ slug, onClose }: Props) {
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="fixed top-[0] left-[0] w-full h-full bg-[rgba(0,_0,_0,_0.6)] flex justify-center items-center z-50">
      <div className="bg-[#fff] p-[24px] rounded-[10px] w-[350px] text-center">
        <h3 className="text-[#444] font-semibold mb-[8px]">
          {t("adult_text")}
        </h3>
        <p className="text-[#444] mb-[8px]">{t("adult_info")}</p>

        <button
          className="px-[16px] py-[10px] text-[#444] bg-[#E5E7EB] border-none m-[10px] rounded-[6px] cursor-pointer text-[1rem]"
          onClick={() => {
            navigate(`/category/${slug}`);
            onClose();
          }}
        >
          {t("adult_age")}
        </button>

        <button
          className="px-[16px] text-[#444] py-[10px] bg-[#E5E7EB] border-none m-[10px] rounded-[6px] cursor-pointer text-[1rem]"
          onClick={onClose}
        >
          {t("adult_confirm")}
        </button>
      </div>
    </div>
  );
}
