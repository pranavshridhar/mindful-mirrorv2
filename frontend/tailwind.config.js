// tailwind.config.js
import { nextui } from "@nextui-org/react";
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%" },
          to: { backgroundPosition: "350% 50%" },
        },
      },
    },
  },
  plugins: [nextui()],
};
