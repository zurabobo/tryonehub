import { NavLink } from "react-router-dom";
import React from "react";

interface DropdownItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  to,
  children,
  onClick,
}) => {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) => `
        block px-[12px] py-[10px]
        border border-[#0F172A]
        text-[0.875rem]
        transition-colors duration-200
       max-[490px]:text-[0.77rem]
        before:content-['›'] before:mr-2 before:transition-colors before:duration-200 

        ${
          isActive
            ? "bg-[#E5E7EB] text-[#1E293B] before:text-[#1E293B] "
            : "bg-transparent text-[#E5E7EB] before:text-[#9CA3AF]"
        }

        
        [@media(hover:hover)]:hover:bg-[#E5E7EB]
        [@media(hover:hover)]:hover:text-[#1E293B]
        [@media(hover:hover)]:hover:before:text-[#1E293B]
       
      `}
    >
      {children}
    </NavLink>
  );
};
