import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { emptyWork, newId, useWorks } from '@/stores/works'
import { defaultWorks } from '@/data/works'

const store = useWorks()

beforeEach(() => {
  localStorage.clear()
  store.resetToDefault()
})

describe('works store', () => {
  it('starts with the default works', () => {
    expect(store.items).toHaveLength(defaultWorks.length)
    expect(store.items[0].id).toBe(defaultWorks[0].id)
  })

  it('adds a work and reindexes', () => {
    const work = emptyWork()
    work.content.ru.title = 'Новая'
    store.add(work)
    expect(store.items).toHaveLength(defaultWorks.length + 1)
    expect(store.items.at(-1)?.index).toBe(String(defaultWorks.length + 1).padStart(2, '0'))
  })

  it('moves works and keeps indexes sequential', () => {
    const [first, second] = store.items
    store.move(first.id, 1)
    expect(store.items[0].id).toBe(second.id)
    expect(store.items[0].index).toBe('01')
    expect(store.items[1].id).toBe(first.id)
    expect(store.items[1].index).toBe('02')
  })

  it('removes a work by id', () => {
    const target = store.items[0]
    store.remove(target.id)
    expect(store.items.find((w) => w.id === target.id)).toBeUndefined()
    expect(store.items[0].index).toBe('01')
  })

  it('normalizes legacy items on replaceAll', () => {
    store.replaceAll([
      {
        id: 'legacy',
        title: 'Флэт',
        kind: 'Лендинг',
        description: 'x',
        tags: ['Vue'],
        url: 'https://example.com',
        year: '2024',
      } as never,
    ])
    expect(store.items).toHaveLength(1)
    expect(store.items[0].content.en.title).toBe('Флэт')
  })

  it('persists changes to localStorage', async () => {
    store.items[0].content.ru.title = 'Изменено'
    await nextTick()
    const raw = localStorage.getItem('wayke.portfolio.works.v2')
    expect(raw).toContain('Изменено')
  })

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 50 }, () => newId()))
    expect(ids.size).toBe(50)
  })
})
