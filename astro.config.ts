import { defineConfig, squooshImageService } from 'astro/config'
import remarkToc from 'remark-toc'
import { h } from 'hastscript'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
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
    remarkPlugins: [[remarkToc, { heading: 'contents' }], remarkReadingTime],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: [h('ion-icon', { name: 'link-outline' })],
          headingProperties: { style: 'display: flex; align-items:center; gap: 8px;' },
          properties: { ariaHidden: true, tabIndex: -1, style: 'display: inline-flex;align-items: center;font-size:20px;' }
        }
      ]
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: JSON.parse(
        fs.readFileSync('./houston.theme.json', {
          encoding: 'utf-8'
        })
      )
    }
  }
})
