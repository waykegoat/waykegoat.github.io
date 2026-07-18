<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta()
</script>

<template>
  <RouterView />
</template>
