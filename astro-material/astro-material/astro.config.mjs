// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ['en', 'es', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // strategy: 'pathname', // This is the default and can be omitted
    }
  }
});