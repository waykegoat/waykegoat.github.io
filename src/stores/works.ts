import { reactive, watch } from 'vue'
import { defaultWorks, normalizeWork, type Work } from '@/data/works'

const STORAGE_KEY = 'wayke.portfolio.works.v2'

function clone(list: Work[]): Work[] {
  return list.map((work) => normalizeWork(JSON.parse(JSON.stringify(work))))
}

function load(): Work[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(normalizeWork)
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
  return normalizeWork({ id: newId() })
}

export function useWorks() {
  return {
    items,

    add(work: Work): void {
      items.push(...clone([work]))
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
  }
}
