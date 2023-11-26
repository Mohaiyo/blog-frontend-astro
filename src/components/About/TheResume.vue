<template>
  <article class="resume" :class="{ active }" data-page="resume">
    <header>
      <h2 class="h2 article-title">简历</h2>
    </header>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline"></ion-icon>
        </div>

        <h3 class="h3">教育经历</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">北京科技大学(211)</h4>

          <span>2010 — 2014</span>

          <p class="timeline-text">
            就读于北京科技大学机械工程学院，主修机械工程以及自动化.
          </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">华南理工大学(交换生)</h4>

          <span>2012 — 2012</span>

          <p class="timeline-text">
            交换生到华工就读一个学期。
          </p>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">广西壮族自治区-北流市高级中学</h4>

          <span>2007 — 2010</span>

          <p class="timeline-text">
            市重点高级中学。
          </p>
        </li>
      </ol>
    </section>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline"></ion-icon>
        </div>

        <h3 class="h3">项目经验</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Originlinks广告自动化系统</h4>

          <span>2018 — 现在</span>

          <p class="timeline-text">
            Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et qvuas
            molestias exceptur.
          </p>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Art director</h4>

          <span>2013 — 2015</span>

          <p class="timeline-text">
            Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas
            molestias exceptur.
          </p>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Web designer</h4>

          <span>2010 — 2013</span>

          <p class="timeline-text">
            Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas
            molestias exceptur.
          </p>
        </li>
      </ol>
    </section>

    <section class="skill">
      <h3 class="h3 skills-title">技能</h3>

      <ul class="skills-list content-card">
        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">前端开发</h5>
            <data value="80">80%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 80%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">数据库</h5>
            <data value="70">70%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 70%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">HTML</h5>
            <data value="90">90%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 90%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">Nodejs</h5>
            <data value="50">50%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 50%"></div>
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
  .timeline {
    @apply mb-[30px];
    .title-wrapper {
      @apply mb-6 flex items-center gap-4;
    }
  }
  .icon-box {
    @apply relative z-[1] flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-transparent via-50% to-transparent text-[16px] text-yellow-500 before:absolute before:inset-[1px] before:z-[-1] before:rounded-lg before:bg-white before:content-[''] dark:from-stone-600 dark:via-transparent dark:to-transparent dark:before:bg-[#202022] sm:h-12 sm:w-12 sm:rounded-xl sm:text-lg sm:before:rounded-xl;
    box-shadow: -4px 8px 24px hsla(0, 0%, 0%, 0.25);
    ion-icon {
      @apply sm:text-2xl;
    }
  }
  .timeline-list {
    @apply ml-11 text-[14px] sm:text-[16px] sm:ml-16;
    .timeline-item {
      @apply relative mb-5 before:absolute before:-left-[30px] before:-top-6 before:w-[1px] before:bg-amber-300 before:content-[''] last:mb-0 last:before:invisible last:before:h-0 last:before:w-0 dark:before:bg-[#383838] sm:before:-left-10;
      &::before {
        height: calc(100% + 50px);
      }
      &-title {
        @apply mb-2 text-[14px] leading-tight lg:text-[16px] xl:text-lg;
      }
      &::after {
        @apply absolute -left-[33px] sm:-left-[43px] top-[5px] h-[6px] w-[6px] sm:h-2 sm:w-2 rounded-full bg-gradient-to-t from-yellow-400 from-[72%] to-yellow-500 to-[68%] content-[''];
        box-shadow: 0 0 0 4px #383838;
      }
    }
    span {
      @apply font-bold leading-relaxed text-yellow-500;
    }
    .timeline-text {
      @apply font-normal leading-relaxed text-gray-400 xl:max-w-[700px];
    }
  }
  .article-title {
    @apply relative pb-2 sm:pb-4 sm:font-bold md:pb-5;
  }
  .resume .article-title {
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:mb-5 md:mb-7 sm:font-semibold sm:after:h-[6px] md:pb-5;
  }

  .skills-title {
    @apply mb-5;
  }
  .skills-list {
    @apply p-5;
  }
  .content-card {
    @apply relative z-[1] rounded-2xl bg-gradient-to-br from-amber-500 via-amber-400 via-50% to-stone-100 p-5 shadow-xl before:absolute before:inset-[1px] before:-z-[1] before:rounded-2xl before:bg-gradient-to-br before:from-amber-50 before:to-white before:content-[''] dark:from-stone-600  dark:via-stone-800 dark:before:from-stone-800 dark:before:to-stone-800 sm:p-[30px] sm:pt-[25px];
  }

  .skills-item {
    @apply mb-4 sm:mb-6 last:mb-0;
  }
  .title-wrapper {
    @apply flex items-center gap-2 mb-2;
    data {
      @apply text-gray-400 text-[14px] font-normal;
    }
  }

  .skill-progress-bg{
    @apply bg-stone-200 dark:bg-[#383838] w-full h-2 rounded-[4px];
  }

  .skill-progress-fill {
    @apply bg-amber-200 h-full rounded-[4px] bg-gradient-to-r from-yellow-400  to-yellow-600;
  }


  html:not(.dark) .timeline-list .timeline-item::after {
    box-shadow: 0 0 0 4px #f8e9bb;
  }
</style>
