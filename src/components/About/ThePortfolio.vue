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
        <button class="filter-select" data-select>
          <div class="select-value" data-selecct-value>Select category</div>

          <div class="select-icon">
            <ion-icon name="chevron-down"></ion-icon>
          </div>
        </button>

        <ul class="select-list">
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
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:mb-5 md:mb-7 sm:font-semibold sm:after:h-[6px] md:pb-5;
  }
</style>
