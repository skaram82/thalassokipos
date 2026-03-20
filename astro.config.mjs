// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/config/site.mjs";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  integrations: [
    react(),
    icon(),
    mdx(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      cssMinify: "lightningcss",
      minify: "esbuild",
    },
    esbuild: {
      // Match the previous intention of dropping console/debugger in production.
      drop: ["console", "debugger"],
    },
  },
  build: {
    inlineStylesheets: "auto",
    assets: "_assets",
  },
  compressHTML: true,
  image: {
    domains: [],
    remotePatterns: [],
  },
});
