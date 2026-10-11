import type { APIContext } from 'astro'

export function GET({ site }: APIContext) {
  const sitemapUrl = new URL('/sitemap.xml', site)

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  )
}
