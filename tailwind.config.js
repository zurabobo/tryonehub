/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "bpg-nino": ['"BPG Nino Mtavruli"', "sans-serif"],
        mrgvlovani: ['"BPG Mrgvlovani Caps"', "sans-serif"],
      },
    },
  },
  safelist: [
    "font-bpg-nino",
    "font-roboto",
  ],
  plugins: [],
};
