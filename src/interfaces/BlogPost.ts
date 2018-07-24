export interface IBlogPost {
  fields: {
    slug: string
  }
  html: string
  frontmatter: {
    title: string
    description: string
    tags: string[]
    date: string
  }
  timeToRead: number
  id: string
}
