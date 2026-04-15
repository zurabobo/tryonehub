import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslate } from '../../hooks/useTranslate';

function Footer() {
  const { t } = useTranslate();

  return (
    <footer className='bg-[#1f2937] text-[#ffffff] p-[16px] text-center'>
      <RouterNavLink className="text-[#60a5fa] no-underline mx-[8px] my-[0] hover:underline" to="/about">{t('about_title')}</RouterNavLink>
      <RouterNavLink className="text-[#60a5fa] no-underline mx-[8px] my-[0] hover:underline" to="/privacy">{t('about_privacy')}</RouterNavLink>
      <RouterNavLink className="text-[#60a5fa] no-underline mx-[8px] my-[0] hover:underline" to="/contacts">{t('header_contact')}</RouterNavLink>
      <p>&copy; 2025 {t('header_title')}</p>
    </footer>
  );
}

export default Footer;
