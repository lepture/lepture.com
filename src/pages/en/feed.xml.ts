import type { APIContext } from 'astro'
import { createFeed } from '@/lib/feed'

export async function GET(context: APIContext) {
  return createFeed(context.site, { language: 'en', title: 'English' })
}
