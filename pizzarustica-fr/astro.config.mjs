import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.pizzarustica.fr',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) =>
        !page.includes('/mentions-legales') &&
        !page.includes('/politique-confidentialite'),
    }),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
