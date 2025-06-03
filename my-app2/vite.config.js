import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// eslint-disable-next-line import/no-unresolved
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";
import Terminal from "vite-plugin-terminal";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Terminal({
      console: "terminal",
      output: ["terminal", "console"],
    }),
    eslint({
      overrideConfigFile: ".eslintrc.cjs", // tell it where your config is
      include: ["src/**/*.{js,jsx,ts,tsx}"], // or whatever is relevant to your project
      exclude: ["../client/**"], // explicitly exclude the client folder
    }),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // your backend server
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
