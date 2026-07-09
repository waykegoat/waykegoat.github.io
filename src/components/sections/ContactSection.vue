<script setup lang="ts">
import { contacts } from '@/data/content'
</script>

<template>
  <section id="contact" class="contact shell">
    <span class="label reveal">Контакт</span>
    <h2 class="display-xl contact__title reveal" data-delay="1">
      Давайте<br /><span class="accent">работать</span>
    </h2>
    <p class="contact__note reveal" data-delay="2">
      Расскажите задачу — оценю бесплатно и покажу примеры. Обычно отвечаю в течение часа.
    </p>

    <div class="contact__links">
      <a
        :href="contacts.telegram"
        target="_blank"
        rel="noopener"
        class="contact__link reveal"
        data-cursor
      >
        <span class="contact__link-label">Telegram</span>
        <span class="contact__link-value">{{ contacts.telegramHandle }}</span>
        <span class="contact__link-arrow">↗</span>
      </a>
      <a
        :href="contacts.github"
        target="_blank"
        rel="noopener"
        class="contact__link reveal"
        data-delay="1"
        data-cursor
      >
        <span class="contact__link-label">GitHub</span>
        <span class="contact__link-value">{{ contacts.githubHandle }}</span>
        <span class="contact__link-arrow">↗</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-block: clamp(80px, 12vw, 180px) clamp(50px, 8vw, 100px);
  text-align: center;
}
.contact__title {
  margin-top: 24px;
}
.contact__note {
  margin: 30px auto 0;
  color: var(--muted);
  font-size: 1.15rem;
  max-width: 480px;
}
.contact__links {
  margin-top: clamp(50px, 7vw, 90px);
  border-top: 1px solid var(--line);
}
.contact__link {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 30px;
  align-items: center;
  padding: clamp(24px, 3.5vw, 44px) 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
  transition: padding-left 0.4s var(--ease);
}
.contact__link:hover {
  padding-left: 20px;
}
.contact__link-label {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(1.6rem, 4vw, 3.2rem);
  text-transform: uppercase;
  transition: color 0.3s;
}
.contact__link:hover .contact__link-label {
  color: var(--accent);
}
.contact__link-value {
  color: var(--muted);
  font-size: 1.05rem;
}
.contact__link-arrow {
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  transition: transform 0.3s var(--ease);
}
.contact__link:hover .contact__link-arrow {
  transform: translate(6px, -6px);
  color: var(--accent);
}
@media (max-width: 640px) {
  .contact__link {
    grid-template-columns: 1fr auto;
    gap: 6px 20px;
  }
  .contact__link-value {
    grid-column: 1;
  }
}
</style>
