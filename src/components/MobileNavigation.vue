<template>
  <div class="site-mobile-nav">
    <div class="site-mobile-nav__links">
      <a href="/">首页</a>
      <a href="/front-end-dev/">前端开发</a>
      <a href="/back-end-dev/">后端开发</a>
      <a href="/db-and-storage/">数据库与存储</a>
      <a href="/cloud-computing-and-deployment/">云计算与部署</a>
      <a href="/tech-tools-and-practices/">技术工具与实践</a>
      <a href="/posts/">读书笔记</a>
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

<script setup></script>

<style lang="scss" scoped>
  .header-nav .site-mobile-nav {
    width: 300px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2000;
    padding-top: 20px;
    background: #fff;
    height: calc(100vh);
    transform: translateX(110%);
    box-shadow: -10px 0 20px -10px rgba(0, 0, 0, 0.1);
    transition: 0.3s all ease-in-out;
    &__links {
      @apply flex w-full flex-col justify-center px-6 py-2;
      a {
        line-height: 32px;
        @apply px-4 py-1 underline underline-offset-1;
        color: #333;
      }
    }
    &__close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }

  .header-nav.expanded .site-mobile-nav {
    transform: translateX(0%);
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
