import shotAuto from '@/assets/img/shot-autoservice.jpg'
import shotBeauty from '@/assets/img/shot-beauty.jpg'
import shotRestaurant from '@/assets/img/shot-restaurant.jpg'
import worksData from './works.json'

export type ImageKey = 'auto' | 'beauty' | 'restaurant'

/** Встроенные (забандленные) скриншоты дефолтных работ. */
export const bundledImages: Record<ImageKey, string> = {
  auto: shotAuto,
  beauty: shotBeauty,
  restaurant: shotRestaurant,
}

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
  /** Загруженная вручную картинка (data-URL). Приоритетнее imageKey. */
  image?: string
  /** Ключ встроенной картинки для дефолтных работ. */
  imageKey?: ImageKey
}

/** Итоговый src обложки: ручная загрузка → встроенная → нет. */
export function resolveImage(work: Work): string | undefined {
  if (work.image) return work.image
  if (work.imageKey) return bundledImages[work.imageKey]
  return undefined
}

export const defaultWorks: Work[] = worksData as Work[]
