import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const SITE_URL = 'https://waykegoat.github.io'

function ensureHeadElement<T extends HTMLElement>(selector: string, factory: () => T): T {
  let el = document.head.querySelector<T>(selector)
  if (!el) {
    el = factory()
    document.head.appendChild(el)
  }
  return el
}

function setNamedMeta(name: string, content: string): void {
  const el = ensureHeadElement(`meta[name="${name}"]`, () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', name)
    return meta
  })
  el.setAttribute('content', content)
}

function setPropertyMeta(property: string, content: string): void {
  const el = ensureHeadElement(`meta[property="${property}"]`, () => {
    const meta = document.createElement('meta')
    meta.setAttribute('property', property)
    return meta
  })
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string, hreflang?: string): void {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  const el = ensureHeadElement(selector, () => {
    const link = document.createElement('link')
    link.setAttribute('rel', rel)
    if (hreflang) link.setAttribute('hreflang', hreflang)
    return link
  })
  el.setAttribute('href', href)
}

export function useSeoMeta(): void {
  const { t, locale } = useI18n()
  const route = useRoute()

  watchEffect(() => {
    if (route.name === 'admin') {
      document.title = 'Админка — wayke'
      setNamedMeta('robots', 'noindex, nofollow')
      return
    }

    const url = locale.value === 'en' ? `${SITE_URL}/en` : `${SITE_URL}/`
    document.title = t('meta.title')
    setNamedMeta('robots', 'index, follow')
    setNamedMeta('description', t('meta.description'))
    setPropertyMeta('og:title', t('meta.title'))
    setPropertyMeta('og:description', t('meta.description'))
    setPropertyMeta('og:url', url)
    setPropertyMeta('og:locale', locale.value === 'en' ? 'en_US' : 'ru_RU')
    setLink('canonical', url)
    setLink('alternate', `${SITE_URL}/`, 'ru')
    setLink('alternate', `${SITE_URL}/en`, 'en')
    setLink('alternate', `${SITE_URL}/`, 'x-default')
  })
}
