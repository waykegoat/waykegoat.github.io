<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { localePath, storeLocale, SUPPORT_LOCALES, type AppLocale } from '@/i18n'

const { locale, t } = useI18n()
const router = useRouter()

function switchTo(target: AppLocale): void {
  if (target === locale.value) return
  storeLocale(target)
  router.push(localePath(target))
}
</script>

<template>
  <div class="lang" role="group" :aria-label="t('lang.label')">
    <button
      v-for="item in SUPPORT_LOCALES"
      :key="item"
      type="button"
      class="lang__btn"
      :class="{ 'lang__btn--on': locale === item }"
      :aria-pressed="locale === item"
      @click="switchTo(item)"
    >
      {{ item.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.lang__btn {
  font-family: var(--body);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  padding: 6px 8px;
  color: var(--muted);
  border-radius: 8px;
  transition:
    color 0.2s,
    background 0.2s;
}
.lang__btn:hover {
  color: var(--text);
}
.lang__btn--on {
  color: var(--text);
  background: var(--accent-soft);
}
</style>
