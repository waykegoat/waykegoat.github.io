<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { stack } from '@/data/content'
import type { MessageSchema } from '@/i18n'

const { t, tm, rt } = useI18n()
const services = computed(() => tm('services.items') as MessageSchema['services']['items'])
</script>

<template>
  <section id="services" class="services shell">
    <header class="services__head">
      <span class="label reveal">{{ t('services.label') }}</span>
      <h2 class="display-lg services__title reveal" data-delay="1">{{ t('services.title') }}</h2>
      <p class="services__note reveal" data-delay="2">
        {{ t('services.note') }}
      </p>
    </header>

    <ul class="services__list">
      <li v-for="s in services" :key="rt(s.no)" class="srv reveal" data-cursor>
        <span class="srv__no">{{ rt(s.no) }}</span>
        <div class="srv__body">
          <h3 class="srv__title">{{ rt(s.title) }}</h3>
          <p class="srv__text">{{ rt(s.text) }}</p>
        </div>
        <span v-if="rt(s.from)" class="srv__from">{{ rt(s.from) }}</span>
      </li>
    </ul>

    <div class="services__stack reveal">
      <span class="services__stack-label">{{ t('services.stack') }}</span>
      <div class="services__stack-items">
        <span v-for="item in stack" :key="item">{{ item }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding-block: clamp(70px, 10vw, 140px);
}
.services__head {
  max-width: 900px;
  margin-bottom: clamp(30px, 5vw, 60px);
}
.services__title {
  margin-top: 22px;
}
.services__note {
  margin-top: 20px;
  color: var(--muted);
  font-size: 1.05rem;
}
.services__list {
  border-top: 1px solid var(--line);
}
.srv {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 30px;
  align-items: center;
  padding: clamp(24px, 3.5vw, 40px) 0;
  border-bottom: 1px solid var(--line);
  transition: padding-left 0.4s var(--ease);
}
.srv:hover {
  padding-left: 18px;
}
.srv__no {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1rem;
  color: var(--accent);
}
.srv__title {
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  transition: color 0.3s;
}
.srv:hover .srv__title {
  color: var(--accent);
}
.srv__text {
  margin-top: 8px;
  color: var(--muted);
  max-width: 52ch;
  font-size: 0.98rem;
}
.srv__from {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  white-space: nowrap;
}
.services__stack {
  display: flex;
  gap: 40px;
  margin-top: clamp(40px, 5vw, 70px);
  flex-wrap: wrap;
}
.services__stack-label {
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--muted);
  padding-top: 6px;
}
.services__stack-items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  flex: 1;
}
.services__stack-items span {
  font-family: var(--display);
  font-weight: 600;
  font-size: clamp(1rem, 2vw, 1.6rem);
  text-transform: uppercase;
  color: var(--text);
  padding: 6px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  transition:
    border-color 0.3s,
    color 0.3s;
}
.services__stack-items span:hover {
  border-color: var(--accent);
  color: var(--accent);
}
@media (max-width: 700px) {
  .srv {
    grid-template-columns: auto 1fr;
    gap: 16px 20px;
  }
  .srv__from {
    grid-column: 2;
    color: var(--accent);
  }
}
</style>
