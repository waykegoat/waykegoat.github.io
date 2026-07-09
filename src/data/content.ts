export interface Service {
  no: string
  title: string
  text: string
  from: string
}

export const services: Service[] = [
  {
    no: '01',
    title: 'Лендинги',
    text: 'Продающие одностраничники с нуля: адаптив, анимации, формы, аналитика.',
    from: 'от 3 000 ₽',
  },
  {
    no: '02',
    title: 'Магазины и многостраничники',
    text: 'Каталог, корзина, оформление заказа, интеграции с оплатой и CRM.',
    from: 'от 6 000 ₽',
  },
  {
    no: '03',
    title: 'Веб-приложения / SPA',
    text: 'Личные кабинеты и дашборды на Vue 3 / React. Лёгкий бэкенд на Go.',
    from: 'от 10 000 ₽',
  },
  {
    no: '04',
    title: 'Вёрстка по макету',
    text: 'Pixel-perfect из Figma, чистый семантичный код, кроссбраузерность.',
    from: 'от 1 000 ₽ / экран',
  },
]

export const stack: string[] = [
  'Vue 3',
  'React',
  'TypeScript',
  'JavaScript',
  'HTML / CSS',
  'Go · Backend',
  'Python · Backend',
  'Vite',
  'Figma',
  'Git',
]

export interface StatItem {
  value: string
  label: string
}

export const stats: StatItem[] = [
  { value: '20+', label: 'проектов на GitHub' },
  { value: '6', label: 'сайтов в портфолио' },
  { value: '2', label: 'фреймворка — Vue и React' },
  { value: '∞', label: 'внимания к деталям' },
]

export const contacts = {
  telegram: 'https://t.me/waykeqq',
  telegramHandle: '@waykeqq',
  github: 'https://github.com/waykegoat',
  githubHandle: 'github.com/waykegoat',
}
