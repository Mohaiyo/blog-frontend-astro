import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { remarkReadingTime } from './src/plugins/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://mohaiyo.netlify.app',
  integrations: [tailwind(), vue()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'prism'
  }
})
