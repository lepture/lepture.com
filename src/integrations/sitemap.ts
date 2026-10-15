import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { encodeXML } from 'entities'
import type { AstroIntegration } from 'astro'
import { parse, walkSync, ELEMENT_NODE } from 'ultrahtml'

function getPageMetadata(html: string) {
  let url: string | undefined
  let publishedAt: string | undefined
  let updatedAt: string | undefined
  const head = html.split('</head>', 1)[0]
  walkSync(parse(head), (node) => {
    if (node.type !== ELEMENT_NODE) return
    if (node.name === 'link' && node.attributes.rel === 'canonical')
      url = node.attributes.href
    if (node.name !== 'meta') return
    if (node.attributes.property === 'article:published_time')
      publishedAt = node.attributes.content
    if (node.attributes.property === 'article:modified_time')
      updatedAt = node.attributes.content
  })
  return { url, lastModified: updatedAt ?? publishedAt }
}

export default function sitemap(): AstroIntegration {
  return {
    name: 'sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const entries = new Map(
          await Promise.all(
            pages
              .filter(({ pathname }) => !/^\/?(?:404|500)\/?$/.test(pathname))
              .map(async ({ pathname }) => {
                const path = pathname.replace(/^\/|\/$/g, '')
                const indexFile = new URL(
                  `${path ? `${path}/` : ''}index.html`,
                  dir,
                )
                const file = existsSync(indexFile)
                  ? indexFile
                  : new URL(`${path}.html`, dir)
                const { url, lastModified } = getPageMetadata(
                  await readFile(file, 'utf8'),
                )
                if (!url)
                  throw new Error(`Missing canonical URL in ${file.pathname}`)
                const lastmod = lastModified
                  ? `<lastmod>${encodeXML(lastModified)}</lastmod>`
                  : ''
                return [
                  url,
                  `  <url><loc>${encodeXML(url)}</loc>${lastmod}</url>`,
                ] as const
              }),
          ),
        )
        const urls = [...entries.keys()].sort()
        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map((url) => entries.get(url)),
          '</urlset>',
          '',
        ].join('\n')

        await writeFile(new URL('sitemap.xml', dir), xml)
        logger.info(`sitemap.xml created with ${urls.length} URLs.`)
      },
    },
  }
}
