import shotAuto from '@/assets/img/shot-autoservice.jpg'
import shotBeauty from '@/assets/img/shot-beauty.jpg'
import shotRestaurant from '@/assets/img/shot-restaurant.jpg'

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

export const defaultWorks: Work[] = [
  {
    id: 'rabochiy-resurs',
    index: '01',
    title: 'Рабочий ресурс',
    kind: 'Коммерческий сайт',
    description: 'Сайт по подбору разнорабочих в Московской области. Свой домен, заявки, адаптив.',
    tags: ['Vue 3', 'Прод', 'Адаптив'],
    url: 'https://rabochiy-resurs.ru/',
    year: '2026',
    live: true,
  },
  {
    id: 'gk-drive',
    index: '02',
    title: 'ГК Драйв',
    kind: 'Автосервис',
    description:
      '5 страниц, запись онлайн, прайс с фильтром по категориям, тёмная индустриальная тема.',
    tags: ['Vue 3', 'TypeScript', 'Vue Router'],
    url: 'https://waykegoat.github.io/autoservice/',
    year: '2026',
    imageKey: 'auto',
  },
  {
    id: 'fleur',
    index: '03',
    title: 'Салон «Флёр»',
    kind: 'Салон красоты',
    description: 'Галерея работ, мастера, запись с выбором услуги. Светлая элегантная эстетика.',
    tags: ['Vue 3', 'TypeScript', 'UI/UX'],
    url: 'https://waykegoat.github.io/salon/',
    year: '2026',
    imageKey: 'beauty',
  },
  {
    id: 'terroir',
    index: '04',
    title: 'Ресторан «Терруар»',
    kind: 'Ресторан',
    description: 'Меню с фильтром, бронь столика с датой и временем. Тёмная атмосферная тема.',
    tags: ['React', 'TypeScript', 'React Router'],
    url: 'https://waykegoat.github.io/restaurant/',
    year: '2026',
    imageKey: 'restaurant',
  },
  {
    id: 'kitchenroom',
    index: '05',
    title: 'Kitchen Room',
    kind: 'Сайт студии',
    description: 'Сайт кухонной студии: адаптивная вёрстка, галерея, форма заявки.',
    tags: ['Vue 3', 'HTML/CSS'],
    url: 'https://waykegoat.github.io/kitchenroom/',
    year: '2026',
  },
  {
    id: 'milk',
    index: '06',
    title: 'Milk Shop',
    kind: 'Интернет-магазин',
    description: 'Витрина магазина: каталог, карточки товаров, корзина.',
    tags: ['Vue 3', 'JavaScript'],
    url: 'https://waykegoat.github.io/milk/',
    year: '2025',
  },
]
