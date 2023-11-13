import { getCollection } from 'astro:content'

export const getFormattedDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString('zh-CN', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      })
    : ''

export const latestPosts = async () => {
  const blogEntries = await getCollection('posts')
  return blogEntries.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())
}
