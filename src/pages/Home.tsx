import { useState } from "react";
import sitesData from "../data/sites.json";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { useTranslate } from "../hooks/useTranslate";

export default function Home() {
  const { t } = useTranslate();
  const [search, setSearch] = useState("");

  const categories = [...sitesData.categories].sort(
    (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
  );

  const filtered = categories
  .filter((cat) => {
    const q = search.toLowerCase();

    return (
      t(cat.titleKey).toLowerCase().includes(q) ||
      cat.slug.toLowerCase().includes(q)
    );
  })
  .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  return (
    <div className="grid grid-rows-[auto_auto_1fr] p-4">
      {/* TITLE */}
      <h1 className="text-center text-[#E5E7EB] text-3xl font-medium mt-[10px] mb-4 font-[mrgvlovani]">
        {t("home_title1")}
      </h1>

      {/* SEARCH */}
      <input
        id="category-search"
        name="category-search"
        placeholder={t("home_placeholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full max-w-[448px] mx-auto mb-4 p-2
          bg-[#E5E7EB] text-[13px]
          rounded-lg outline-none
        "
      />

      {/* GRID */}
      <div className="flex flex-wrap justify-center">
        {filtered.map((cat) => (
          <CategoryCard key={cat.slug} category={cat} />
        ))}
      </div>
    </div>
  );
}
