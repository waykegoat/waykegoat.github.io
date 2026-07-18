<script setup lang="ts">
import WorkItem from '@/components/WorkItem.vue'
import { useWorks } from '@/stores/works'

const store = useWorks()
</script>

<template>
  <section id="works" class="works shell">
    <header class="works__head">
      <span class="label reveal">Избранные работы</span>
      <h2 class="display-lg works__title reveal" data-delay="1">
        Проекты, <span class="accent">которыми горжусь</span>
      </h2>
      <p class="works__note reveal" data-delay="2">
        Реальные сайты на Vue и React — от коммерческого проекта в проде до демо-кейсов под ниши.
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
