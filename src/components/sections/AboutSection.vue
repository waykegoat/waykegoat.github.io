<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWorks } from '@/stores/works'

const { t } = useI18n()
const store = useWorks()

const stats = computed(() => [
  { value: '20+', label: t('about.stats.github') },
  { value: String(store.items.length), label: t('about.stats.portfolio') },
  { value: '2', label: t('about.stats.frameworks') },
  { value: '∞', label: t('about.stats.detail') },
])
</script>

<template>
  <section id="about" class="about">
    <div class="shell">
      <span class="label about__label reveal">{{ t('about.label') }}</span>
      <i18n-t
        keypath="about.statement"
        tag="h2"
        class="about__statement reveal"
        data-delay="1"
        scope="global"
      >
        <template #mark>
          <span class="about__mark">{{ t('about.statementMark') }}</span>
        </template>
      </i18n-t>

      <div class="about__grid">
        <p class="about__text reveal" data-delay="1">
          {{ t('about.text') }}
        </p>
        <ul class="about__stats">
          <li
            v-for="(s, i) in stats"
            :key="s.label"
            class="reveal"
            :data-delay="String((i % 3) + 1)"
          >
            <span class="about__value">{{ s.value }}</span>
            <span class="about__stat-label">{{ s.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--paper);
  color: var(--ink);
  padding-block: clamp(70px, 10vw, 150px);
  border-radius: 40px 40px 0 0;
}
.about__label {
  color: #7a756a;
}
.about__label::before {
  background: var(--accent);
}
.about__statement {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(1.8rem, 4.4vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  max-width: 18ch;
  margin-top: 28px;
}
.about__mark {
  color: var(--accent);
}
.about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-top: clamp(40px, 6vw, 80px);
  align-items: start;
}
.about__text {
  font-size: clamp(1.05rem, 1.6vw, 1.35rem);
  line-height: 1.5;
  color: #3a362f;
  max-width: 40ch;
}
.about__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px 40px;
}
.about__value {
  display: block;
  font-family: var(--display);
  font-weight: 900;
  font-size: clamp(2.6rem, 5vw, 4.4rem);
  line-height: 1;
  letter-spacing: -0.03em;
}
.about__stat-label {
  display: block;
  margin-top: 8px;
  font-size: 0.92rem;
  color: #6b665c;
}
@media (max-width: 820px) {
  .about__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
