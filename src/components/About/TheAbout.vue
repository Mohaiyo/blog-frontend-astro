<template>
  <article class="about" :class="{ active: active }" data-page="about">
    <header>
      <h2 class="h2 article-title">About me</h2>
    </header>

    <section class="about-text">
      <p>
        I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I
        enjoy turning complex problems into simple, beautiful and intuitive designs.
      </p>

      <p>
        My job is to build your website so that it is functional and user-friendly but at the same time attractive.
        Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to
        bring across your message and identity in the most creative way. I created web design for many famous brand
        companies.
      </p>
    </section>

    <!--
  - service
-->

    <section class="service">
      <h3 class="h3 service-title">What i'm doing</h3>

      <ul class="service-list">
        <li class="service-item">
          <div class="service-icon-box">
            <img
              src="../../assets/icon-design.svg
        "
              alt="design icon"
              width="40"
            />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Web design</h4>

            <p class="service-item-text"> The most modern and high-quality design made at a professional level. </p>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="../../assets/icon-dev.svg" alt="Web development icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Web development</h4>

            <p class="service-item-text"> High-quality development of sites at the professional level. </p>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="../../assets/icon-app.svg" alt="mobile app icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Mobile apps</h4>

            <p class="service-item-text"> Professional development of applications for iOS and Android. </p>
          </div>
        </li>

        <li class="service-item">
          <div class="service-icon-box">
            <img src="../../assets/icon-photo.svg" alt="camera icon" width="40" />
          </div>

          <div class="service-content-box">
            <h4 class="h4 service-item-title">Photography</h4>

            <p class="service-item-text"> I make high-quality photos of any category at a professional level. </p>
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
    @apply hidden rounded-[20px] border bg-white p-4  shadow-md transition-all dark:border-neutral-600 dark:bg-[#1e1e1f] sm:w-[520px] sm:p-[30px] sm:mx-auto md:w-[700px] lg:w-[800px] xl:w-auto xl:min-h-full;
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
    @apply text-3xl;
  }
  .h3 {
    @apply text-2xl;
  }
  .h4 {
    @apply text-xl;
  }
  .article-title {
    @apply relative pb-2;
  }
  .about .article-title {
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:font-semibold sm:mb-5 sm:after:h-[6px] md:pb-5;
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
    @apply relative z-[1] rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 dark:from-stone-600 dark:via-stone-800 via-50% to-stone-100 p-5 shadow-xl before:absolute before:inset-[1px] before:-z-[1] before:rounded-2xl before:bg-gradient-to-br before:from-amber-50 before:to-white  before:content-[''] dark:before:from-stone-800 dark:before:to-stone-800;
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
