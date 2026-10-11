import { getPublishedBlogPosts } from '@/lib/content'
import { localizedPath, type Language } from '@/lib/i18n'
import { createPaginationPage } from '@/lib/pagination'
import { getSite } from '@/lib/site'

export function getBlogPageUrl(page: number, language: Language): string {
  return localizedPath(page === 1 ? '/blog/' : `/blog/page/${page}/`, language)
}

export async function getBlogPage(language: Language, page: number = 1) {
  const [posts, site] = await Promise.all([
    getPublishedBlogPosts(language),
    getSite(language),
  ])
  return createPaginationPage(posts, page, site.data.blog.postsPerPage)
}

export async function getBlogPaginationPaths(language: Language) {
  const [posts, site] = await Promise.all([
    getPublishedBlogPosts(language),
    getSite(language),
  ])
  const pageSize = site.data.blog.postsPerPage
  const { totalPages } = createPaginationPage(posts, 1, pageSize)

  return Array.from({ length: totalPages - 1 }, (_, index) => {
    const page = createPaginationPage(posts, index + 2, pageSize)
    return { params: { page: String(page.currentPage) }, props: { page } }
  })
}
