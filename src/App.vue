<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'
import CustomCursor from '@/components/layout/CustomCursor.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import WorksSection from '@/components/sections/WorksSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import MarqueeLine from '@/components/ui/MarqueeLine.vue'
import { stack } from '@/data/content'

const ctaWords = ['доступен для заказов', 'сделаю сайт под ключ', 'напишите мне']

useScrollReveal()
</script>

<template>
  <CustomCursor />
  <SiteHeader />
  <main>
    <HeroSection />
    <div class="strip">
      <MarqueeLine :items="stack" separator="/" :duration="40" />
    </div>
    <WorksSection />
    <AboutSection />
    <ServicesSection />
    <div class="strip strip--accent">
      <MarqueeLine :items="ctaWords" separator="✦" reverse :duration="26" />
    </div>
    <ContactSection />
  </main>
  <SiteFooter />
</template>

<style scoped>
.strip {
  border-block: 1px solid var(--line);
  padding-block: 22px;
}
.strip--accent {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.strip--accent :deep(.ml__sep) {
  color: #fff;
}
</style>
