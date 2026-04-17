// import { useState, useRef, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import SiteCard from "../components/SiteCard/SiteCard";
// import { useTranslate } from "../hooks/useTranslate";
// import { motion, AnimatePresence } from "framer-motion";
// import sitesDataJson from "../data/sites.json";
// import { SitesData } from "../components/SiteCard/SiteCard.types";

// export default function Category() {
//   const { category } = useParams();
//   const { t } = useTranslate();

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const sitesData = sitesDataJson as SitesData;

//   const categoryData = sitesData.categories.find((c) => c.slug === category);
//   const sites = categoryData?.sites || [];

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   if (!categoryData) return null;

//   // ================= MOBILE =================
//   if (isMobile) {
//     return (
//       <div className="min-h-screen">
//         <h1 className="sticky top-[60px] h-[50px] w-full px-5 items-center inline-flex justify-center  border-b border-white/5 text-2xl font-medium text-center  text-[#e5e7eb]">
//           {t(categoryData.titleKey)}
//         </h1>
//         <div className="flex flex-col snap-y snap-mandatory pb-[50vh]">
//           {sites.map((site) => (
//             <SiteCard key={site.id} site={site} variant="mobile-row" />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // ================= DESKTOP =================
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//       <div className="p-4">
//         <h1 className="text-3xl font-medium text-center mb-4 text-[#E5E7EB]">
//           {t(categoryData.titleKey)}
//         </h1>

//         <p className="text-sm font-medium text-center mb-4 text-[#E5E7EB]">
//           {t(categoryData.desc)}
//         </p>

//         <div className="flex flex-wrap justify-center">
//           {sites.map((site) => (
//             <SiteCard key={site.id} site={site} variant="default" />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SiteCard from "../components/SiteCard/SiteCard";
import { useTranslate } from "../hooks/useTranslate";
import sitesDataJson from "../data/sites.json";
import { SitesData } from "../components/SiteCard/SiteCard.types";
import { useThemeStore } from "../store/theme/theme.store";

export default function Category() {
  const { category } = useParams();
  const { t } = useTranslate();
  const theme = useThemeStore((s) => s.theme);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const sitesData = sitesDataJson as SitesData;
  const categoryData = sitesData.categories.find((c) => c.slug === category);
  const sites = categoryData?.sites || [];

  const isDark = theme === "dark";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!categoryData) return null;

  // ================= MOBILE =================
  if (isMobile) {
    return (
      <div className="min-h-screen">
        <h1
          className={`
            sticky top-[60px] h-[50px] w-full px-5
            inline-flex items-center justify-center
            border-b text-2xl font-medium text-center z-20
            ${
              isDark
                ? "bg-[#0F172A] border-white/5 text-[#E5E7EB]"
                : "bg-[#F8FAFC] border-[#D7E0EA] text-[#0F172A]"
            }
          `}
        >
          {t(categoryData.titleKey)}
        </h1>

        <div className="flex flex-col snap-y snap-mandatory pb-[50vh]">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} variant="mobile-row" />
          ))}
        </div>
      </div>
    );
  }

  // ================= DESKTOP =================
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="p-4">
        <h1
          className={`text-3xl font-medium text-center mb-4 ${
            isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
          }`}
        >
          {t(categoryData.titleKey)}
        </h1>

        <p
          className={`text-sm font-medium text-center mb-4 ${
            isDark ? "text-[#CBD5E1]" : "text-[#475569]"
          }`}
        >
          {t(categoryData.desc)}
        </p>

        <div className="flex flex-wrap justify-center">
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} variant="default" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}