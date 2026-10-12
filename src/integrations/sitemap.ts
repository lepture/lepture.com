import { writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { encodeXML } from 'entities'
import type { AstroIntegration } from 'astro'

export default function sitemap(): AstroIntegration {
  let site: string | undefined

  return {
    name: 'sitemap',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site
      },
      'astro:build:done': async ({ dir, pages, logger }) => {
        if (!site)
          throw new Error('A site URL is required to generate the sitemap.')

        const urls = [
          ...new Set(
            pages
              .filter(({ pathname }) => !/^\/?(?:404|500)\/?$/.test(pathname))
              .map(({ pathname }) => {
                const path = pathname.replace(/^\/|\/$/g, '')
                const indexFile = new URL(
                  `${path ? `${path}/` : ''}index.html`,
                  dir,
                )
                return new URL(existsSync(indexFile) ? `${path}/` : path, site)
                  .href
              }),
          ),
        ].sort()
        const entries = urls.map(
          (url) => `  <url><loc>${encodeXML(url)}</loc></url>`,
        )
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...entries,
          '</urlset>',
          '',
        ].join('\n')

        await writeFile(new URL('sitemap.xml', dir), xml)
        logger.info(`sitemap.xml created with ${urls.length} URLs.`)
      },
    },
  }
}
