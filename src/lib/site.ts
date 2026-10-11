import { getEntry, type CollectionEntry } from 'astro:content'
import type { Language } from '@/lib/i18n'

export type Site = CollectionEntry<'site'>['data']

export async function getSite(language: Language = 'en') {
  const entry = await getEntry('site', language)
  if (!entry) throw new Error(`Missing site content: ${language}.mdx`)
  return entry
}

export function getNavigationCurrent(
  href: string,
  currentUrl: URL,
): 'page' | 'location' | undefined {
  const targetUrl = new URL(href, currentUrl)
  if (targetUrl.origin !== currentUrl.origin) return undefined

  const current = currentUrl.pathname.replace(/\/$/, '')
  const target = targetUrl.pathname.replace(/\/$/, '')
  if (current === target) return 'page'
  // Home links should only be active on the homepage, including Chinese home.
  if (target === '' || target === '/zh') return undefined
  return current.startsWith(`${target}/`) ? 'location' : undefined
}
