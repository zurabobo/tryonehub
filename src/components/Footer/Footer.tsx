import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';
import { useCookieConsentStore } from "../../store/cookies/cookieConsent.store";
import { useThemeStore } from "../../store/theme/theme.store";

function Footer() {
  const { t } = useTranslate();
  const reopenConsent = useCookieConsentStore((s) => s.reopenConsent);
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <footer className='bg-[#1f2937] text-[#E5E7EB] px-[2px] py-[8px] text-center'>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/contacts">{t('header_contact')}</RouterNavLink>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/about">{t('about_title')}</RouterNavLink>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/privacy">{t('about_privacy')}</RouterNavLink>
      <p>&copy; 2026 {t('header_title')}</p>
      <button
        type="button"
        onClick={reopenConsent}
        className="
    text-sm underline transition-colors
      text-[#0F172A] hover:text-[#38BDF8]"
      >
        Cookie settings
      </button>
    </footer>
  );
}

export default Footer;
