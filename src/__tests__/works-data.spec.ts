import { describe, expect, it } from 'vitest'
import {
  bundledImages,
  defaultWorks,
  normalizeWork,
  resolveImage,
  workContent,
} from '@/data/works'

describe('default works', () => {
  it('provide bilingual content for every work', () => {
    for (const work of defaultWorks) {
      expect(work.content.ru.title, work.id).not.toBe('')
      expect(work.content.en.title, work.id).not.toBe('')
      expect(work.content.ru.tags.length, work.id).toBeGreaterThan(0)
      expect(work.content.en.tags.length, work.id).toBeGreaterThan(0)
      expect(work.url, work.id).toMatch(/^https:\/\//)
    }
  })

  it('reference only bundled cover images', () => {
    for (const work of defaultWorks) {
      if (work.imageKey) {
        expect(bundledImages[work.imageKey], work.id).toBeDefined()
      }
    }
  })

  it('use unique ids and sequential indexes', () => {
    const ids = defaultWorks.map((w) => w.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(defaultWorks.map((w) => w.index)).toEqual(
      defaultWorks.map((_, i) => String(i + 1).padStart(2, '0')),
    )
  })
})

describe('resolveImage', () => {
  it('prefers uploaded image over bundled key', () => {
    const work = normalizeWork({ imageKey: defaultWorks[0].imageKey, image: 'data:image/jpeg;x' })
    expect(resolveImage(work)).toBe('data:image/jpeg;x')
    work.image = undefined
    expect(resolveImage(work)).toBe(bundledImages[defaultWorks[0].imageKey as string])
    work.imageKey = undefined
    expect(resolveImage(work)).toBeUndefined()
  })
})

describe('workContent', () => {
  it('falls back to ru for unknown locales', () => {
    const work = defaultWorks[0]
    expect(workContent(work, 'en')).toBe(work.content.en)
    expect(workContent(work, 'de')).toBe(work.content.ru)
  })
})

describe('normalizeWork', () => {
  it('migrates legacy flat works into bilingual shape', () => {
    const legacy = {
      id: 'legacy-1',
      index: '01',
      title: 'Старый сайт',
      kind: 'Лендинг',
      description: 'Описание',
      tags: ['Vue'],
      url: 'https://example.com',
      year: '2025',
    }
    const work = normalizeWork(legacy)
    expect(work.content.ru.title).toBe('Старый сайт')
    expect(work.content.en.title).toBe('Старый сайт')
    expect(work.content.en.tags).toEqual(['Vue'])
    expect(work.url).toBe('https://example.com')
  })

  it('drops malformed fields without crashing', () => {
    const work = normalizeWork({ content: { ru: { tags: [1, 'ok'] } }, live: 'yes' })
    expect(work.content.ru.tags).toEqual(['ok'])
    expect(work.content.en.title).toBe('')
    expect(work.live).toBeUndefined()
    expect(work.id).not.toBe('')
  })
})
