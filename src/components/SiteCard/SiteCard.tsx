import { memo, useEffect, useRef, useState } from "react";
import { SiteItem } from "../SiteCard/SiteCard.types";
import { useFavoritesStore } from "../../store/favorites/favorites.store";
import { useTranslate } from "../../hooks/useTranslate";
import { iconsMap } from "../../constants/iconsMap";
import { useThemeStore } from "../../store/theme/theme.store";

interface Props {
  site: SiteItem;
  variant?: "default" | "mobile-row" | "favorites";
  isActive?: boolean;
  showPreview?: boolean;
}

const FALLBACK_LOGO = "/images/fallback-logo.png";

const SiteCard = ({ site, variant = "default", showPreview = true }: Props) => {
  const favoriteKey = site.intDesc;
  const isFav = useFavoritesStore((s) => s.isFavorite(favoriteKey));
  const toggle = useFavoritesStore((s) => s.toggle);
  const [previewTop, setPreviewTop] = useState("184px");
  const { t } = useTranslate();
  const FavIcon = iconsMap.Star;
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const theme = useThemeStore((s) => s.theme);

  const isDark = theme === "dark";

  useEffect(() => {
    if (variant !== "mobile-row") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
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

  // MOBILE ROW
  if (variant === "mobile-row") {
    return (
      <a
        href={site.url}
        ref={cardRef}
        target="_blank"
        rel="noopener noreferrer"
        className="sticky top-[110px] w-full transition-all duration-500 snap-start"
        style={{ height: isActive ? "260px" : "70px" }}
      >
        <div
          className={`
            relative w-full h-full overflow-hidden border-b border-t 
            ${
              isDark
                ? "bg-[#0F172A] border-white/15"
                : "bg-white border-[#D7E0EA]"
            }
          `}
        >
          {/* Preview */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={site.preview || FALLBACK_LOGO}
              className="w-full h-full object-cover opacity-90 "
              alt=""
            />
            <div
              className={`absolute inset-0  ${
                isDark
                  ? "bg-gradient-to-t from-[#000000] via-transparent"
                  : "bg-gradient-to-t from-[#ffffff] via-transparent"
              }`}
            />
          </div>

          <div className="relative h-full flex flex-col justify-end p-3 z-10">
            <div
              className={`flex items-center justify-between w-full transition-all duration-500 ${
                isActive ? "mb-0" : "h-full"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${site.url}&sz=32`}
                  className="w-5 h-5"
                  alt=""
                />

                <span
                  className={`font-bold uppercase tracking-wider text-sm ${
                    isActive
                      ? isDark
                        ? "text-[#38BDF8] underline [text-shadow:0_2px_6px_rgba(0,0,0,0.9)]"
                        : "text-[#0F172A] underline"
                      : isDark
                        ? "text-[#E5E7EB]"
                        : "text-[#0F172A]"
                  }`}
                >
                  {site.title}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggle(favoriteKey);
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
                    ${isActive && isDark ? "drop-shadow-[0_0_6px_#000000]" : ""}
                  `}
                />
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p
                className={`text-xs ${
                  isDark
                    ? "text-[#E5E7EB] [text-shadow:2px_2px_4px_#000000]"
                    : "text-[#0F172A]"
                }`}
              >
                {t(site.intDesc)}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // DESKTOP
  return (
    <a
      ref={cardRef}
      onMouseEnter={showPreview ? handleMouseEnter : undefined}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        group relative border-2 rounded-[8px] p-[10px]
        md:h-[180px] h-auto active:scale-[0.98]
        flex flex-col no-underline [color:inherit]
        transition-[background-color,border-color,box-shadow] duration-200 ease-out md:transform-gpu
        hover:z-50
        ${
          isDark
            ? "bg-[#1E293B] border-white/15 md:hover:bg-[#0F172A] md:hover:border-[#546075]"
            : "bg-white border-[#D7E0EA] md:hover:bg-[#F1F5F9] md:hover:border-[#CBD5E1]"
        }
        ${
          variant === "default"
            ? "md:hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.15)] m-[8px] w-[270px] max-w-[270px]"
            : "md:hover:[box-shadow:0_4px_6px_rgba(0,0,0,0.12)] m-[5px] w-[250px] max-w-[250px]"
        }
      `}
    >
      <div className="transition-all duration-300 md:group-hover:opacity-20">
        <img
          className={`max-h-[90px] object-contain border ${
            isDark ? "border-[#444]" : "border-[#CBD5E1]"
          }`}
          src={site.logo || FALLBACK_LOGO}
          alt={site.title}
        />
      </div>

      {/* Overlay */}
      <div
        className={`
          z-[5] rounded-[8px] transition-all duration-300
          ${
            isDark
              ? "md:group-hover:bg-black/20 md:group-hover:backdrop-blur-[1px]"
              : "md:group-hover:bg-white/10"
          }
        `}
      />

      {/* Content */}
      <div className="md:absolute md:inset-0 flex flex-col justify-end md:p-[10px] transition-all duration-300 md:group-hover:translate-y-[-2px] z-10 will-change-transform">
        <div className="flex justify-between items-center w-full">
          <h2
            className={`
              text-[13px] font-semibold whitespace-nowrap truncate max-w-[85%]
              md:group-hover:underline group-active:underline
              ${
                isDark
                  ? "text-[#38BDF8] md:group-hover:[text-shadow:0_2px_6px_rgba(0,0,0,0.9)]"
                  : "text-[#0F172A]"
              }
            `}
          >
            {site.title}
          </h2>

          <button
            className={`
              text-[#38BDF8] text-[1.3rem] border-none cursor-pointer
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
              toggle(favoriteKey);
            }}
          >
            <FavIcon
              size={16}
              className={`
                ${
                  isFav
                    ? "fill-[#38BDF8]"
                    : "fill-transparent md:hover:fill-[#38BDF8]"
                }
                ${isDark ? "md:group-hover:drop-shadow-[0_0_6px_#000000]" : ""}
              `}
            />
          </button>
        </div>

        <p
          className={`
            font-ubuntu text-xs m-0 overflow-hidden
            md:line-clamp-3 md:group-hover:line-clamp-6 group-active:line-clamp-6
            ${
              isDark
                ? "text-[#adadad] md:group-hover:text-[#E5E7EB] group-active:text-[#E5E7EB]"
                : "text-[#475569] md:group-hover:text-[#0F172A] group-active:text-[#0F172A]"
            }
          `}
        >
          {t(site.intDesc)}
        </p>
      </div>

      {/* Preview */}
      {showPreview && (
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 rounded-[8px] p-[4px] z-[999] hidden md:group-hover:block border
            ${isDark ? "bg-white border-[#1E293B]" : "bg-white border-[#CBD5E1]"}
          `}
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
