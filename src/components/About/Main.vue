<template>
  <div class="about-container xl:flex xl:max-w-7xl xl:items-stretch xl:justify-center xl:gap-6">
    <SideBar />
    <div class="main-content">
      <!-- nav bar start -->
      <NavBar :current-active="currentActive" @update:nav="updateNavHandle" />
      <!-- nav bar end -->
      <!-- the about component start -->
      <TheAbout :active="currentActive === 'about'" />
      <!-- the about component end -->
      <!-- the resume component start -->
      <TheResume :active="currentActive === 'resume'" />
      <!-- the resume component end -->
      <!-- the portfolio component start -->
      <ThePortfolio :active="currentActive === 'portfolio'" />
      <!-- the portfolio component end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SideBar from '@components/About/SideBar.vue'
  import NavBar, { type NavBarType } from '@components/About/NavBar.vue'
  import TheAbout from '@components/About/TheAbout.vue'
  import TheResume from '@components/About/TheResume.vue'
  import ThePortfolio from '@components/About/ThePortfolio.vue'
  const currentActive = ref<NavBarType>('about')

  function updateNavHandle(val: NavBarType) {
    currentActive.value = val
  }
</script>

<style scoped lang="scss">
  .main-content {
    @apply m-auto lg:relative lg:w-max xl:m-0 xl:w-[70%] xl:min-w-[70%];
  }
</style>
