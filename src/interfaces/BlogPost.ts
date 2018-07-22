export interface IBlogPost {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    description: string
    tags: string[]
  }
  id: string
}
