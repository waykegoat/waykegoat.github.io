<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const dot = ref<HTMLElement | null>(null)
let raf = 0
let x = 0
let y = 0
let cx = 0
let cy = 0

function onMove(e: MouseEvent): void {
  x = e.clientX
  y = e.clientY
  const target = e.target as HTMLElement | null
  const interactive = target?.closest('a, button, [data-cursor]')
  dot.value?.classList.toggle('cursor--hover', Boolean(interactive))
}

function loop(): void {
  cx += (x - cx) * 0.2
  cy += (y - cy) * 0.2
  if (dot.value) {
    dot.value.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove, { passive: true })
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div ref="dot" class="cursor" aria-hidden="true" />
</template>
