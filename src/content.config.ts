import { defineCollection, reference } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const legacySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  socialImage: z.url().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    project: reference('projects').optional(),
  }),
})

const legacy = defineCollection({
  loader: glob({
    base: './src/legacy',
    pattern: '**/*.mdx',
  }),
  schema: legacySchema,
})

const moments = defineCollection({
  loader: glob({
    base: './src/content/moments',
    pattern: '**/*.{yaml,yml}',
  }),
  schema: z.object({
    title: z.string(),
    date: z.iso.date(),
    photos: z
      .array(
        z.object({
          src: z.url(),
          alt: z.string().default(''),
          width: z.number().int().positive().optional(),
          height: z.number().int().positive().optional(),
          caption: z.string().optional(),
        }),
      )
      .min(1),
  }),
})

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number().int(),
    category: z.enum(['Open Source', 'Web App']),
    website: z.url().optional(),
    repository: z.url().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(0),
    draft: z.boolean().default(false),
  }),
})

const linkSchema = z.object({
  label: z.string(),
  href: z.string().min(1),
})

const homeSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  limit: z.number().int().positive(),
})

const site = defineCollection({
  loader: glob({
    base: './src/content/site',
    pattern: '*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string(),
    logo: z.string().min(1),
    navigation: z.array(linkSchema),
    footer: z.array(linkSchema),
    home: z.object({
      name: z.string(),
      projects: homeSectionSchema,
      writing: homeSectionSchema,
      contact: z.object({
        title: z.string(),
        links: z.array(linkSchema),
      }),
    }),
    blog: z.object({ postsPerPage: z.number().int().positive() }),
    projects: z.object({ relatedPostsLimit: z.number().int().nonnegative() }),
  }),
})

const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.mdx',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export const collections = { blog, legacy, moments, projects, site, pages }
