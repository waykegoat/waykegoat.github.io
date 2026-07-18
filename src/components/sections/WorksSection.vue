<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import WorkItem from '@/components/WorkItem.vue'
import { useWorks } from '@/stores/works'

const { t } = useI18n()
const store = useWorks()
</script>

<template>
  <section id="works" class="works shell">
    <header class="works__head">
      <span class="label reveal">{{ t('works.label') }}</span>
      <i18n-t
        keypath="works.title"
        tag="h2"
        class="display-lg works__title reveal"
        data-delay="1"
        scope="global"
      >
        <template #accent>
          <span class="accent">{{ t('works.titleAccent') }}</span>
        </template>
      </i18n-t>
      <p class="works__note reveal" data-delay="2">
        {{ t('works.note') }}
      </p>
    </header>

    <div class="works__grid">
      <WorkItem v-for="work in store.items" :key="work.id" :work="work" />
    </div>
  </section>
</template>

<style scoped>
.works {
  padding-block: clamp(70px, 10vw, 140px);
}
.works__head {
  max-width: 900px;
  margin-bottom: clamp(40px, 6vw, 80px);
}
.works__title {
  margin-top: 22px;
}
.works__note {
  margin-top: 24px;
  color: var(--muted);
  font-size: 1.1rem;
  max-width: 560px;
}
.works__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(30px, 5vw, 70px) clamp(24px, 3vw, 50px);
}
@media (max-width: 820px) {
  .works__grid {
    grid-template-columns: 1fr;
  }
}
</style>
