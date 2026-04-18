import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useLocaleStore,
  LOCALES,
  type Language,
} from "../../store/localeStore";
import { iconsMap } from "../../constants/iconsMap";
import { switchLocalePath } from "../../utils/switchLocalePath";

const languages: { name: string; code: Language }[] = [
  { name: "ქართული", code: LOCALES.GEORGIAN },
  { name: "English", code: LOCALES.ENGLISH },
  { name: "Русский", code: LOCALES.RUSSIAN },
];

export default function LangBar() {
  const [open, setOpen] = useState(false);
  const lang = useLocaleStore((s) => s.lang);
  const setLang = useLocaleStore((s) => s.setLang);

  const navigate = useNavigate();
  const location = useLocation();

  const current = languages.find((l) => l.code === lang)!;
  const Icon = iconsMap.Languages;

  const handleChangeLanguage = (newLang: Language) => {
    setLang(newLang);
    setOpen(false);
    navigate(switchLocalePath(location.pathname, newLang));
  };

  return (
    <div className="flex items-center justify-center border-2 border-white/10 max-md:w-[90%] max-md:mx-auto rounded-[6px] w-[110px]">
      <div className="flex items-center justify-center border-r-[2px] border-white/10 w-[38px] h-[30px]">
        <Icon size={20} stroke="#E5E7EB" />
      </div>

      <div className="relative w-full hidden md:block">
        <div
          onClick={() => setOpen((o) => !o)}
          className="p-[4px] y-[6px] bg-[#1E293B] text-[#E5E7EB] text-[12px] cursor-pointer md:hover:bg-[#273449] rounded-[6px] text-center select-none"
        >
          {current.name}
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-[#0F172A] rounded-b-[6px] border border-white/10 mt-[4px] flex flex-col z-10">
            {languages
              .filter((l) => l.code !== lang)
              .map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleChangeLanguage(l.code)}
                  className="px-[10px] py-[6px] text-[12px] text-[#E5E7EB] border-b border-white/10 last:rounded-b-[6px] last:border-b-0 hover:bg-[#273449]"
                >
                  {l.name}
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="hidden max-md:flex w-full justify-around items-center">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => handleChangeLanguage(l.code)}
            className={`
              text-[12px] px-[6px] py-[4px] rounded w-[30%]
              ${l.code === lang ? "bg-[#E5E7EB] text-[#1E293B] font-semibold" : "text-white"}
            `}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}