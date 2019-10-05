export interface IBlogPost {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    description: string
    tags: string[]
    date: string
  }
  timeToRead: number
  id: string
  body: string;
}
