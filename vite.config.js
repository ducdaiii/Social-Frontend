import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, 
  },
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
