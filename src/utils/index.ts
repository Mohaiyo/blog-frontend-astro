import { getCollection } from 'astro:content'

export const getFormattedDate = (date: string) =>
  date
    ? new Date(date).toLocaleDateString('zh-CN', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      })
    : ''

export const fetchAllPost = async () => {
  const postsEntriesPromise = getCollection('posts')
  const frontEndDevEntriesPromise = getCollection('front-end-dev')
  const backEndDevEntriesPromise = getCollection('back-end-dev')
  const dbAndStorageEntriesPromise = getCollection('db-and-storage')
  const cloudComputingAndDeploymentEntriesPromise = getCollection('cloud-computing-and-deployment')
  const techToolsAndPracticesEntriesPromise = getCollection('tech-tools-and-practices')
  const [postsEntries, frontEndDevEntries, backEndDevEntries, dbAndStorageEntries, cloudComputingAndDeploymentEntries, techToolsAndPracticesEntries] =
    await Promise.all([
      postsEntriesPromise,
      frontEndDevEntriesPromise,
      backEndDevEntriesPromise,
      dbAndStorageEntriesPromise,
      cloudComputingAndDeploymentEntriesPromise,
      techToolsAndPracticesEntriesPromise
    ])
  return {
    allPosts: [
      ...postsEntries,
      ...frontEndDevEntries,
      ...backEndDevEntries,
      ...dbAndStorageEntries,
      ...cloudComputingAndDeploymentEntries,
      ...techToolsAndPracticesEntries
    ].sort((a, b) => {
      return new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    }),
    posts: postsEntries,
    frontEndDev: frontEndDevEntries,
    backEndDev: backEndDevEntries,
    dbAndStorage: dbAndStorageEntries,
    cloudComputingAndDeployment: cloudComputingAndDeploymentEntries,
    techToolsAndPractices: techToolsAndPracticesEntries,
  }
}
