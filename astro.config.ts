import { defineConfig, squooshImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { remarkReadingTime } from './src/plugins/remark-reading-time'
import mdx from '@astrojs/mdx'
import fs from 'node:fs'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://tech-connection.netlify.app',
  image: {
    service: squooshImageService()
  },
  integrations: [
    tailwind({
      applyBaseStyles: true
    }),
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('ion-')
        }
      }
    }),
    mdx(),
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: JSON.parse(
        fs.readFileSync('./houston.theme.json', {
          encoding: 'utf-8'
        })
      )
    },
    rehypePlugins: []
  }
})
