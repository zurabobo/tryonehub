import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { CategoryCardProps } from "./CategoryCard.types";
import { iconsMap } from "../../constants/iconsMap";
import AdultModal from "../AdultModal/AdultModal";
import { motion } from "framer-motion";

interface Props {
  category: CategoryCardProps;
}

const CategoryCard = ({ category }: Props) => {
  const { t } = useTranslate();
  const navigate = useNavigate();
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

  return (
    <>
      <Link
        className={`
    flex flex-col items-center
    border-2 
    rounded-lg
    p-4 m-2
    w-[250px]
    no-underline
    transition-all duration-300 ease-in-out
    cursor-pointer
 
    ${hovered ? "bg-[#0F172A] border-[#546075]" : "bg-[#1E293B] border-white/15"}
  `}
        to={`/category/${category.slug}`}
        // $hovered={hovered}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
       <motion.div
          animate={{
            scale: hovered ? 1.15 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 8,
          }}
          className={hovered ? "drop-shadow-[0_0_8px_#38BDF8]" : ""}
        >
          <Icon
            size={40}
            stroke={"#38BDF8"}
            strokeWidth={1.2}
            style={{
              opacity: hovered ? 1 : 0.85,
            }}
          />
        </motion.div>

        <h2
          className={`
    text-[1rem] font-medium mt-[6px] mx-[0] mb-[0]   text-center w-full  transform-gpu
    ${hovered ? "text-[#E5E7EB] underline" : "text-[#E5E7EB] "}
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
