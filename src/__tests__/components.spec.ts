import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import WorkItem from '@/components/WorkItem.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import { ru } from '@/i18n/locales/ru'
import { en } from '@/i18n/locales/en'
import { defaultWorks } from '@/data/works'
import type { AppLocale } from '@/i18n'

function i18nPlugin(locale: AppLocale) {
  return createI18n({ legacy: false, locale, fallbackLocale: 'ru', messages: { ru, en } })
}

describe('WorkItem', () => {
  it('renders russian content on ru locale', () => {
    const wrapper = mount(WorkItem, {
      props: { work: defaultWorks[0] },
      global: { plugins: [i18nPlugin('ru')] },
    })
    expect(wrapper.text()).toContain(defaultWorks[0].content.ru.title)
    expect(wrapper.text()).toContain(ru.works.live)
  })

  it('renders english content on en locale', () => {
    const wrapper = mount(WorkItem, {
      props: { work: defaultWorks[0] },
      global: { plugins: [i18nPlugin('en')] },
    })
    expect(wrapper.text()).toContain(defaultWorks[0].content.en.title)
    expect(wrapper.text()).toContain(defaultWorks[0].content.en.kind)
    expect(wrapper.text()).not.toContain(defaultWorks[0].content.ru.kind)
  })

  it('links to the work url in a new tab', () => {
    const wrapper = mount(WorkItem, {
      props: { work: defaultWorks[0] },
      global: { plugins: [i18nPlugin('ru')] },
    })
    const link = wrapper.get('a')
    expect(link.attributes('href')).toBe(defaultWorks[0].url)
    expect(link.attributes('target')).toBe('_blank')
  })
})

describe('ServicesSection', () => {
  it('shows prices on ru locale', () => {
    const wrapper = mount(ServicesSection, { global: { plugins: [i18nPlugin('ru')] } })
    expect(wrapper.findAll('.srv__from')).toHaveLength(ru.services.items.length)
    expect(wrapper.text()).toContain('от 3 000 ₽')
  })

  it('hides prices on en locale', () => {
    const wrapper = mount(ServicesSection, { global: { plugins: [i18nPlugin('en')] } })
    expect(wrapper.findAll('.srv__from')).toHaveLength(0)
    expect(wrapper.text()).toContain(en.services.items[0].title)
  })
})
