export type CategoryItem = {
  title: string
  slug: string
  color: 'green' | 'blue' | 'orange' | 'purple' | 'pink' | 'teal'
  description?: string
}

export const categories: CategoryItem[] = [
  {
    title: '前端开发',
    slug: 'front-end-dev',
    color: 'blue'
  },
  {
    title: '后端开发',
    slug: 'back-end-dev',
    color: 'orange'
  },
  {
    title: '数据库与存储',
    slug: 'db-and-storage',
    color: 'green'
  },
  {
    title: '云计算与部署',
    slug: 'cloud-computing-and-deployment',
    color: 'pink'
  },
  {
    title: '技术工具与实际',
    slug: 'tech-tools-and-practices',
    color: 'purple'
  },
  {
    title: '读书笔记',
    slug: 'posts',
    color: 'teal'
  }
]
