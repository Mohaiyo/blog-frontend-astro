<template>
  <article class="about" :class="{ active: active }" data-page="about">
    <header>
      <h2 class="h2 article-title">关于我</h2>
    </header>

    <section class="about-text">
      <p> 孩子的父亲 | 还算合格的丈夫 | 中年 | 慢热但有耐心 | 非典型程序员 </p>
      <p>
        正在努力挣钱养娃，努力成为一个的好老公，合格的父亲和儿子。
      </p>
      <p> 24年以后希望能拥抱开源，有更多的精力探索自己喜欢的事情，想要做出一点一点不一样的改变。 </p>
      <p> 会点啥：Vue.js、React、JavaScript、TypeScript、HTML、CSS、Tailwind、MySql、Nodejs</p>
    </section>

    <!--service star-->

    <section class="service">
      <h3 class="h3 service-title">在做什么</h3>

      <ul class="service-list">
        <li class="service-item">
          <div class="service-icon-box">
            <img :src="devIcon.src" alt="Web development icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Frontend Developer</h4>

            <p class="service-item-text"> 具备扎实的前端开发能力。 </p>
          </div>
        </li>
      </ul>
    </section>

    <!--service end-->
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

<style scoped>
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
