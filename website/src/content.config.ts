import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ 
    pattern: '**/[^_]*.{md,mdx}', 
    base: "./src/content/work",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, "").replace(/\\/g, '/')
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale: z.enum(['id', 'en']),
    translationKey: z.string(),
    client: z.string(),
    clientDisplayAllowed: z.boolean(),
    summary: z.string(),
    services: z.array(z.string()),
    industry: z.string(),
    period: z.string(),
    featured: z.boolean(),
    coverImage: z.string(),
    coverAlt: z.string(),
    challenge: z.string(),
    approach: z.string(),
    deliverables: z.array(z.string()),
    outcomes: z.array(z.string()),
    proofStatus: z.enum(['pending', 'verified']),
    seoTitle: z.string(),
    seoDescription: z.string(),
    draft: z.boolean()
  })
});

const insights = defineCollection({
  loader: glob({ 
    pattern: '**/[^_]*.{md,mdx}', 
    base: "./src/content/insights",
    generateId: ({ entry }) => entry.replace(/\.[^/.]+$/, "").replace(/\\/g, '/')
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    locale: z.enum(['id', 'en']),
    translationKey: z.string(),
    summary: z.string(),
    category: z.string(),
    author: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    heroImage: z.string(),
    heroAlt: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    sources: z.array(z.string()),
    draft: z.boolean()
  })
});

export const collections = { work, insights };
