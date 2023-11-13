import { getCollection } from 'astro:content'

export const getFormattedDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : ''

export const latestPosts = async () => {
  const blogEntries = await getCollection('posts')
  return blogEntries.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf())
}
