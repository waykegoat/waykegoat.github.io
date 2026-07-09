<script setup lang="ts">
withDefaults(
  defineProps<{
    href?: string
    variant?: 'solid' | 'outline'
    size?: 'md' | 'lg'
  }>(),
  { variant: 'solid', size: 'md' },
)
</script>

<template>
  <a
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
  >
    <span class="btn__label"><slot /></span>
    <span class="btn__arrow" aria-hidden="true">↗</span>
  </a>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--body);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border-radius: 999px;
  border: 1px solid transparent;
  transition:
    background 0.3s var(--ease),
    color 0.3s var(--ease),
    border-color 0.3s var(--ease),
    transform 0.3s var(--ease);
}
.btn--md {
  padding: 15px 26px;
  font-size: 0.86rem;
}
.btn--lg {
  padding: 20px 34px;
  font-size: 1rem;
}
.btn--solid {
  background: var(--accent);
  color: #fff;
}
.btn--solid:hover {
  background: var(--text);
  color: var(--ink);
  transform: translateY(-3px);
}
.btn--outline {
  border-color: var(--line-strong);
  color: var(--text);
}
.btn--outline:hover {
  background: var(--text);
  color: var(--ink);
  border-color: var(--text);
  transform: translateY(-3px);
}
.btn__arrow {
  font-size: 1.15em;
  transition: transform 0.3s var(--ease);
}
.btn:hover .btn__arrow {
  transform: translate(3px, -3px);
}
</style>
