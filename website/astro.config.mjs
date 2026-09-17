// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  site: 'https://kultivate.id',
  trailingSlash: 'always',
  vite: { resolve: { alias: [
    { find: '@designcodeio/threeui/style.css', replacement: fileURLToPath(new URL('./src/vendor/threeui/src/shaders/threeui.css', import.meta.url)) },
    { find: '@designcodeio/threeui', replacement: fileURLToPath(new URL('./src/vendor/threeui/index.tsx', import.meta.url)) },
  ] } },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== 'https://kultivate.id/' && page !== 'https://kultivate.id/404/',
    }),
  ],
});
