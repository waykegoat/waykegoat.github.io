<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { resolveImage, workContent, type Work } from '@/data/works'

const { t, locale } = useI18n()
const props = defineProps<{ work: Work }>()
const cover = computed(() => resolveImage(props.work))
const content = computed(() => workContent(props.work, locale.value))
</script>

<template>
  <a :href="work.url" target="_blank" rel="noopener" class="work reveal" data-cursor>
    <div class="work__media" :class="{ 'work__media--blank': !cover }">
      <img v-if="cover" :src="cover" :alt="content.title" loading="lazy" />
      <span v-else class="work__blank-title">{{ content.title }}</span>
      <span class="work__index">{{ work.index }}</span>
      <span v-if="work.live" class="work__live">● {{ t('works.live') }}</span>
      <span class="work__open">{{ t('works.open') }} <b>↗</b></span>
    </div>
    <div class="work__meta">
      <div class="work__head">
        <h3 class="work__title">{{ content.title }}</h3>
        <span class="work__year">{{ work.year }}</span>
      </div>
      <p class="work__kind">{{ content.kind }}</p>
      <p class="work__desc">{{ content.description }}</p>
      <ul class="work__tags">
        <li v-for="tag in content.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </a>
</template>

<style scoped>
.work {
  display: block;
}
.work__media {
  position: relative;
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  overflow: hidden;
  background: var(--bg-soft);
  border: 1px solid var(--line);
}
.work__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.7s var(--ease);
}
.work:hover .work__media img {
  transform: scale(1.05);
}
.work__media--blank {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1a1a1e, #0e0e10);
}
.work__blank-title {
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(1.6rem, 4vw, 3rem);
  text-transform: uppercase;
  color: var(--line-strong);
  letter-spacing: -0.02em;
  padding: 0 20px;
  text-align: center;
}
.work__index {
  position: absolute;
  top: 16px;
  left: 18px;
  font-family: var(--display);
  font-weight: 800;
  font-size: 1rem;
  color: #fff;
  mix-blend-mode: difference;
}
.work__live {
  position: absolute;
  top: 16px;
  right: 18px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #37c98a;
}
.work__open {
  position: absolute;
  inset: auto 0 0 0;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  color: #fff;
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.4s var(--ease),
    transform 0.4s var(--ease);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.55));
}
.work:hover .work__open {
  opacity: 1;
  transform: none;
}
.work__meta {
  padding: 22px 4px 0;
}
.work__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 12px;
}
.work__title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  transition: color 0.3s var(--ease);
}
.work:hover .work__title {
  color: var(--accent);
}
.work__year {
  font-size: 0.85rem;
  color: var(--dim);
}
.work__kind {
  margin-top: 14px;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.work__desc {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.96rem;
  max-width: 44ch;
}
.work__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}
.work__tags li {
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 12px;
}
</style>
