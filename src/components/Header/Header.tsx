import { Link, NavLink as RouterNavLink } from "react-router-dom";
import sitesData from "../../data/sites.json";
import logo from "../../logo.png";
import { useLocation } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";
import { useHeaderStore } from "../../store/header.store";
import { useLockBodyScroll } from "./useLockBodyScroll";
import DateTime from "../../DateTime/DateTime";
import LangBar from "../LangBar/LangBar";
import { useLocaleStore } from "../../store/localeStore";
import AdultModal from "../AdultModal/AdultModal";
import { useState } from "react";
import { HeaderNavLink } from "./HeaderNavLink";
import { DropdownMenu } from "./DropDownMenu";
import { DropdownItem } from "./DropdownItem";

const MAIN_CATEGORY_SLUGS = ["weather"];

export const Header: React.FC = () => {
  const { t } = useTranslate();
  const menuOpen = useHeaderStore((s) => s.menuOpen);
  const catsOpen = useHeaderStore((s) => s.categoriesOpen);
  const toggleMenu = useHeaderStore((s) => s.toggleMenu);
  const toggleCategories = useHeaderStore((s) => s.toggleCategories);
  const closeMenu = useHeaderStore((s) => s.closeMenu);
  const locale = useLocaleStore((s) => s.lang);
  const closeCategories = useHeaderStore((s) => s.closeCategories);
  const [adultSlug, setAdultSlug] = useState<string | null>(null);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useLockBodyScroll(menuOpen || catsOpen);

  const mainCategories = sitesData.categories.filter((cat) =>
    MAIN_CATEGORY_SLUGS.includes(cat.slug)
  );

  return (
    <header
      className="
 bg-[#1E293B] text-white
  flex justify-between items-center gap-[12px]
  border-b border-[#E5E7EB]
  px-[30px] py-0
  [@media(max-width:1024px)]:px-[20px]
  [@media(max-width:768px)]:px-[8px] [@media(max-width:768px)]:py-[8px] [@media(max-width:768px)]:flex-wrap [@media(max-width:768px)]:items-center [@media(max-width:768px)]:sticky top-0 left-0 right-0 z-[10000]
  [@media(max-width:480px)]:px-[8px] [@media(max-width:480px)]:py-[8px]
  "
    >
      <Link to="/" aria-label="Home" className="group">
        <svg
          viewBox="0 0 10.94 4.3"
          className="w-[70px] md:w-[80px] cursor-pointer"
        >
          {/* HUB */}
          <path
            d="M7.52 0l1.63 0c0.32,0 0.56,0.01 0.72,0.04 0.16,0.03 0.3,0.09 0.43,0.18 0.13,0.09 0.23,0.21 0.31,0.36 0.08,0.15 0.13,0.32 0.13,0.5 0,0.2 -0.05,0.39 -0.15,0.55 -0.1,0.17 -0.24,0.33 -0.42,0.42 0.25,0.08 0.44,0.17 0.57,0.35 0.13,0.18 0.2,0.4 0.2,0.65 0,0.2 -0.04,0.39 -0.13,0.57 -0.09,0.19 -0.2,0.33 -0.35,0.44 -0.15,0.11 -0.33,0.18 -0.55,0.2 -0.14,0.02 -0.47,0.03 -0.99,0.03l-1.39 0 0 -4.3zm-2.97 3.14l0 -3.14 -0.87 0 0 1.66 -1.35 0 0 0.87 1.35 0 0 0.74c0,0.57 0.47,1.04 1.04,1.04l2.42 0 0 -4.3 -0.86 0 0 3.54 -1.33 0c-0.22,0 -0.4,-0.18 -0.4,-0.4zm3.84 -2.38l0 0.95 0.5 0c0.32,0 0.52,-0.01 0.6,-0.02 0.14,-0.02 0.25,-0.07 0.33,-0.15 0.08,-0.09 0.12,-0.2 0.12,-0.33 0,-0.13 -0.04,-0.2 -0.1,-0.28 -0.07,-0.08 -0.17,-0.13 -0.31,-0.15 -0.08,-0.01 -0.32,-0.02 -0.7,-0.02l-0.43 0zm0 1.71l0 1.11 0.72 0c0.3,0 0.49,-0.01 0.57,-0.03 0.12,-0.02 0.22,-0.08 0.3,-0.17 0.08,-0.09 0.12,-0.21 0.12,-0.37 0,-0.13 -0.03,-0.2 -0.09,-0.29 -0.06,-0.09 -0.15,-0.16 -0.26,-0.2 -0.11,-0.04 -0.36,-0.06 -0.73,-0.06l-0.63 0z"
            className="fill-[#E5E7EB] group-hover:fill-white transition duration-300"
          />

          {/* 1 */}
          <polygon
            points="1.95,4.3 1.95,0 1.33,0 1.08,0 0.56,0 -0,0.81 1.08,0.81 1.08,4.3"
            className="fill-[#38BDF8]"
          />
        </svg>
      </Link>
      <div>
        <DateTime currentLocale={locale} />

        <div className="[@media(max-width:768px)]:hidden">
          <div>
            <nav className="hidden md:flex md:gap-[14px] md:items-center md:flex-wrap">
              <HeaderNavLink to="/">
                {t("header_navlink", "Home")}
              </HeaderNavLink>
              {!isHomePage && (
                <div
                  className="relative group hidden md:flex items-center justify-center
                h-[32px] cursor-pointer
                rounded-b-[5px]
                hover:bg-[#E5E7EB]  hover:rounded-t-[5px] hover:rounded-b-[0]"
                  onMouseEnter={toggleCategories}
                  onMouseLeave={closeCategories}
                >
                  <div
                    className="cursor-pointer text-[#E5E7EB] text-[13px] uppercase leading-none font-[mrgvlovani] font-medium px-[6px] py-0
                  group-hover:text-[#1E293B] group-hover:font-semibold"
                  >
                    {t("header_categories", "Categories")}
                    <span className="inline-block ml-[6px] transform rotate-90 transition-transform duration-200">
                      ›
                    </span>
                  </div>

                  <DropdownMenu open={catsOpen}>
                    {sitesData.categories.map((cat) => (
                      <DropdownItem
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={(e) => {
                          if (cat.slug === "Adult" || cat.slug === "casino") {
                            e.preventDefault();
                            setAdultSlug(cat.slug);
                            closeCategories();

                            return;
                          }

                          closeCategories();
                          closeMenu();
                        }}
                      >
                        {t(cat.titleKey)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </div>
              )}
              <div id="favorites-link">
                <HeaderNavLink to="/favorites">
                  {t("header_favorites")}
                </HeaderNavLink>
              </div>

              {mainCategories.map((cat) => (
                <HeaderNavLink key={cat.slug} to={`/category/${cat.slug}`}>
                  {t(cat.titleKey, cat.name)}
                </HeaderNavLink>
              ))}

              <HeaderNavLink to="/contacts">
                {t("header_contact", "Contacts")}
              </HeaderNavLink>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-[768px]:hidden">
        <LangBar />
      </div>
      <button
        aria-expanded={menuOpen}
        onClick={toggleMenu}
        className="
    relative hidden max-[768px]:inline-flex
    items-center justify-center
    w-[40px] h-[36px]
    border border-[#E5E7EB] rounded-[6px]
    bg-transparent text-[#E5E7EB]
    cursor-pointer outline-none flex-shrink-0
    group
  "
      >
        <span
          className="
      absolute left-[8px] right-[8px] top-[10px] h-[2px]
      bg-current rounded-[2px]
      transition-all duration-200 ease-in-out
      group-aria-[expanded=true]:translate-y-[8px]
      group-aria-[expanded=true]:rotate-45
    "
        />

        <span
          className="
      absolute left-[8px] right-[8px] top-1/2 -translate-y-1/2 h-[2px]
      bg-current rounded-[2px]
      transition-all duration-200 ease-in-out
      group-aria-[expanded=true]:opacity-0
    "
        />

        <span
          className="
      absolute left-[8px] right-[8px] bottom-[10px] h-[2px]
      bg-current rounded-[2px]
      transition-all duration-200 ease-in-out
      group-aria-[expanded=true]:-translate-y-[8px]
      group-aria-[expanded=true]:-rotate-45
    "
        />
      </button>

      <div
        onClick={closeMenu}
        className={`
    fixed inset-0
    w-full
    h-dvh supports-[height:100svh]:h-svh
    bg-black/45
    transition-opacity duration-200 ease-in-out
    z-[900]
    md:hidden

    ${menuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}
  `}
      />

      <aside
        className={`
    fixed top-0 right-0
    h-dvh supports-[height:100svh]:h-svh
    w-[min(92vw,460px)]
    bg-[#1E293B] text-white
    border-l border-[#E5E7EB]
    shadow-[-8px_0_24px_rgba(0,0,0,0.4)]
    transform transition-transform duration-200 ease-in-out
    z-[10000]

    flex flex-col gap-4
    overflow-y-auto overscroll-contain
    [-webkit-overflow-scrolling:touch]

    md:hidden

    ${menuOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >
        <div className="flex flex-col gap-[10px]">
          <button
            onClick={toggleCategories}
            aria-expanded={catsOpen}
            className="
    flex items-center justify-between w-full
    bg-[#1E293B]
    text-[#E5E7EB] font-medium text-[0.875rem] font-[mrgvlovani]
    border-b border-t border-[#E5E7EB]
    px-[14px] pt-[10px] pb-[8px]
    text-left cursor-pointer
  "
          >
            <span className="text-[12px]">
              {t("header_categories", "Categories")}
            </span>

            <span
              className={`
      ml-2 inline-block transition-transform duration-200
      ${catsOpen ? "rotate-[270deg]" : "rotate-90"}
    `}
            >
              ›
            </span>
          </button>

          <div
            className={`
    ${catsOpen ? "grid" : "hidden"}
    grid-cols-2 max-[400px]:grid-cols-1
    max-h-[60vh] overflow-y-auto
    [-webkit-overflow-scrolling:touch]
    border-b border-[#E5E7EB]
  `}
          >
            {sitesData.categories.map((cat) => (
              <DropdownItem
                key={cat.slug}
                to={`/category/${cat.slug}`}
                onClick={(e) => {
                  if (cat.slug === "Adult" || cat.slug === "casino") {
                    e.preventDefault();
                    setAdultSlug(cat.slug);
                    closeCategories();
                    closeMenu();
                    return;
                  }

                  closeCategories();
                  closeMenu();
                }}
              >
                {t(cat.titleKey, cat.name)}
              </DropdownItem>
            ))}
          </div>
        </div>

        <nav className="flex flex-col gap-[4px]">
          <RouterNavLink
            className={({ isActive }) => `
   whitespace-nowrap no-underline flex items-center 
  h-8 pl-[12px] font-[mrgvlovani] text-[12px]
  text-[#E5E7EB] transition-all duration-100

  [ -webkit-tap-highlight-color:transparent ]

  ${isActive ? "bg-[#E5E7EB] !text-[#1E293B] font-semibold " : ""}

`}
            to="/"
            onClick={closeMenu}
          >
            {t("header_navlink", "Home")}
          </RouterNavLink>
          <RouterNavLink
            className={({ isActive }) => `
   whitespace-nowrap no-underline flex items-center 
  h-8 pl-[12px] font-[mrgvlovani] text-[12px]
  text-[#E5E7EB] transition-all duration-100

  [ -webkit-tap-highlight-color:transparent ]

  ${isActive ? "bg-[#E5E7EB] !text-[#1E293B] font-semibold " : ""}

`}
            id="favorites-link"
            to="/favorites"
            onClick={closeMenu}
          >
            {t("header_favorites", "Favorites")}
          </RouterNavLink>
          <RouterNavLink
            to="/contacts"
            onClick={closeMenu}
            className={({ isActive }) => `
   whitespace-nowrap no-underline flex items-center mb-[20px]
  h-8 pl-[12px] font-[mrgvlovani] text-[12px]
  text-[#E5E7EB] transition-all duration-100

  [ -webkit-tap-highlight-color:transparent ]

  ${isActive ? "bg-[#E5E7EB] !text-[#1E293B] font-semibold " : ""}

`}
          >
            {t("header_contact", "Contacts")}
          </RouterNavLink>
        </nav>
        <LangBar />
      </aside>

      {adultSlug && (
        <AdultModal slug={adultSlug} onClose={() => setAdultSlug(null)} />
      )}
    </header>
  );
};

export default Header;
