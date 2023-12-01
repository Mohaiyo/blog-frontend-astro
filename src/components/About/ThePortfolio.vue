<template>
  <article class="portfolio" :class="{ active }" data-page="portfolio">
    <header>
      <h2 class="h2 article-title">作品集</h2>
    </header>

    <section class="projects">
      <ul class="filter-list">
        <li class="filter-item">
          <button class="active" data-filter-btn>All</button>
        </li>

        <li class="filter-item">
          <button data-filter-btn>Web design</button>
        </li>

        <li class="filter-item">
          <button data-filter-btn>Applications</button>
        </li>

        <li class="filter-item">
          <button data-filter-btn>Web development</button>
        </li>
      </ul>

      <div class="filter-select-box">
        <button
          class="filter-select"
          :class="{ active: showSelectList }"
          data-select
          @click="showSelectList = !showSelectList"
        >
          <div class="select-value" data-selecct-value>Select category</div>

          <div class="select-icon">
            <ion-icon name="chevron-down"></ion-icon>
          </div>
        </button>

        <ul class="select-list" @click.capture="showSelectList = false">
          <li class="select-item">
            <button data-select-item>All</button>
          </li>

          <li class="select-item">
            <button data-select-item>Web design</button>
          </li>

          <li class="select-item">
            <button data-select-item>Applications</button>
          </li>

          <li class="select-item">
            <button data-select-item>Web development</button>
          </li>
        </ul>
      </div>

      <ul class="project-list">
        <li class="project-item active" data-filter-item data-category="web development">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-1.jpg" alt="finance" loading="lazy" />
            </figure>

            <h3 class="project-title">Finance</h3>

            <p class="project-category">Web development</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web development">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-2.png" alt="orizon" loading="lazy" />
            </figure>

            <h3 class="project-title">Orizon</h3>

            <p class="project-category">Web development</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web design">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-3.jpg" alt="fundo" loading="lazy" />
            </figure>

            <h3 class="project-title">Fundo</h3>

            <p class="project-category">Web design</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="applications">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-4.png" alt="brawlhalla" loading="lazy" />
            </figure>

            <h3 class="project-title">Brawlhalla</h3>

            <p class="project-category">Applications</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web design">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-5.png" alt="dsm." loading="lazy" />
            </figure>

            <h3 class="project-title">DSM.</h3>

            <p class="project-category">Web design</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web design">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-6.png" alt="metaspark" loading="lazy" />
            </figure>

            <h3 class="project-title">MetaSpark</h3>

            <p class="project-category">Web design</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web development">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-7.png" alt="summary" loading="lazy" />
            </figure>

            <h3 class="project-title">Summary</h3>

            <p class="project-category">Web development</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="applications">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-8.jpg" alt="task manager" loading="lazy" />
            </figure>

            <h3 class="project-title">Task Manager</h3>

            <p class="project-category">Applications</p>
          </a>
        </li>

        <li class="project-item active" data-filter-item data-category="web development">
          <a href="#">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img src="../../assets/project-9.png" alt="arrival" loading="lazy" />
            </figure>

            <h3 class="project-title">Arrival</h3>

            <p class="project-category">Web development</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  defineProps({
    active: {
      type: Boolean,
      default: true,
      required: true
    }
  })

  const showSelectList = ref(false)
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
  @keyframes scaleUp {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
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
  .h5 {
    @apply text-[14px] xl:text-[16px];
  }

  .article-title {
    @apply relative pb-2 sm:pb-4 sm:font-bold md:pb-5;
  }
  .portfolio .article-title {
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:mb-5 sm:font-semibold sm:after:h-[6px] md:mb-7 md:pb-5;
  }

  .filter-list {
    @apply invisible hidden md:flex md:justify-start md:items-center md:gap-6 md:pl-1 md:mb-7 md:visible;
  }

  .filter-item button.active {
    @apply text-amber-300;
  }
  .filter-select-box {
    @apply relative mb-6 md:hidden;
  }

  .filter-select {
    @apply flex  w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-normal dark:border-stone-600 dark:bg-[#1e1e1e] dark:text-gray-300;
  }
  .select-icon {
    @apply max-h-[14px] leading-none;
  }

  .select-list {
    @apply pointer-events-none invisible absolute top-[53px] z-10 w-full rounded-xl border bg-amber-50 p-[6px] opacity-0 transition-all dark:border-stone-600 dark:bg-[#1e1e1e];
  }
  .filter-select.active + .select-list {
    @apply pointer-events-auto visible opacity-100;
  }

  .select-item button {
    @apply w-full rounded-lg bg-amber-50 px-[10px] py-2 text-left text-sm font-normal capitalize text-pink-700 dark:bg-[#1e1e1e] dark:text-gray-300;
  }
  .project-list {
    @apply mb-3 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-2;
  }
  .project-item {
    @apply hidden;
  }
  .project-item.active {
    @apply block;
    animation: scaleUp 0.3s ease forwards;
  }
  .project-item > a {
    @apply w-full;
  }
  .project-img {
    @apply relative z-10 mb-4 h-[200px] w-full overflow-hidden rounded-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-transparent before:content-[''] md:rounded-2xl md:h-auto;
  }
  .project-item-icon-box {
    @apply absolute left-1/2 top-1/2 z-10 max-h-[60px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-xl bg-[#383838] p-5 text-xl leading-none text-amber-300 opacity-0 transition-all;
  }
  .project-item > a:hover .project-item-icon-box {
    @apply scale-100 opacity-100;
  }
  .project-item-icon-box ion-icon {
    --ionicon-stroke-width: 50px;
  }

  .project-item > a:hover img {
    @apply scale-110;
  }
  .project-img img {
    @apply h-full w-full object-cover transition-transform;
  }
  .project-title {
    @apply dark:text-sm capitalize leading-snug dark:text-white;
  }
  .project-category {
    @apply dark:text-gray-200 text-stone-600 text-xs;
  }
</style>
