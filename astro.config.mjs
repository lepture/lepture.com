import mdx from '@astrojs/mdx'
import sitemap from './src/integrations/sitemap.ts'
import proseflyComponents from '@prosefly/astro-components/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://lepture.com/',
  output: 'static',
  build: { format: 'preserve' },
  devToolbar: { enabled: false },
  integrations: [
    proseflyComponents(),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
