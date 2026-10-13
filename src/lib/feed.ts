import rss from '@astrojs/rss'
import { getEntry, render } from 'astro:content'
import mdxRenderer from '@astrojs/mdx/server.js'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { encodeXML } from 'entities'
import MomentPhotos from '@/components/MomentPhotos.astro'
import { getSite } from '@/lib/site'
import {
  getContentLanguage,
  getContentUrl,
  getPublishedBlogPosts,
  getMoments,
} from '@/lib/content'
import { ui, type Language } from '@/lib/i18n'

interface FeedOptions {
  format?: 'rss' | 'json'
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
  const extension = options.format === 'json' ? 'json' : 'xml'
  let feedPath = `/feed.${extension}`
  let homePath = '/'
  if (options.collection === 'moments') {
    feedPath = `/moments/feed.${extension}`
    homePath = '/moments/'
  } else if (options.language) {
    feedPath = `/${options.language}/feed.${extension}`
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

      let tags = post.collection === 'moments' ? undefined : post.data.tags
      if (
        options.format === 'json' &&
        post.collection === 'blog' &&
        post.data.tags.length === 0 &&
        post.data.project
      ) {
        const project = await getEntry(post.data.project)
        if (project) tags = [project.data.title]
      }

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
        language:
          post.collection === 'moments' ? undefined : getContentLanguage(post),
        tags,
      }
    }),
  )

  const title = options.title
    ? `${options.title} — ${siteData.title}`
    : `${siteData.title} — ${siteData.tagline}`
  const description =
    options.collection === 'moments'
      ? ui[language].moments.description
      : ui[language].blog.description
  const feedUrl = new URL(feedPath, site).href
  const icon = new URL(siteData.logo, site).href

  if (options.format === 'json') {
    return new Response(
      JSON.stringify({
        version: 'https://jsonfeed.org/version/1.1',
        title,
        description,
        home_page_url: homeUrl.href,
        feed_url: feedUrl,
        icon,
        language: options.language,
        items: items.map((item) => ({
          id: item.link,
          url: item.link,
          title: item.title,
          summary: item.description,
          content_html: item.content,
          date_published: item.pubDate.toISOString(),
          language: item.language,
          tags: item.tags,
        })),
      }),
      { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } },
    )
  }

  return rss({
    title,
    description,
    customData: [
      options.language ? `<language>${options.language}</language>` : '',
      `<atom:link href="${encodeXML(feedUrl)}" rel="self" type="application/rss+xml" />`,
      `<image><url>${encodeXML(icon)}</url><title>${encodeXML(siteData.title)}</title><link>${encodeXML(homeUrl.href)}</link></image>`,
    ].join(''),
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    site: homeUrl,
    items,
    stylesheet: '/_style/default.xsl',
  })
}
