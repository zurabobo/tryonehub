import { memo, useEffect, useRef, useState } from "react";
import { SiteItem } from "../SiteCard/SiteCard.types";
import { useFavoritesStore } from "../../store/favorites/favorites.store";
import { useTranslate } from "../../hooks/useTranslate";
import { iconsMap } from "../../constants/iconsMap";

interface Props {
  site: SiteItem;
  variant?: "default" | "mobile-row" | "favorites";
  isActive?: boolean;
  showPreview?: boolean;
}

const FALLBACK_LOGO = "/images/fallback-logo.png";

const SiteCard = ({
  site,
  variant = "default",
  showPreview = true,
  // isActive = false,
}: Props) => {
  const isFav = useFavoritesStore((s) => s.isFavorite(site.url));
  const toggle = useFavoritesStore((s) => s.toggle);
  const [previewTop, setPreviewTop] = useState("184px");
  const { t } = useTranslate();
  const FavIcon = iconsMap.Star;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (variant !== "mobile-row") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Если верх карточки коснулся заголовка (50px от топа)
        setIsActive(entry.isIntersecting);
      },
      {
        // Срабатывает ровно когда карточка заходит под заголовок
        rootMargin: "-50px 0px -70% 0px",
        threshold: 0,
      }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [variant]);

  const handleMouseEnter = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (rect.bottom + 220 > window.innerHeight) {
      setPreviewTop("auto");
    } else {
      setPreviewTop("184px");
    }
  };

  const flyToFavorites = () => {
    const card = cardRef.current;
    const target = document.getElementById("favorites-link");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || reduceMotion) return;

    if (!card || !target) return;

    const cardRect = card.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const clone = card.cloneNode(true) as HTMLElement;

    clone.style.position = "fixed";
    clone.style.top = `${cardRect.top}px`;
    clone.style.left = `${cardRect.left}px`;
    clone.style.width = `${cardRect.width}px`;
    clone.style.height = `${cardRect.height}px`;
    clone.style.margin = "0";
    clone.style.zIndex = "9999";
    clone.style.pointerEvents = "none";
    clone.style.transition = "all 0.65s cubic-bezier(0.22, 1, 0.36, 1)";

    document.body.appendChild(clone);

    const targetX = targetRect.left + targetRect.width / 2 - 20;
    const targetY = targetRect.top + targetRect.height / 2 - 20;

    requestAnimationFrame(() => {
      clone.style.top = `${targetY}px`;
      clone.style.left = `${targetX}px`;
      clone.style.width = "40px";
      clone.style.height = "40px";
      clone.style.opacity = "0";
      clone.style.transform = "scale(0.3)";
    });

    setTimeout(() => {
      clone.remove();
      target.classList.add("animate-bounce");

      setTimeout(() => {
        target.classList.remove("animate-bounce");
      }, 400);
    }, 650);
  };

  // МОБИЛЬНЫЙ ВИД (Строка списка)
  if (variant === "mobile-row") {
    return (
      <a
        href={site.url}
        ref={cardRef}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky top-[110px] w-full transition-all duration-500 snap-start "
        style={{ height: isActive ? "260px" : "70px" }}
      >
        <div className="relative w-full h-full bg-[#0F172A] border-b border-white/15 overflow-hidden">
          {/* Превью (Телевизор) - плавно проявляется */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={site.preview || "/images/fallback-logo.png"}
              className="w-full h-full object-cover opacity-90"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent" />
          </div>
          <div className="relative h-full flex flex-col justify-end p-3 z-10">
            <div
              className={`flex items-center justify-between w-full transition-all duration-500 ${isActive ? "mb-0" : "h-full"}`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=32`}
                  className="w-5 h-5"
                />
                <span
                  className={`font-bold uppercase tracking-wider text-sm ${
                    isActive
                      ? "text-[#38BDF8] underline [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]"
                      : "text-[#e5e7eb]"
                  }`}
                >
                  {site.title}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggle(site.url);
                }}
                className=""
              >
                <FavIcon
                  size={18}
                  className={`
                ${
                  isFav
                    ? "fill-[#38BDF8] stroke-[#38BDF8]"
                    : "fill-none stroke-[#38BDF8] stroke-2"
                }
                ${isActive ? "drop-shadow-[0_0_6px_#000000]" : ""}
              `}
                />
              </button>

              {/* <img src={site.logo} className={`object-contain transition-all ${isActive ? "h-8" : "h-6"}`} /> */}
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <p className="text-[#e5e7eb] [text-shadow:2px_2px_4px_#000000] text-xs  ">
                {t(site.intDesc)}
              </p>
            </div>
            
          </div>
        </div>
      </a>
    );
  }

  // DESCTOP
  return (
    <a
      className={`
    group relative border-[2px] border-[#ffffff26]
    rounded-[8px] bg-[#1E293B] p-[10px]
    h-[180px] active:scale-[0.98]
    flex flex-col no-underline [color:inherit]
    transition-all duration-300 md:transform-gpu
    hover:z-50
    ${
      variant === "default"
        ? "md:hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.3)] m-[8px] w-[270px] max-w-[270px]"
        : "md:hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.5)] m-[5px] w-[250px] max-w-[250px]"
    }
  `}
      ref={cardRef}
      onMouseEnter={showPreview ? handleMouseEnter : undefined}
      href={site.url}
      target="_blank"
    >
      <div
        className="transition-all duration-300

    md:group-hover:opacity-20"
      >
        <img
          className="max-h-[90px] object-contain border-[1px] border-solid border-[#444]"
          src={site.logo || FALLBACK_LOGO}
          // src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=64`}
          
        
          alt={site.title}
        />
      </div>

      {/* Затемнение */}
      <div
        className="

md:from-transparent md:via-transparent md:to-transparent
  md:group-hover:bg-black/20
  group-active:bg-black/20
  md:group-hover:backdrop-blur-[1px]
  transition-all duration-300
  z-[5]
  rounded-[8px]
"
      ></div>

      {/* Контент */}
      <div
        className="
  md:absolute md:inset-0
  flex flex-col justify-end md:p-[10px]
  transition-all duration-300
  md:group-hover:translate-y-[-2px]
  z-10 will-change-transform
"
      >
        <div className="flex justify-between items-center w-full">
          <h2 className="text-[#38BDF8] text-[13px] font-semibold whitespace-nowrap truncate max-w-[85%] md:group-hover:underline md:group-hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.9)] group-active:underline">
            {site.title}
          </h2>
          <button
            className={`
          text-[#38BDF8] text-[1.3rem]  border-none cursor-pointer
          transition-opacity duration-300
          ${
            isFav
              ? "md:opacity-100 md:scale-100"
              : "md:opacity-0 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100"
          }
        `}
            onClick={(e) => {
              e.preventDefault();
              if (!isFav && variant !== "favorites") {
                flyToFavorites();
              }
              toggle(site.url);
            }}
          >
            <FavIcon
              size={16}
              className={`md:group-hover:drop-shadow-[0_0_6px_#000000] ${isFav ? "fill-[#38BDF8]" : "fill-transparent md:hover:fill-[#38BDF8]"}`}
            />
          </button>
        </div>
        <p className="font-ubuntu text-[#adadad] text-xs m-0 md:line-clamp-3 md:group-hover:line-clamp-6 md:group-hover:text-[#e5e7eb] group-active:text-[#e5e7eb] overflow-hidden">
          {t(site.intDesc)}
        </p>
      </div>

      {/* Preview */}
      {showPreview && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-white rounded-[8px] p-[4px] z-[999] hidden md:group-hover:block"
          style={{
            top: previewTop,
            bottom: previewTop === "auto" ? "103%" : undefined,
          }}
        >
          <img
            className="max-w-[450px] w-[450px] h-auto"
            src={site.preview || FALLBACK_LOGO}
            alt={site.title}
            loading="lazy"
          />
        </div>
      )}
    </a>
  );
};

export default memo(SiteCard);
