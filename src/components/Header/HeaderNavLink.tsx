import { NavLink as RouterNavLink } from "react-router-dom";
import React from "react";

interface AppNavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const HeaderNavLink: React.FC<AppNavLinkProps> = ({ to, children }) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `
         hover:bg-[#FFF] uppercase hover:text-[#1E293B] hover:rounded-tl-[5px] hover:rounded-br-[0] text-[13px] hover:rounded-tr-[5px] hover:rounded-bl-[0] hover:font-semibold text-[#E5E7EB] font-[mrgvlovani] px-[6px] py-[0] h-[32px] leading-none flex items-center justify-center [transition:all_0.1s_ease-in-out] no-underline whitespace-nowrap

        ${
          isActive
            ? `
          rounded-tl-[5px] rounded-br-[0] rounded-tr-[5px] rounded-bl-[0] bg-[#FFF] !text-[#1E293B] font-semibold
        `
            : ""
        }
        `
      }
    >
      {children}
    </RouterNavLink>
  );
};
