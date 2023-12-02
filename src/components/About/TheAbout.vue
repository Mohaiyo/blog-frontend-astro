<template>
  <article class="about" :class="{ active: active }" data-page="about">
    <header>
      <h2 class="h2 article-title">关于我</h2>
    </header>

    <section class="about-text">
      <p>
        专注于构建现代化、高性能的Web应用程序。我的技能涵盖了Vue.js、React、JavaScript、TypeScript、HTML、CSS、Tailwind
        CSS以及Vite等前端技术。
      </p>

      <p>
        职业生涯中，我成功地参与并领导了多个复杂的前端项目，为客户提供了高质量、用户友好的解决方案。我熟练运用Vue.js框架，能够构建可维护、可扩展的单页面应用程序（SPA）。我的JavaScript和TypeScript编码能力使我能够处理各种前端任务，并确保代码的可读性和可维护性。
      </p>

      <p>
        项目上，我善于与设计团队合作，将设计概念转化为现实，并通过优化性能和用户体验来不断改进应用。我的工作经验中涵盖了响应式设计、跨浏览器兼容性、以及利用现代化工具和框架提高开发效率的方面。
      </p>
      <p>
        熟悉HTML和CSS，善于使用Tailwind
        CSS进行快速样式开发，提高了开发速度同时保持代码的整洁性。我还熟悉Vite等工具，能够借助它们的强大功能进行项目的快速开发和部署。
      </p>

      <p>总的来说，我对前端技术有着深厚的热情，持续关注行业的发展动向，并不断扩充自己的技能栈。</p>
    </section>

    <!--
  - service
-->

    <section class="service">
      <h3 class="h3 service-title">我在做什么</h3>

      <ul class="service-list">
        <li class="service-item">
          <div class="service-icon-box">
            <img :src="devIcon.src" alt="Web development icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Web前端开发工程师</h4>

            <p class="service-item-text"> 专业级的网站Web前端开发能力。 </p>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img :src="designIcon.src" alt="design icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Web设计</h4>

            <p class="service-item-text"> 最前沿的高质量的专业级的设计能力。 </p>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
  defineProps({
    active: {
      type: Boolean,
      default: true,
      required: true
    }
  })

  import designIcon from '@assets/icon-design.svg'
  import devIcon from '@assets/icon-dev.svg'
</script>

<style scoped lang="scss">
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  article {
    @apply hidden rounded-[20px] border bg-white p-4  shadow-md transition-all dark:border-neutral-600 dark:bg-[#1e1e1f] sm:mx-auto sm:w-[520px] sm:p-[30px] md:w-[700px] lg:w-[800px] xl:min-h-full xl:w-auto;
  }
  article.active {
    @apply block;
    animation: fade 0.5 ease delay backwards;
  }
  .h2,
  .h3,
  .h4,
  .h5 {
    @apply capitalize dark:text-white;
  }
  .h2 {
    @apply text-2xl xl:text-3xl;
  }
  .h3 {
    @apply text-xl xl:text-2xl;
  }
  .h4 {
    @apply text-lg xl:text-xl;
  }
  .article-title {
    @apply relative pb-2;
  }
  .about .article-title {
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:mb-5 sm:font-semibold sm:after:h-[6px] md:pb-5;
  }
  .about-text {
    @apply font-normal text-stone-800 dark:text-gray-200 sm:mb-10;
    p {
      @apply mb-4;
    }
  }
  .service {
    @apply mb-8;
  }
  .service-title {
    @apply mb-5;
  }
  .service-list {
    @apply grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5;
  }
  .service-item {
    @apply relative z-[1] rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 via-50% to-stone-100 p-5 shadow-xl before:absolute before:inset-[1px] before:-z-[1] before:rounded-2xl before:bg-gradient-to-br before:from-amber-50 before:to-white before:content-[''] dark:from-stone-600  dark:via-stone-800 dark:before:from-stone-800 dark:before:to-stone-800;
    .service-icon-box {
      @apply mb-[10px] flex justify-center;
    }
    .service-content-box {
      @apply text-center;
    }
    .service-item-title {
      @apply mb-2;
    }
    .service-item-text {
      @apply font-normal text-stone-800 dark:text-gray-200;
      p {
        @apply mb-4;
      }
    }
  }
</style>
