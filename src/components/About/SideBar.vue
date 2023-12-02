<template>
  <aside
    :class="{
      sidebar: true,
      active: showInfoMore
    }"
    data-sidebar
  >
    <div class="sidebar__info">
      <figure class="avatar-box">
        <img :src="avatar.src" alt="Wayne Liang" width="80" />
      </figure>

      <div class="info-content">
        <h1 class="name" title="Wayne Liang">Wayne Liang</h1>

        <p class="title">高级前端开发工程师</p>
      </div>

      <button class="info_more-btn" data-sidebar-btn @click="onShowMoreHandle">
        <span>展示联系方式</span>
        <ion-icon class="chevron-down" icon="chevron-down" />
      </button>
    </div>

    <div class="sidebar__info_more">
      <div class="separator"></div>

      <ul class="contacts-list">
        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="mail-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">邮箱</p>

            <a href="mailto:mohaiyo@163.com" class="contact-link">mohaiyo@163.com</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="phone-portrait-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">手机号</p>

            <a href="tel:18578262007" class="contact-link">18578262007</a>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="calendar-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">生日</p>

            <time datetime="1982-06-23">1991-09-30</time>
          </div>
        </li>

        <li class="contact-item">
          <div class="icon-box">
            <ion-icon name="location-outline"></ion-icon>
          </div>

          <div class="contact-info">
            <p class="contact-title">现居</p>

            <address>深圳</address>
          </div>
        </li>
      </ul>

      <div class="separator"></div>

      <ul class="social-list">
        <li class="social-item">
          <a href="https://github.com/Mohaiyo" target="_blank" class="social-link">
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </li>

        <li class="social-item">
          <a href="https://twitter.com/weiye_liang" target="_blank" class="social-link">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
        </li>

        <li class="social-item">
          <a href="https://www.facebook.com/profile.php?id=100093067328762" target="_blank" class="social-link">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import avatar from '@assets/Monkey_D_Luffy.png'
  import { ref } from 'vue'

  const showInfoMore = ref(false)
  const onShowMoreHandle = () => {
    showInfoMore.value = !showInfoMore.value
  }
</script>

<style lang="scss" scoped>
  .sidebar {
    @apply mb-4 max-h-28 overflow-hidden rounded-[18px] border bg-white p-4 shadow-md  transition-all dark:border-neutral-600 dark:bg-[#1e1e1f] sm:mx-auto sm:mb-[30px] sm:max-h-[180px] sm:p-[30px] md:w-[700px] lg:mx-auto lg:w-[800px] lg:shadow-xl xl:sticky xl:top-14 xl:z-[1] xl:mb-0 xl:h-full xl:max-h-[max-content] xl:pt-14;
    &.active {
      @apply max-h-[405px] sm:max-h-[584px];
    }
    &__info {
      @apply relative flex items-center justify-start gap-4 sm:gap-6 sm:rounded-4xl xl:flex-col;
    }
    .avatar-box {
      @apply relative h-20 w-20 rounded-xl bg-amber-50 bg-gradient-to-br dark:bg-stone-800 sm:h-[120px] sm:w-[120px] xl:h-[150px] xl:w-[150px];
      img {
        @apply absolute left-1/2 top-1/2 max-w-[50px] -translate-x-1/2 -translate-y-1/2 rounded-lg sm:max-w-[90px] xl:max-w-[120px];
      }
    }
    .info-content {
      .name {
        @apply mb-2 text-lg font-semibold sm:mb-4 xl:whitespace-nowrap xl:text-center;
      }
      .title {
        @apply rounded-md bg-amber-50 px-3 py-1 text-xs font-normal dark:bg-stone-700 sm:px-4 sm:py-1 xl:m-auto;
      }
    }
    .info_more-btn {
      @apply absolute -right-4 -top-4 z-[1] rounded-2xl rounded-br-none rounded-tl-none bg-gradient-to-br via-transparent via-50% p-2 text-sm leading-none text-stone-500 shadow shadow-stone-100 transition-all dark:from-stone-700 dark:text-yellow-500 dark:shadow-stone-700 sm:-right-[30px] sm:-top-[30px] sm:px-4 sm:py-[10px] xl:hidden;
      span {
        @apply hidden sm:block sm:text-xs;
      }
      .chevron-down {
        @apply sm:hidden;
      }
    }
    .info_more-btn:hover,
    .info_more-btn:focus {
      @apply bg-gradient-to-br from-stone-500 to-transparent dark:from-yellow-300;
    }
    .info_more-btn:hover::before,
    .info_more-btn:focus::before {
      background: linear-gradient(135deg, hsl(45deg 100% 70.98% / 25.1%) 0%, hsla(35, 100%, 68%, 0) 59.86%),
        hsl(240, 2%, 13%);
      @apply bg-gradient-to-br from-amber-300 via-amber-200 via-60% to-white  dark:from-neutral-600 dark:via-stone-800 dark:to-stone-900;
    }
    .info_more-btn::before {
      @apply absolute -z-[1] bg-gradient-to-br from-amber-300  to-white dark:from-stone-800 dark:to-stone-900;
      content: '';
      inset: 1px;
      border-radius: inherit;
    }
    &.active .chevron-down {
      @apply rotate-180 transition-transform;
    }
    &__info_more {
      @apply invisible opacity-0 transition-opacity xl:visible xl:opacity-100;
    }
    &.active &__info_more {
      @apply visible opacity-100;
    }
    .separator {
      @apply my-4 h-[1px] w-full bg-amber-200 dark:bg-stone-700 sm:my-8 xl:last-of-type:my-4 xl:last-of-type:opacity-0;
    }

    .contacts-list {
      @apply grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-x-4 md:gap-y-8 xl:grid-cols-1;
    }
    .contact-item {
      @apply flex min-w-full items-center gap-4;
    }
    .icon-box {
      @apply relative z-[1] flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-transparent via-50% to-transparent text-[16px] text-yellow-500 before:absolute before:inset-[1px] before:z-[-1] before:rounded-lg before:bg-white before:content-[''] dark:from-stone-600 dark:via-transparent dark:to-transparent dark:before:bg-[#202022] sm:h-12 sm:w-12 sm:rounded-xl sm:text-lg sm:before:rounded-xl;
      box-shadow: -4px 8px 24px hsla(0, 0%, 0%, 0.25);
      ion-icon {
        @apply sm:text-2xl;
      }
    }
    .contact-info {
      width: calc(100% - 46px);
      max-width: calc(100% - 46px);
    }

    .contact-title {
      @apply mb-[2px] text-xs uppercase text-gray-400;
    }
    .contact-info :is(.contact-link, time, address) {
      @apply not-italic text-gray-900 dark:text-white xl:font-normal;
    }
    .contact-info :is(.contact-link) {
      @apply xl:overflow-hidden xl:text-ellipsis xl:whitespace-nowrap;
    }
    .social-list {
      @apply flex items-center justify-start gap-4 pb-1 pl-2 xl:justify-center;
    }
    .social-item {
      @apply h-[18px] leading-none sm:h-[22px] md:h-[26px];
    }
    .social-item .social-link {
      @apply inline-block h-[18px] text-lg leading-none text-gray-400 sm:h-[22px] sm:text-xl md:h-[26px] md:text-2xl;
    }
  }
</style>
