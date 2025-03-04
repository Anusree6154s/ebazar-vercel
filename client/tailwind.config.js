import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      colors: {
        customBlue: "#21AAF3",
        customDarkBlue: "#0b31bf",
        primary: "#21AAF3",
        "primary-hover": "#2196F3",
        "primary-hover-dark": "#2183f3",
        "primary-light": "#70cafbed",
        warning: "#F04646",
      },
    },
  },
  plugins: [aspectRatio, forms],
};

export default tailwindConfig;
