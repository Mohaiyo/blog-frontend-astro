import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  site: 'https://mohaiyo.netlify.app',
  integrations: [tailwind(), vue()],
  markdown: {
    syntaxHighlight: 'prism',
    // shikiConfig: {
    //   // 选择 Shiki 内置的主题（或添加你自己的主题）
    //   // https://github.com/shikijs/shiki/blob/main/docs/themes.md
    //   theme: 'material-theme',
    //   // 添加自定义语言
    //   // 注意：Shiki 内置了无数语言，包括 .astro！
    //   // https://github.com/shikijs/shiki/blob/main/docs/languages.md
    //   langs: [],
    //   // 启用自动换行，以防止水平滚动
    //   wrap: true
    // }
  }
})
