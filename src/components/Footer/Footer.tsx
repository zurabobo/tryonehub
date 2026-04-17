import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

function Footer() {
  const { t } = useTranslate();

  return (
    <footer className='bg-[#1f2937] text-[#E5E7EB] px-[2px] py-[8px] text-center'>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/contacts">{t('header_contact')}</RouterNavLink>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/about">{t('about_title')}</RouterNavLink>
      <RouterNavLink className="text-[#38BDF8] no-underline md:text-[16px] text-[13px] mx-[8px] my-[0] hover:underline" to="/privacy">{t('about_privacy')}</RouterNavLink>
      <p>&copy; 2025 {t('header_title')}</p>
    </footer>
  );
}

export default Footer;
