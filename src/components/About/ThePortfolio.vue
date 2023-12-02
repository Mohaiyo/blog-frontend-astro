<template>
  <article class="portfolio" :class="{ active }" data-page="portfolio">
    <header>
      <h2 class="h2 article-title">作品集</h2>
    </header>

    <section class="projects">
      <ul class="filter-list">
        <li
          v-for="selectItem of selectOptions"
          :key="selectItem.value"
          class="filter-item"
          @click="selectValue = selectItem.value"
        >
          <button
            :class="{
              active: selectItem.value === selectValue
            }"
            >{{ selectItem.label }}</button
          >
        </li>
      </ul>

      <div class="filter-select-box">
        <button
          class="filter-select"
          :class="{ active: showSelectList }"
          data-select
          @click="showSelectList = !showSelectList"
        >
          <div class="select-value">{{ selectValue === 'all' ? '选择分类' : selectFormatter(selectValue) }}</div>

          <div class="select-icon">
            <ion-icon name="chevron-down"></ion-icon>
          </div>
        </button>

        <ul class="select-list" @click.capture="showSelectList = false">
          <li
            v-for="selectItem of selectOptions"
            :key="selectItem.value"
            class="select-item"
            :class="{ active: selectValue === selectItem.value }"
            @click="selectValue = selectItem.value"
          >
            <button>{{ selectItem.label }}</button>
          </li>
        </ul>
      </div>

      <ul class="project-list">
        <li
          v-for="pItem of portfolioList"
          :key="pItem.title"
          class="project-item"
          :class="{
            active: selectValue !== 'all' ? pItem.cate === selectValue : true
          }"
        >
          <a :href="pItem.url" target="_blank">
            <figure class="project-img">
              <div class="project-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>

              <img :src="pItem.cover.src" :alt="pItem.title" loading="lazy" />
            </figure>

            <h3 class="project-title">{{ pItem.title }}</h3>

            <p class="project-category">{{ selectFormatter(pItem.cate) }}</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import pj1 from '@assets/project-1.png'
  // import pj2 from '@assets/project-2.png'
  // import pj3 from '@assets/project-3.jpg'
  // import pj4 from '@assets/project-4.png'
  // import pj5 from '@assets/project-5.png'
  // import pj6 from '@assets/project-6.png'
  // import pj7 from '@assets/project-7.png'
  // import pj8 from '@assets/project-8.jpg'
  // import pj9 from '@assets/project-9.png'

  type SelectLabelValue = 'all' | 'webDesigin' | 'applications' | 'webDevelopment'
  type SelectDataItem = {
    label: string
    value: SelectLabelValue
  }
  defineProps({
    active: {
      type: Boolean,
      default: true,
      required: true
    }
  })
  const selectOptions: SelectDataItem[] = [
    {
      label: '全部',
      value: 'all'
    },
    {
      label: 'Web前端开发',
      value: 'webDevelopment'
    },
    {
      label: 'Web设计',
      value: 'webDesigin'
    }
  ]
  const selectFormatter = (val: SelectLabelValue) => {
    const matchItem = selectOptions.find((item) => item.value === val)
    return matchItem?.label
  }
  const showSelectList = ref(false)
  const selectValue = ref<SelectLabelValue>('all')

  const portfolioList: {
    cover: ImageMetadata
    title: string
    cate: SelectLabelValue
    url: string
  }[] = [
    {
      cover: pj1,
      title: '个人博客',
      cate: 'webDevelopment',
      url: 'https://tech-connection.netlify.app/'
    }
    // {
    //   cover: pj2,
    //   title: 'Orizon',
    //   cate: 'webDevelopment'
    // },
    // {
    //   cover: pj3,
    //   title: 'Fundo',
    //   cate: 'webDesigin'
    // },
    // {
    //   cover: pj4,
    //   title: 'Brawlhalla',
    //   cate: 'applications'
    // },
    // {
    //   cover: pj5,
    //   title: 'DSM.',
    //   cate: 'webDesigin'
    // },
    // {
    //   cover: pj6,
    //   title: 'MetaSpark',
    //   cate: 'webDesigin'
    // },
    // {
    //   cover: pj7,
    //   title: 'Summary',
    //   cate: 'webDevelopment'
    // },
    // {
    //   cover: pj8,
    //   title: 'Task Manager',
    //   cate: 'applications'
    // },
    // {
    //   cover: pj9,
    //   title: 'Arrival',
    //   cate: 'webDevelopment'
    // }
  ]
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
    @apply invisible hidden md:visible md:mb-7 md:flex md:items-center md:justify-start md:gap-6 md:pl-1;
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

  .select-list .select-item.active button {
    @apply text-amber-300;
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
    @apply relative z-10 mb-4 h-[200px] w-full overflow-hidden rounded-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-transparent before:content-[''] md:h-auto md:rounded-2xl;
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
    @apply mb-1 capitalize leading-snug dark:text-sm dark:text-white;
  }
  .project-category {
    @apply text-xs text-stone-600 dark:text-gray-200;
  }
</style>
