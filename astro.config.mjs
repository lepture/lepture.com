import mdx from '@astrojs/mdx'
import sitemap from './src/integrations/sitemap.ts'
import proseflyComponents from '@prosefly/astro-components/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://lepture.com/',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [
    proseflyComponents({
      markdown: { imageGallery: true },
      icons: {
        preload: [
          'lucide:arrow-left',
          'lucide:arrow-right',
          'lucide:arrow-up-right',
          'lucide:moon',
          'lucide:sun',
        ],
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
