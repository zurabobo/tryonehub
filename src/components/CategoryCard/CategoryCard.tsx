import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { CategoryCardProps } from "./CategoryCard.types";
import { iconsMap } from "../../constants/iconsMap";
import AdultModal from "../AdultModal/AdultModal";
import { motion } from "framer-motion";
import { useThemeStore } from "../../store/theme/theme.store";

interface Props {
  category: CategoryCardProps;
}

const CategoryCard = ({ category }: Props) => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const theme = useThemeStore((s) => s.theme);

  const [hovered, setHovered] = useState(false);
  const [adultSlug, setAdultSlug] = useState<string | null>(null);

  const Icon =
    iconsMap[category.logo as keyof typeof iconsMap] || iconsMap["Sparkles"];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (category.slug === "casino" || category.slug === "Adult") {
      setAdultSlug(category.slug);
      return;
    }

    navigate(`/category/${category.slug}`);
  };

  const isDark = theme === "dark";

  return (
    <>
      <Link
        to={`/category/${category.slug}`}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          flex flex-col items-center
          rounded-lg
          p-4 m-2
          w-[250px]
          no-underline
          cursor-pointer
          border-2
          transform-gpu will-change-transform
          transition-[background-color,border-color,box-shadow] duration-200 ease-out
          ${
            isDark
              ? hovered
                ? "bg-[#0F172A] border-[#546075]"
                : "bg-[#1E293B] border-white/15"
              : hovered
                ? "bg-[#E2E8F0] border-[#CBD5E1]"
                : "bg-white border-[#D7E0EA]"
          }
        `}
      >
        <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          className={hovered ? "drop-shadow-[0_0_8px_#38BDF8]" : ""}
        >
          <Icon
            size={40}
            stroke="#38BDF8"
            strokeWidth={1.2}
            style={{
              opacity: hovered ? 1 : 0.85,
            }}
          />
        </motion.div>

        <h2
          className={`
            text-[1rem] font-medium mt-[6px] mx-0 mb-0 text-center w-full
            transition-colors duration-200
            ${
              isDark
                ? "text-[#E5E7EB]"
                : "text-[#0F172A]"
            }
            ${hovered ? "underline" : ""}
          `}
        >
          {t(category.titleKey)}
        </h2>
      </Link>

      {adultSlug && (
        <AdultModal slug={adultSlug} onClose={() => setAdultSlug(null)} />
      )}
    </>
  );
};

export default memo(CategoryCard);