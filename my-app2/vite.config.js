import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line import/no-unresolved
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      overrideConfigFile: ".eslintrc.cjs",
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["../client/**"],
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});
