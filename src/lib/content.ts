import { getCollection, type CollectionEntry } from 'astro:content'
import { localizedPath, otherLanguage, type Language } from '@/lib/i18n'

export type BlogPost = CollectionEntry<'blog'>
export type Moment = CollectionEntry<'moments'>
export type Project = CollectionEntry<'projects'>
export type PageEntry = CollectionEntry<'pages'>
export type LegacyPost = CollectionEntry<'legacy'>
export type Post = BlogPost | LegacyPost

type LocalizedEntry = Post | Project | PageEntry

export function getContentLanguage(entry: LocalizedEntry): Language {
  const language = entry.id.split('/')[0]
  if (language !== 'en' && language !== 'zh') {
    throw new Error(
      `Content must be in an en/ or zh/ directory: ${entry.collection}/${entry.id}`,
    )
  }
  return language
}

export function getContentUrl(entry: LocalizedEntry): string {
  if (entry.collection === 'legacy') return `/${entry.id}`
  const language = getContentLanguage(entry)
  const slug = entry.id.slice(language.length + 1)
  if (entry.collection === 'pages') return localizedPath(`/${slug}`, language)
  return localizedPath(`/${entry.collection}/${slug}`, language)
}

function getTranslationUrl(
  entry: LocalizedEntry,
  entries: LocalizedEntry[],
): string | undefined {
  const language = getContentLanguage(entry)
  const translatedId = `${otherLanguage(language)}/${entry.id.slice(language.length + 1)}`
  const translation = entries.find(({ id }) => id === translatedId)
  return translation ? getContentUrl(translation) : undefined
}

export function getLocalizedPaths<Entry extends BlogPost | Project | PageEntry>(
  entries: Entry[],
  language: Language,
) {
  return entries
    .filter((entry) => getContentLanguage(entry) === language)
    .map((entry) => ({
      params: { slug: entry.id.slice(language.length + 1) },
      props: { entry, alternateUrl: getTranslationUrl(entry, entries) },
    }))
}

export async function getPublishedBlogPosts(
  language?: Language,
): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    ({ id, data }) =>
      !data.draft && (!language || id.startsWith(`${language}/`)),
  )

  return posts.sort(
    (left, right) =>
      right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
  )
}

export async function getMoments(): Promise<Moment[]> {
  const moments = await getCollection('moments')
  return moments.sort((left, right) =>
    right.data.date.localeCompare(left.data.date),
  )
}

export async function getPublishedProjects(
  language?: Language,
): Promise<Project[]> {
  const projects = await getCollection(
    'projects',
    ({ id, data }) =>
      !data.draft && (!language || id.startsWith(`${language}/`)),
  )

  return projects.sort(
    (left, right) =>
      right.data.order - left.data.order || right.data.year - left.data.year,
  )
}
