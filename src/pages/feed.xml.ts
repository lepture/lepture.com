import type { APIContext } from 'astro'
import { createFeed } from '@/lib/rss'

export async function GET(context: APIContext) {
  return createFeed(context.site)
}
