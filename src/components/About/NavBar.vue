<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li v-for="item of navBarList" :key="item.value" class="navbar-item">
        <button
          :class="{ 'navbar-link': true, active: currentActive === item.value }"
          data-nav-link
          @click="onNavBarClick(item.value)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'

  export type NavBarType = 'about' | 'resume' | 'portfolio'
  defineProps({
    currentActive: {
      type: String as PropType<NavBarType>,
      default: 'about',
      required: true
    }
  })

  const emit = defineEmits<{
    (e: 'update:nav', val: NavBarType): void
  }>()
  const navBarList: { value: NavBarType; label: string }[] = [
    {
      value: 'about',
      label: 'About'
    },
    {
      value: 'resume',
      label: 'Resume'
    },
    {
      value: 'portfolio',
      label: 'Portfolio'
    }
  ]

  function onNavBarClick(val: NavBarType) {
    emit('update:nav', val)
  }
</script>

<style scoped lang="scss">
  .navbar {
    @apply fixed bottom-0 left-0 z-10 w-full rounded-xl rounded-bl-none rounded-br-none border dark:border-[#383838] bg-amber-50 dark:bg-stone-800 shadow-xl shadow-stone-400 backdrop-blur sm:rounded-[20px] sm:rounded-br-none sm:rounded-tl-none lg:absolute lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:w-max lg:rounded-[20px] lg:rounded-br-none lg:rounded-tl-none lg:px-5 lg:shadow-none;
    .navbar-list {
      @apply flex flex-wrap items-center justify-center px-[10px] py-0 sm:gap-5 lg:gap-[30px] lg:px-5;
    }
    .navbar-link {
      @apply px-2 py-5 text-xs text-gray-400 transition-colors sm:text-[14px] md:text-[16px] lg:font-medium;
      &.active {
        @apply text-stone-700 dark:text-yellow-400;
      }
    }
  }
</style>
