import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import SiteCard from "../components/SiteCard/SiteCard";
import { useTranslate } from "../hooks/useTranslate";
import { motion, AnimatePresence } from "framer-motion";
import sitesDataJson from "../data/sites.json";
import { SitesData } from "../components/SiteCard/SiteCard.types";

export default function Category() {
  const { category } = useParams();
  const { t } = useTranslate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const sitesData = sitesDataJson as SitesData;

  const categoryData = sitesData.categories.find((c) => c.slug === category);
  const sites = categoryData?.sites || [];

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
        <h1 className="sticky top-[60px] h-[50px] w-full px-5 items-center inline-flex justify-center  border-b border-white/5 text-2xl font-medium text-center  text-[#e5e7eb]">
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
        <h1 className="text-3xl font-medium text-center mb-4 text-[#E5E7EB]">
          {t(categoryData.titleKey)}
        </h1>

        <p className="text-sm font-medium text-center mb-4 text-[#E5E7EB]">
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
