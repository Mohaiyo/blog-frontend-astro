import { defineConfig, squooshImageService } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vue from '@astrojs/vue'
import { remarkReadingTime } from './src/plugins/remark-reading-time'

// https://astro.build/config
export default defineConfig({
  site: 'https://mohaiyo.netlify.app',
  image: {
    service: squooshImageService()
  },
  integrations: [tailwind(), vue()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'prism'
  }
})
