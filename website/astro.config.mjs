// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kultivate.id',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://kultivate.id/' && page !== 'https://kultivate.id/404/',
    }),
  ],
});
