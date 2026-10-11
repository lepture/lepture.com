import rss from '@astrojs/rss'
import { render } from 'astro:content'
import mdxRenderer from '@astrojs/mdx/server.js'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { encodeXML } from 'entities'
import MomentPhotos from '@/components/MomentPhotos.astro'
import { getSite } from '@/lib/site'
import { getContentUrl, getPublishedBlogPosts, getMoments } from '@/lib/content'
import { ui, type Language } from '@/lib/i18n'

interface FeedOptions {
  collection?: 'blog' | 'moments'
  language?: Language
  title?: string
}

function stripScripts(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
}

export async function createFeed(
  site = new URL(import.meta.env.SITE),
  options: FeedOptions = {},
) {
  const language = options.language ?? 'en'
  const siteData = (await getSite(language)).data
  let feedPath = '/feed.xml'
  let homePath = '/'
  if (options.collection === 'moments') {
    feedPath = '/moments/feed.xml'
    homePath = '/moments/'
  } else if (options.language) {
    feedPath = `/${options.language}/feed.xml`
    if (options.language === 'zh') homePath = '/zh/'
  }
  const homeUrl = new URL(homePath, site)
  const posts =
    options.collection === 'moments'
      ? await getMoments()
      : await getPublishedBlogPosts(options.language)
  const container = await AstroContainer.create({
    astroConfig: { site: site.href },
  })
  container.addServerRenderer({ renderer: mdxRenderer })
  const items = await Promise.all(
    posts.map(async (post) => {
      const postUrl = new URL(
        post.collection === 'moments'
          ? `/moments/#moment-${post.id}`
          : getContentUrl(post),
        site,
      )
      const content =
        post.collection === 'moments'
          ? await container.renderToString(MomentPhotos, {
              props: { moment: post },
              request: new Request(postUrl),
            })
          : await container.renderToString((await render(post)).Content, {
              request: new Request(postUrl),
            })

      return {
        title: post.data.title,
        description:
          post.collection === 'moments' ? undefined : post.data.description,
        pubDate:
          post.collection === 'moments'
            ? new Date(post.data.date)
            : post.data.publishedAt,
        link: postUrl.href,
        content: stripScripts(content),
      }
    }),
  )

  return rss({
    title: options.title
      ? `${options.title} — ${siteData.title}`
      : `${siteData.title} — ${siteData.tagline}`,
    description:
      options.collection === 'moments'
        ? ui[language].moments.description
        : ui[language].blog.description,
    customData: [
      options.language ? `<language>${options.language}</language>` : '',
      `<atom:link href="${encodeXML(new URL(feedPath, site).href)}" rel="self" type="application/rss+xml" />`,
      `<image><url>${encodeXML(new URL(siteData.logo, site).href)}</url><title>${encodeXML(siteData.title)}</title><link>${encodeXML(homeUrl.href)}</link></image>`,
    ].join(''),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    site: homeUrl,
    items,
    stylesheet: '/_style/default.xsl',
  })
}
