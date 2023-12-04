<template>
  <div class="site-mobile-nav">
    <div class="site-mobile-nav__logo">
      <a class="site-mobile-nav__site-logo" href="/">TechConnect</a>
      <p class="site-mobile-nav__site-slogan">创造，连接，改变世界</p>
    </div>
    <div class="site-mobile-nav__links">
      <a v-for="item of categoriesWithHomePage" :key="item.slug" :href="`/${item.slug}`">{{ item.title }}</a>
    </div>
    <span class="site-mobile-nav__close-icon">
      <svg
        t="1699716407043"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="19549"
        width="32"
        height="32"
      >
        <path
          d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
          p-id="19550"
          fill="#bfbfbf"
        ></path>
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { categories, type CategoryItem } from '@data/category'
  const categoriesWithHomePage: (CategoryItem | { title: '首页'; slug: string; description?: string })[] = [
    { title: '首页', slug: '', description: 'Home page' },
    ...categories
  ]
</script>

<style lang="scss" scoped>
  .header-nav .site-mobile-nav {
    width: 300px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9999;
    padding-top: 20px;
    background: #fff;
    height: calc(100vh);
    transform: translateX(110%);
    box-shadow: -10px 0 20px -10px rgba(0, 0, 0, 0.1);
    transition: 0.3s all ease-in-out;
    &__logo {
      @apply px-6;
    }
    &__site-logo {
      @apply text-2xl;
    }
    &__site-slogan {
      @apply text-xs text-gray-500 dark:text-white;
    }
    &__links {
      @apply flex w-full flex-col justify-center px-6 py-2;
      a {
        line-height: 32px;
        @apply py-1 underline underline-offset-1;
        color: #333;
      }
    }
    &__close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      svg {
        transform: scale(0.5);
        transition: 0.3s 0.3s all cubic-bezier(0.18, 0.89, 0.32, 1.28);
      }
      
    }
  }

  .header-nav.expanded .site-mobile-nav {
    transform: translateX(0%);
  }
  .header-nav.expanded .site-mobile-nav__close-icon svg {
    transform: scale(1);
  }
</style>

<style lang="scss">
  .dark {
    .header-nav .site-mobile-nav {
      background-color: rgba(0, 11, 12, 1);
      &__links {
        a {
          color: #fff;
        }
      }
    }
  }
</style>
