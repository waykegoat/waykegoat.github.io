import { reactive, watch } from 'vue'
import { defaultWorks, type Work } from '@/data/works'

const STORAGE_KEY = 'wayke.portfolio.works.v1'

function clone(list: Work[]): Work[] {
  return list.map((w) => ({ ...w, tags: [...w.tags] }))
}

function load(): Work[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Work[]
    }
  } catch {
    return clone(defaultWorks)
  }
  return clone(defaultWorks)
}

const items = reactive<Work[]>(load())

function reindex(): void {
  items.forEach((w, i) => {
    w.index = String(i + 1).padStart(2, '0')
  })
}

watch(
  () => items,
  () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      return
    }
  },
  { deep: true },
)

export function newId(): string {
  return `w-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export function emptyWork(): Work {
  return {
    id: newId(),
    index: '00',
    title: '',
    kind: '',
    description: '',
    tags: [],
    url: '',
    year: String(new Date().getFullYear()),
  }
}

export function useWorks() {
  return {
    items,

    add(work: Work): void {
      items.push({ ...work, tags: [...work.tags] })
      reindex()
    },

    update(id: string, patch: Partial<Work>): void {
      const found = items.find((w) => w.id === id)
      if (found) Object.assign(found, patch)
    },

    remove(id: string): void {
      const i = items.findIndex((w) => w.id === id)
      if (i >= 0) {
        items.splice(i, 1)
        reindex()
      }
    },

    move(id: string, dir: -1 | 1): void {
      const i = items.findIndex((w) => w.id === id)
      const j = i + dir
      if (i >= 0 && j >= 0 && j < items.length) {
        const [moved] = items.splice(i, 1)
        items.splice(j, 0, moved)
        reindex()
      }
    },

    resetToDefault(): void {
      items.splice(0, items.length, ...clone(defaultWorks))
      reindex()
    },

    replaceAll(list: Work[]): void {
      items.splice(0, items.length, ...clone(list))
      reindex()
    },

    exportJson(): string {
      return JSON.stringify(items, null, 2)
    },
  }
}
