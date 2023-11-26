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

        <p class="title">前端开发工程师</p>
      </div>

      <button class="info_more-btn" data-sidebar-btn @click="onShowMoreHandle">
        <span>展示联系方式</span>

        <ion-icon class="chevron-down" icon="chevron-down" />
        <!-- <ion-icon v-else="showInfoMore" icon="chevron-up" /> -->
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
    @apply mb-4 max-h-28 overflow-hidden rounded-[18px] border bg-white p-4 shadow-md  transition-all dark:border-neutral-600 dark:bg-[#1e1e1f] sm:max-h-[180px] sm:mb-[30px] sm:p-[30px] sm:mx-auto md:w-[700px] lg:w-[800px] lg:mx-auto lg:shadow-xl xl:sticky xl:top-14 xl:max-h-[max-content] xl:h-full xl:mb-0 xl:pt-14 xl:z-[1];
    &.active {
      @apply max-h-[405px] sm:max-h-[584px];
    }
    &__info {
      @apply relative flex items-center justify-start gap-4 sm:gap-6 xl:flex-col sm:rounded-4xl;
    }
    .avatar-box {
      @apply relative h-20 w-20 rounded-xl bg-amber-50 bg-gradient-to-br dark:bg-stone-800 sm:w-[120px] sm:h-[120px] xl:w-[150px] xl:h-[150px];
      img {
        @apply absolute left-1/2 top-1/2 max-w-[50px] sm:max-w-[90px] xl:max-w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-lg;
      }
    }
    .info-content {
      .name {
        @apply mb-2 text-lg font-semibold sm:mb-4 xl:whitespace-nowrap xl:text-center;
      }
      .title {
        @apply rounded-md bg-amber-50 px-3 py-1 text-xs font-normal dark:bg-stone-700 sm:py-1 sm:px-4 xl:m-auto;
      }
    }
    .info_more-btn {
      @apply absolute -right-4 -top-4 rounded-2xl rounded-br-none rounded-tl-none bg-gradient-to-br via-50% p-2 text-sm leading-none text-stone-500 dark:text-yellow-500 shadow shadow-stone-100 dark:shadow-stone-700 transition-all dark:from-stone-700 via-transparent z-[1] sm:-top-[30px] sm:-right-[30px] sm:py-[10px] sm:px-4 xl:hidden;
      span {
        @apply hidden sm:block sm:text-xs;
      }
      .chevron-down {
        @apply sm:hidden;
      }
    }
    .info_more-btn:hover,
    .info_more-btn:focus {
      @apply bg-gradient-to-br from-stone-500 dark:from-yellow-300 to-transparent;
    }
    .info_more-btn:hover::before,
    .info_more-btn:focus::before {
      background: linear-gradient(135deg, hsl(45deg 100% 70.98% / 25.1%) 0%, hsla(35, 100%, 68%, 0) 59.86%),
        hsl(240, 2%, 13%);
      @apply bg-gradient-to-br from-amber-300 via-amber-200 via-60% to-white  dark:from-neutral-600 dark:via-stone-800 dark:to-stone-900 ;
    }
    .info_more-btn::before {
      @apply absolute bg-gradient-to-br from-amber-300 to-white  dark:from-stone-800 dark:to-stone-900 -z-[1];
      content: '';
      inset: 1px;
      border-radius: inherit;
    }
    &.active .chevron-down{
      @apply rotate-180 transition-transform;
    }
    &__info_more {
      @apply opacity-0 invisible transition-opacity xl:opacity-100 xl:visible;
    }
    &.active &__info_more {
      @apply opacity-100 visible;
    }
    .separator {
      @apply h-[1px] w-full bg-amber-200 dark:bg-stone-700 my-4 sm:my-8 xl:last-of-type:my-4 xl:last-of-type:opacity-0;
    }
    
    .contacts-list {
      @apply grid grid-cols-1 gap-4 sm:gap-5 md:gap-x-4 md:gap-y-8 md:grid-cols-2 xl:grid-cols-1;
    }
    .contact-item {
      @apply min-w-full flex items-center gap-4;
    }
    .icon-box {
      @apply relative bg-gradient-to-br from-amber-300 via-transparent to-transparent dark:from-stone-600 via-50% dark:via-transparent dark:to-transparent w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[16px] text-yellow-500 z-[1] before:content-[''] before:z-[-1] before:absolute before:inset-[1px] before:bg-white dark:before:bg-[#202022] before:rounded-lg sm:w-12 sm:h-12 sm:rounded-xl sm:text-lg sm:before:rounded-xl;
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
      @apply text-gray-400 text-xs uppercase mb-[2px];
    }
    .contact-info :is(.contact-link, time, address){
      @apply text-gray-900 dark:text-white not-italic xl:font-light;
    }
    .contact-info :is(.contact-link){
      @apply xl:whitespace-nowrap xl:overflow-hidden xl:text-ellipsis;
    }
    .social-list {
      @apply flex justify-start items-center gap-4 pb-1 pl-2 xl:justify-center;
    }
    .social-item {
      @apply leading-none h-[18px] sm:h-[22px] md:h-[26px];
    }
    .social-item .social-link {
      @apply text-gray-400 text-lg leading-none inline-block h-[18px] sm:text-xl md:text-2xl sm:h-[22px] md:h-[26px];
    }
  }
</style>
