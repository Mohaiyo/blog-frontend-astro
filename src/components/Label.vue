<template>
  <span class="inline-block text-xs font-medium uppercase tracking-wider" :class="[color[theme || 'pink']]">
    <slot />
  </span>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'
  import type { CategoryItem } from '@data/category'

  const props = defineProps({
    theme: String as import('vue').PropType<CategoryItem['color']>
  })

  const { theme } = toRefs(props)
  const color: Record<CategoryItem['color'], string> = {
    green: 'text-emerald-700',
    blue: 'text-blue-600',
    orange: 'text-orange-700',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
    teal: 'text-teal-600'
  }
</script>
