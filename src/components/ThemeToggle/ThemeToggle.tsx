// import { AnimatePresence, motion } from "framer-motion";
// import { Moon, Sun } from "lucide-react";
// import { useThemeStore } from "../../store/theme/theme.store";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useThemeStore();

//   return (
//     <button
//       type="button"
//       onClick={toggleTheme}
//       aria-label={
//         theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
//       }
//       className="
//         relative inline-flex items-center justify-center
//         w-[32px] h-[32px] rounded-lg border-2 overflow-hidden
//         transition-all duration-200 mr-[10px]  border-white/10 text-[#E5E7EB] md:hover:bg-[#273449]"
//     >
//       <AnimatePresence mode="wait" initial={false}>
//         <motion.span
//           key={theme}
//           initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
//           animate={{ rotate: 0, opacity: 1, scale: 1 }}
//           exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
//           transition={{ duration: 0.2 }}
//           className="absolute"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </motion.span>
//       </AnimatePresence>
//     </button>
//   );
// }

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/theme/theme.store";

interface ThemeToggleProps {
  isMobile?: boolean;
  onAfterToggle?: () => void;
}

export default function ThemeToggle({
  isMobile = false,
  onAfterToggle,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore();

  const handleToggle = () => {
    toggleTheme();
  
    if (onAfterToggle) {
      setTimeout(() => {
        onAfterToggle();
      }, 400);
    }
  };

  if (isMobile) {
    const isDark = theme === "dark";

    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="
          relative flex items-center justify-between
          w-[100px] h-[34px] px-[10px] mx-[auto] my-[0]
          rounded-[6px] border-2 border-white/10
          transition-colors duration-300
        "
      >
        <Sun
          size={16}
          className={`z-10 transition-colors duration-300 ${
            isDark ? "text-[#64748B]" : "text-[#F59E0B]"
          }`}
        />

        <Moon
          size={16}
          className={`z-10 transition-colors duration-300 ${
            isDark ? "text-[#38BDF8]" : "text-[#64748B]"
          }`}
        />

        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`
            absolute top-[2px] w-[32px] h-[26px] rounded-[4px] bg-white
         
           
          `}
          animate={{
            x: isDark ? 52 : -8,
          }}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      className="
        relative inline-flex items-center justify-center
        w-[32px] h-[32px] rounded-lg border-2 overflow-hidden
        transition-all duration-200 mr-[10px]
        bg-[#1E293B] border-white/10 text-[#E5E7EB] hover:bg-[#273449]
      "
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </button>
  );
}
