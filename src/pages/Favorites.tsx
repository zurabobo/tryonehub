import { useFavoritesStore } from "../store/favorites/favorites.store";
import SiteCard from "../components/SiteCard/SiteCard";
import sitesData from "../data/sites.json";
import { useTranslate } from "../hooks/useTranslate";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/theme/theme.store";

export default function Favorites() {
  const { t } = useTranslate();
  const favoriteIds = useFavoritesStore((state) => state.ids);
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  const categories = sitesData?.categories || [];

  const groupedFavorites = categories
    .map((category) => {
      const sitesInCategory = (category.sites || []).filter((site) =>
        favoriteIds.includes(site.intDesc)
      );

      return {
        slug: category.slug,
        title: category.titleKey,
        sites: sitesInCategory,
      };
    })
    .filter((category) => category.sites.length > 0);

  if (groupedFavorites.length === 0) {
    return (
      <p className="text-[#e9e9e9] text-center mt-6 text-lg">
        {t("favorite_info")}
      </p>
    );
  }

  return (
    <div className="md:px-6 pb-6 mt-6">
      <h1
        className={`text-3xl font-medium text-center mb-4 ${isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
          }`}
      >
        {t("header_favorites")}
      </h1>

      {/* MAIN GRID */}
      <div className="grid auto-rows-max [grid-template-columns:repeat(auto-fit,minmax(270px,1fr))]">
        {groupedFavorites.map((category) => (
          <div
            key={category.slug}

            className={`border-b 
md:border-b-0 md:border-l
md:border-r
last:border-b-0
pl-6 pr-6 pb-2 md:mb-10 mb-4 flex flex-col items-center ${isDark ? "border-white/10" : "border-[#0F172A]/10"}`}
          >
            {/* Category Title */}
            <h2 className={`text-[16px]  mb-2 text-center ${isDark ? "text-[#E5E7EB]" : "text-[#0F172A]"
              }`}>
              {t(category.title)}
            </h2>

            <AnimatePresence>
              {category.sites.map((site) => (
                <motion.div
                  key={site.intDesc}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <SiteCard
                    site={site}
                    showPreview={false}
                    variant="favorites"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
