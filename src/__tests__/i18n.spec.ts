import { describe, expect, it } from 'vitest'
import { ru } from '@/i18n/locales/ru'
import { en } from '@/i18n/locales/en'

type Tree = Record<string, unknown>

function collectKeys(node: Tree, prefix = ''): string[] {
  return Object.entries(node).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') return collectKeys(value as Tree, path)
    return [path]
  })
}

function collectStrings(node: Tree, prefix = ''): Array<[string, string]> {
  return Object.entries(node).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object') return collectStrings(value as Tree, path)
    if (typeof value === 'string') return [[path, value] as [string, string]]
    return []
  })
}

describe('locales', () => {
  it('en mirrors every ru key', () => {
    expect(collectKeys(en as Tree)).toEqual(collectKeys(ru as Tree))
  })

  it('has no empty messages except hidden en prices', () => {
    for (const [path, value] of collectStrings(en as Tree)) {
      if (/^services\.items\.\d+\.from$/.test(path)) continue
      expect(value.trim(), path).not.toBe('')
    }
    for (const [path, value] of collectStrings(ru as Tree)) {
      expect(value.trim(), path).not.toBe('')
    }
  })

  it('keeps interpolation placeholders in sync', () => {
    const placeholders = (text: string): string[] => (text.match(/\{\w+\}/g) ?? []).sort()
    const enMap = new Map(collectStrings(en as Tree))
    for (const [path, ruValue] of collectStrings(ru as Tree)) {
      const enValue = enMap.get(path)
      if (typeof enValue === 'string') {
        expect(placeholders(enValue), path).toEqual(placeholders(ruValue))
      }
    }
  })
})
