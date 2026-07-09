<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { contacts } from '@/data/content'
import { scrollToId } from '@/utils/scroll'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr shell">
    <div class="ftr__row">
      <span class="ftr__logo">wayke<sup>©</sup></span>
      <div class="ftr__links">
        <a :href="contacts.telegram" target="_blank" rel="noopener">Telegram</a>
        <a :href="contacts.github" target="_blank" rel="noopener">GitHub</a>
        <a href="#top" @click.prevent="scrollToId('top')">Наверх ↑</a>
      </div>
    </div>
    <div class="ftr__base">
      <span>© {{ year }} wayke — фронтенд-разработчик, Россия</span>
      <span class="ftr__meta">
        Сделано на Vue 3 + TypeScript
        <RouterLink to="/admin" class="ftr__admin">Админка</RouterLink>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  border-top: 1px solid var(--line);
  padding-block: 40px 30px;
}
.ftr__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 26px;
}
.ftr__logo {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.4rem;
  text-transform: uppercase;
}
.ftr__logo sup {
  color: var(--accent);
  font-size: 0.5em;
}
.ftr__links {
  display: flex;
  gap: 26px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.ftr__links a:hover {
  color: var(--accent);
}
.ftr__base {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--dim);
  font-size: 0.8rem;
  border-top: 1px solid var(--line);
  padding-top: 24px;
}
.ftr__meta {
  display: inline-flex;
  gap: 16px;
  align-items: center;
}
.ftr__admin {
  color: var(--dim);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ftr__admin:hover {
  color: var(--accent);
}
@media (max-width: 560px) {
  .ftr__row {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>
