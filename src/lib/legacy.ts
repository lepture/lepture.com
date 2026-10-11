import { getCollection } from 'astro:content'
import type { LegacyPost } from '@/lib/content'
import type { Language } from '@/lib/i18n'

export async function getPublishedPosts(
  language?: Language,
): Promise<LegacyPost[]> {
  const posts = await getCollection(
    'legacy',
    ({ id, data }) =>
      !data.draft && (!language || id.startsWith(`${language}/`)),
  )
  return posts.sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  )
}

export async function getArticlePaths(language: Language) {
  const posts = await getPublishedPosts(language)
  return posts.map((post) => {
    const [, year, slug] = post.id.split('/')
    return { params: { year, slug }, props: { post } }
  })
}
