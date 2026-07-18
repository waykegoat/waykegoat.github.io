import { createI18n } from 'vue-i18n'
import { ru } from './locales/ru'
import { en } from './locales/en'

export const SUPPORT_LOCALES = ['ru', 'en'] as const
export type AppLocale = (typeof SUPPORT_LOCALES)[number]
export type MessageSchema = typeof ru

const STORAGE_KEY = 'wayke.locale'

export const i18n = createI18n<[MessageSchema], AppLocale, false>({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: { ru, en },
})

export function isAppLocale(value: unknown): value is AppLocale {
  return value === 'ru' || value === 'en'
}

export function setLocale(locale: AppLocale): void {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
}

export function storeLocale(locale: AppLocale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    return
  }
}

export function preferredLocale(): AppLocale {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    stored = null
  }
  if (isAppLocale(stored)) return stored
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function localePath(locale: AppLocale): string {
  return locale === 'en' ? '/en' : '/'
}
