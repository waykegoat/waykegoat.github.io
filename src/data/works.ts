import { isAppLocale, SUPPORT_LOCALES, type AppLocale } from '@/i18n'
import worksData from './works.json'

const imageModules = import.meta.glob<string>('@/assets/img/works/*.jpg', {
  eager: true,
  import: 'default',
})

export const bundledImages: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.replace(/^.*\/([^/]+)\.jpg$/, '$1'),
    url,
  ]),
)

export interface WorkContent {
  title: string
  kind: string
  description: string
  tags: string[]
}

export interface Work {
  id: string
  index: string
  url: string
  year: string
  live?: boolean
  image?: string
  imageKey?: string
  content: Record<AppLocale, WorkContent>
}

export function resolveImage(work: Work): string | undefined {
  if (work.image) return work.image
  if (work.imageKey) return bundledImages[work.imageKey]
  return undefined
}

export function workContent(work: Work, locale: string): WorkContent {
  return work.content[isAppLocale(locale) ? locale : 'ru']
}

function normalizeContent(value: unknown): WorkContent {
  const raw = (value ?? {}) as Partial<WorkContent>
  return {
    title: typeof raw.title === 'string' ? raw.title : '',
    kind: typeof raw.kind === 'string' ? raw.kind : '',
    description: typeof raw.description === 'string' ? raw.description : '',
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t): t is string => typeof t === 'string') : [],
  }
}

export function normalizeWork(value: unknown): Work {
  const raw = (value ?? {}) as Record<string, unknown>
  const flat = normalizeContent(raw)
  const rawContent = (raw.content ?? {}) as Partial<Record<AppLocale, unknown>>
  const content = Object.fromEntries(
    SUPPORT_LOCALES.map((locale) => [
      locale,
      raw.content ? normalizeContent(rawContent[locale]) : flat,
    ]),
  ) as Record<AppLocale, WorkContent>
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : `w-${Math.random().toString(36).slice(2)}`,
    index: typeof raw.index === 'string' ? raw.index : '00',
    url: typeof raw.url === 'string' ? raw.url : '',
    year: typeof raw.year === 'string' ? raw.year : String(new Date().getFullYear()),
    live: raw.live === true || undefined,
    image: typeof raw.image === 'string' ? raw.image : undefined,
    imageKey: typeof raw.imageKey === 'string' ? raw.imageKey : undefined,
    content,
  }
}

export const defaultWorks: Work[] = worksData as Work[]
