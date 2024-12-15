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

          <span>2010.09 — 2014.06</span>

          <p class="timeline-text"> 就读于北京科技大学机械工程学院，主修机械工程以及自动化。 </p>
        </li>
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">广西北流市高级中学</h4>

          <span>2007.09 — 2010.06</span>

          <p class="timeline-text"> 理科生。 </p>
        </li>
      </ol>
    </section>

    <section class="timeline">
      <div class="title-wrapper">
        <div class="icon-box">
          <ion-icon name="book-outline"></ion-icon>
        </div>

        <h3 class="h3">工作经历</h3>
      </div>

      <ol class="timeline-list">
        <li class="timeline-item">
          <div class="flex justify-between">
            <h4 class="h4 timeline-item-title">深圳盈飞智信科技有限公司</h4>
            <div class="title text-sm">高级前端开发</div>
          </div>

          <span>2018.04 — 现在</span>
          <div class="relative">
            <div class="work-title">岗位职责</div>
          </div>
          <p class="timeline-text">
            负责前端项目开发、需求评审、技术选型、项目开发、部署与运维。维护技术基础设施。负责交付满足业务需求的性能驱动和用户为中心的网站。与业务以及广告分析师沟通以及提供技术支持，优化独立站页面以提高转化率。
          </p>
          <div class="relative">
            <div class="work-title">工作成果</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1">
                开发和维护公司数据系统前端功能，为亚马逊与独立站运营提供销售额、广告、库存、订单等数据，并为管理层提供即时报表，帮助优化决策。
              </li>
              <li class="mb-1">
                搭建公司广告自动化系统平台前端项目，支持广告组进行亚马逊广告自动化业务，提供即时的广告数据，并通过自动化模型提升广告投放效率和ROI，丰富广告打法，提高广告追踪分析的效能。
              </li>
              <li class="mb-1"> 负责ERP系统前端权限校验、物流报关等模块的重构。 </li>
              <li>开发独立站新品发布、红人系统、退换货、评论插件等业务功能统一管理平台，为独立站运营提供技术支持。</li>
              <li class="mb-1">引入eslint代码规范和commitlint代码提交规范，确保前端组代码质量。</li>
              <li class="mb-1">
                搭建gitee webhook和Jenkins持续交付平台，优化前端打包、发布上线等步骤，提供项目持续构建部署的能力。
              </li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <div class="flex justify-between">
            <h4 class="h4 timeline-item-title">深圳文思海辉系统有限公司</h4>
            <div class="title text-sm">初级前端开发工程师</div>
          </div>

          <span>2017.04-2018.04</span>

          <div class="relative">
            <div class="work-title">岗位职责</div>
          </div>
          <p class="timeline-text">
            前端负责的业务功能代码开发、前后端联调、浏览器兼容性处理、确保交付满足业务需求的功能。
          </p>
          <div class="relative">
            <div class="work-title">工作成果</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 按时完成负责模块的开发以及系统迁移问题处理。 </li>
            </ol>
          </div>
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
          <h4 class="h4 timeline-item-title">Shopify店铺主题维护 + 插件开发</h4>

          <span>2020.12 — 至今</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Egg + Seuqlize + Mysql + React + Ant Design + AWS(SQS + S3 + cloundFront等) </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 使用theme kit实现一套主题维护多个站点，主题的同步、站点的埋点接入功能。 </li>
              <li class="mb-1">
                使用lambda@edge+cloudFront+nodejs等AWS套件实现S3图床管理，进行图片的webp格式，图片大小、图片质量的优化工作。
              </li>
              <li class="mb-1">
                红人分销平台插件的开发，实现红人注册登录、导流的用户的访问记录追踪、订单追踪、分析看板、系统设置、店铺管理功能。
              </li>
              <li>评论插件的开发，实现产品列表的同步更新、评论上传展示、评论图片的优化、插件集成到主题等功能。</li>
              <li class="mb-1">活动页面的开发，如测评、问卷、新品发布等功能的前后端开发工作。</li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">Originlinks数据系统</h4>

          <span>2019.06 — 至今</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Vue + Pina + Vue-Router + Axios + Ant Design Vue + Vite + Tailwindcss等 </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 负责现有业务代码以及需求升级的维护。 </li>
              <li class="mb-1"> 负责新需求的评审、排期以及开发。 </li>
              <li class="mb-1"> 负责跟后端制定接口设计与标准。</li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">广告自动化运营管理系统</h4>

          <span>2020.06 — 至今</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Vue + Vuex + Vue-Router + Axios + Element-UI + PWA + Webpack等 </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 负责新需求的评审、排期以及开发。 </li>
              <li class="mb-1"> 负责跟后端制定接口设计与标准。 </li>
              <li class="mb-1"> 负责网站需求的页面布局、交互设计、数据可视化功能的设计以及开发。</li>
              <li class="mb-1"> 利用PWA以及Webpack Externals功能减少代码体积，提升网站的加载性能。</li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">ERP重构</h4>

          <span>2019.03 - 2020.05</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Vue + Vuex + Vue-Router + Axios + Element-UI + PWA + Webpack等 </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 对项目重复代码如element-ui上传组件、分页组件等进行二次封装，减少代码量。 </li>
              <li class="mb-1">
                利用html2canvas + jspdf的能力开发报关单生成pdf的功能，大幅提升原来物流员工手工Excel做单的效率。
              </li>
              <li class="mb-1">
                利用PWA的sw功能，将静态的资源缓存浏览器，利用sw后台线程的优势加速程序的执行和资源的加载，提升网站的性能。</li
              >
              <li class="mb-1"> 项目运维和部署，开启Gzip等功能，对静态资源文件进行压缩，提升文件的传输速度。</li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">FeedForFun资讯流平台</h4>

          <span>2019.03 - 2020.05</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Vue + Nuxt.js + Axios + Vuetify + PWA + Webpack等 </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 对项目重复代码进行封装成组件或者utils，减少代码量，提升项目开发效率。 </li>
              <li class="mb-1"> 结合vuetify的响应式组件，构建移动、PC端兼容的响应式网站。 </li>
              <li class="mb-1">
                利用PWA的sw功能，将静态的资源缓存浏览器，利用sw后台线程的优势加速程序的执行和资源的加载，提升网站的性能。</li
              >
              <li class="mb-1"> 利用HTML5语义化标签对页面进行合理布局，构建易于SEO引擎搜索的页面。</li>
            </ol>
          </div>
        </li>

        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">多品种投融资交易平台</h4>

          <span>2017.04 - 2018.04</span>

          <div class="relative">
            <div class="work-title">技术架构</div>
          </div>
          <p class="timeline-text"> Vue + Vue-Resource + Vue-Router + Element-UI + ECharts + Webpack等 </p>

          <div class="relative">
            <div class="work-title">主要工作</div>
          </div>
          <div class="timeline-text ml-3">
            <ol class="list-decimal">
              <li class="mb-1"> 按开发进度完成负责模块页面的代码编写 + 前后端接口联调 </li>
              <li class="mb-1"> 引用ECharts实现图形数据的展示，兼容IE9以上及其他主流浏览器 </li>
            </ol>
          </div>
        </li>
      </ol>
    </section>

    <section class="skill">
      <h3 class="h3 skills-title">技能</h3>

      <ul class="skills-list content-card">
        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">Web前端开发</h5>
            <data value="90">90%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 90%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">Nodejs</h5>
            <data value="70">70%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 70%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">MySql</h5>
            <data value="60">60%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 60%"></div>
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">Chrome Extention开发</h5>
            <data value="60">60%</data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 60%"></div>
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
  .h5 {
    @apply text-sm xl:text-base;
  }
  .timeline {
    @apply mb-[30px];
    .title-wrapper {
      @apply mb-6 flex items-center gap-4;
    }
  }
  .icon-box {
    @apply relative z-[1] flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-gradient-to-br from-amber-300 via-transparent via-50% to-transparent text-base text-yellow-500 before:absolute before:inset-[1px] before:z-[-1] before:rounded-lg before:bg-white before:content-[''] dark:from-stone-600 dark:via-transparent dark:to-transparent dark:before:bg-[#202022] sm:h-12 sm:w-12 sm:rounded-xl sm:text-lg sm:before:rounded-xl;
    box-shadow: -4px 8px 24px hsla(0, 0%, 0%, 0.25);
    ion-icon {
      @apply sm:text-2xl;
    }
  }
  .timeline-list {
    @apply ml-11 text-sm sm:ml-16 sm:text-base;
    .timeline-item {
      @apply relative mb-5 before:absolute before:-left-[30px] before:-top-6 before:w-[1px] before:bg-amber-300 before:content-[''] last:mb-0 last:before:invisible last:before:h-0 last:before:w-0 dark:before:bg-[#383838] sm:before:-left-10;
      &::before {
        height: calc(100% + 50px);
      }
      &-title {
        @apply mb-2 text-sm leading-tight lg:text-base xl:text-lg;
      }
      &::after {
        @apply absolute -left-[33px] top-[5px] h-[6px] w-[6px] rounded-full bg-gradient-to-t from-yellow-400 from-[72%] to-yellow-500 to-[68%] content-[''] sm:-left-[43px] sm:h-2 sm:w-2 xl:top-[10px];
        box-shadow: 0 0 0 4px #383838;
      }
    }
    span {
      @apply font-bold leading-relaxed text-yellow-500;
    }
    .timeline-text {
      @apply mb-1 text-sm font-normal leading-relaxed text-neutral-500 dark:text-neutral-300 xl:max-w-[700px];
    }
  }
  .work-title {
    @apply mb-2 mt-2 indent-2 before:absolute before:left-0 before:mr-1 before:h-4 md:before:h-5 before:w-1 before:translate-y-0.5 before:rounded-sm before:bg-amber-300 before:content-[''] dark:before:bg-white;
  }
  .article-title {
    @apply relative pb-2 sm:pb-4 sm:font-bold md:pb-5;
  }
  .resume .article-title {
    @apply mb-4 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-8 after:rounded after:bg-gradient-to-r  after:from-yellow-300 after:to-yellow-500 after:content-[''] sm:mb-5 sm:font-semibold sm:after:h-[6px] md:mb-7 md:pb-5;
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
    @apply mb-4 last:mb-0 sm:mb-6;
  }
  .title-wrapper {
    @apply mb-2 flex items-center gap-2;
    data {
      @apply text-sm font-normal text-gray-400;
    }
  }

  .skill-progress-bg {
    @apply h-2 w-full rounded-[4px] bg-stone-200 dark:bg-[#383838];
  }

  .skill-progress-fill {
    @apply h-full rounded-[4px] bg-amber-200 bg-gradient-to-r from-yellow-400  to-yellow-600;
  }

  html:not(.dark) .timeline-list .timeline-item::after {
    box-shadow: 0 0 0 4px #f8e9bb;
  }
</style>
