import type { PaginateFunction } from 'astro'
import { getPublishedBlogPosts } from '@/lib/content'
import type { Language } from '@/lib/i18n'
import { getSite } from '@/lib/site'

export async function getBlogPaginationPaths(
  language: Language,
  paginate: PaginateFunction,
) {
  const [posts, site] = await Promise.all([
    getPublishedBlogPosts(language),
    getSite(language),
  ])
  // Keep the archive at /blog/ and numbered pages at /blog/page/N/.
  return paginate(posts, {
    pageSize: site.data.blog.postsPerPage,
    format: (url) => `${url.replace(/\/(\d+)$/, '/page/$1')}/`,
  }).map(({ params, props }) => ({
    params: { page: params.page ? `page/${params.page}` : undefined },
    props,
  }))
}
