import rss from '@astrojs/rss'
import { fetchAllPost } from '@utils/index'

const { allPosts } = await fetchAllPost()

export async function GET(context: { site: string }) {
  return rss({
    title: 'TechConnect',
    description: 'TechConnect: 探索科技世界的无限可能',
    site: context.site,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.collection}/${post.slug}/`
    })),
    customData: `<language>en-us</language>`
  })
}
