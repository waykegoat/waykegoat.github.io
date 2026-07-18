<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LangSwitch from '@/components/ui/LangSwitch.vue'
import { contacts } from '@/data/content'
import { scrollToId } from '@/utils/scroll'

const { t } = useI18n()

const nav = computed(() => [
  { id: 'works', label: t('nav.works') },
  { id: 'services', label: t('nav.services') },
  { id: 'about', label: t('nav.about') },
  { id: 'contact', label: t('nav.contact') },
])

const scrolled = ref(false)
function onScroll(): void {
  scrolled.value = window.scrollY > 40
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="hdr" :class="{ 'hdr--scrolled': scrolled }">
    <div class="hdr__row shell">
      <a href="#top" class="hdr__logo" @click.prevent="scrollToId('top')">wayke<sup>©</sup></a>
      <nav class="hdr__nav">
        <a
          v-for="item in nav"
          :key="item.id"
          :href="`#${item.id}`"
          class="hdr__link"
          @click.prevent="scrollToId(item.id)"
          >{{ item.label }}</a
        >
      </nav>
      <div class="hdr__side">
        <LangSwitch />
        <a :href="contacts.telegram" target="_blank" rel="noopener" class="hdr__cta">
          <span class="hdr__dot" />{{ t('header.cta') }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition:
    background 0.4s var(--ease),
    border-color 0.4s var(--ease);
  border-bottom: 1px solid transparent;
}
.hdr--scrolled {
  background: rgba(10, 10, 11, 0.72);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}
.hdr__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}
.hdr__logo {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.hdr__logo sup {
  color: var(--accent);
  font-size: 0.5em;
}
.hdr__nav {
  display: flex;
  gap: 34px;
}
.hdr__link {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.2s;
}
.hdr__link:hover {
  color: var(--text);
}
.hdr__side {
  display: flex;
  align-items: center;
  gap: 14px;
}
.hdr__cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 11px 18px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  transition:
    border-color 0.3s,
    color 0.3s;
}
.hdr__cta:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.hdr__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #37c98a;
  box-shadow: 0 0 0 4px rgba(55, 201, 138, 0.2);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
@media (max-width: 820px) {
  .hdr__nav {
    display: none;
  }
  .hdr__cta {
    font-size: 0;
    gap: 0;
    padding: 12px;
  }
}
</style>
