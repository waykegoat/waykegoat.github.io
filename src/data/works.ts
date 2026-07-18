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

export interface Work {
  id: string
  index: string
  title: string
  kind: string
  description: string
  tags: string[]
  url: string
  year: string
  live?: boolean
  image?: string
  imageKey?: string
}

export function resolveImage(work: Work): string | undefined {
  if (work.image) return work.image
  if (work.imageKey) return bundledImages[work.imageKey]
  return undefined
}

export const defaultWorks: Work[] = worksData as Work[]
