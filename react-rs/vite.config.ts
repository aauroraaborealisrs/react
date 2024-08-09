import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), remix()],
});