<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/ui/AppButton.vue'
import heroVideo from '@/assets/img/wayke-hero.mp4'
import heroPoster from '@/assets/img/wayke-hero-poster.jpg'
import { contacts } from '@/data/content'
import { scrollToId } from '@/utils/scroll'

const { t } = useI18n()

const entered = ref(false)
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
onMounted(() => requestAnimationFrame(() => (entered.value = true)))
</script>

<template>
  <section id="top" class="hero shell" :class="{ 'hero--in': entered }">
    <div class="hero__meta">
      <span class="label">{{ t('hero.role') }}</span>
      <span class="hero__loc">{{ t('hero.location') }}</span>
    </div>

    <div class="hero__grid">
      <div class="hero__headline">
        <h1 class="display-xl hero__name">
          <span class="hero__word">wayke</span>
        </h1>
        <i18n-t keypath="hero.statement" tag="p" class="hero__statement" scope="global">
          <template #accent>
            <span class="accent">{{ t('hero.statementAccent') }}</span>
          </template>
        </i18n-t>
        <div class="hero__cta">
          <AppButton to="works" variant="solid" size="lg">{{ t('hero.ctaWorks') }}</AppButton>
          <AppButton :href="contacts.telegram" variant="outline" size="lg">
            {{ t('hero.ctaTelegram') }}
          </AppButton>
        </div>
      </div>

      <figure class="hero__media" data-cursor>
        <video
          v-if="!reducedMotion"
          :src="heroVideo"
          :poster="heroPoster"
          autoplay
          muted
          loop
          playsinline
        />
        <img v-else :src="heroPoster" alt="wayke" />
        <figcaption>{{ t('hero.caption') }}</figcaption>
      </figure>
    </div>

    <a href="#works" class="hero__scroll" @click.prevent="scrollToId('works')">
      <span>{{ t('hero.scroll') }}</span>
      <span class="hero__scroll-line" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(30px, 5vw, 60px);
  padding-block: 120px 60px;
  position: relative;
}
.hero__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--line);
  padding-bottom: 24px;
}
.hero__loc {
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.hero__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: end;
}
.hero__name {
  overflow: hidden;
}
.hero__word {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 1s var(--ease);
}
.hero--in .hero__word {
  transform: none;
}
.hero__statement {
  max-width: 620px;
  margin-top: 32px;
  font-size: clamp(1.1rem, 2.2vw, 1.6rem);
  line-height: 1.35;
  color: var(--text);
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.9s var(--ease) 0.3s,
    transform 0.9s var(--ease) 0.3s;
}
.hero--in .hero__statement {
  opacity: 1;
  transform: none;
}
.hero__cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 36px;
  opacity: 0;
  transition: opacity 0.9s var(--ease) 0.5s;
}
.hero--in .hero__cta {
  opacity: 1;
}
.hero__media {
  width: clamp(180px, 22vw, 300px);
  border: 1px solid var(--line-strong);
  border-radius: 18px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(24px) rotate(3deg);
  transition:
    opacity 1s var(--ease) 0.4s,
    transform 1s var(--ease) 0.4s;
}
.hero--in .hero__media {
  opacity: 1;
  transform: rotate(3deg);
}
.hero__media img,
.hero__media video {
  width: 100%;
  aspect-ratio: 5 / 3;
  object-fit: cover;
}
.hero__media figcaption {
  padding: 10px 14px;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  border-top: 1px solid var(--line);
}
.hero__scroll {
  position: absolute;
  left: var(--pad);
  bottom: 26px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.hero__scroll-line {
  width: 60px;
  height: 1px;
  background: var(--line-strong);
  position: relative;
  overflow: hidden;
}
.hero__scroll-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  animation: slide 2s var(--ease) infinite;
}
@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  60%,
  100% {
    transform: translateX(100%);
  }
}
@media (max-width: 820px) {
  .hero__grid {
    grid-template-columns: 1fr;
    align-items: start;
  }
  .hero__media {
    display: none;
  }
  .hero__scroll {
    display: none;
  }
}
</style>
