<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    items: string[]
    separator?: string
    reverse?: boolean
    duration?: number
  }>(),
  { separator: '✦', reverse: false, duration: 32 },
)

const style = {
  animationDuration: `${props.duration}s`,
  animationDirection: props.reverse ? 'reverse' : 'normal',
}
</script>

<template>
  <div class="marquee ml" aria-hidden="true">
    <div v-for="n in 2" :key="n" class="marquee__track ml__track" :style="style">
      <span v-for="(item, i) in items" :key="`${n}-${i}`" class="ml__item">
        {{ item }}
        <b class="ml__sep">{{ separator }}</b>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ml {
  align-items: center;
}
.ml__track {
  gap: 0;
}
.ml__item {
  display: inline-flex;
  align-items: center;
  gap: clamp(20px, 4vw, 60px);
  font-family: var(--display);
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(1.6rem, 5vw, 4.2rem);
  letter-spacing: -0.01em;
  padding-right: clamp(20px, 4vw, 60px);
  white-space: nowrap;
}
.ml__sep {
  color: var(--accent);
  font-weight: 400;
}
</style>
