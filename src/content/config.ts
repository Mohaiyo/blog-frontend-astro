// 从 `astro:content` 导入辅助工具
import { z, defineCollection } from 'astro:content'

// 为每一个集合定义一个 `type` 和 `schema`
const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date().default(new Date()),
    description: z.string(),
    author: z.string().default('WAYNE LIANG'),
    category: z.enum(['前端开发', '后端开发', '数据库与存储', '云计算与部署', '技术工具与实践', '读书笔记']),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
})

// 导出一个单独的 `collections` 对象来注册你的集合
export const collections = {
  posts: postsCollection,
  'back-end-dev': postsCollection,
  'front-end-dev': postsCollection,
  'db-and-storage': postsCollection,
  'cloud-computing-and-deployment': postsCollection,
  'tech-tools-and-practices': postsCollection
}
