import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://github.com/vitejs/vite/discussions/6282

export default defineConfig({
  plugins: [react(), nodePolyfills()],
});
