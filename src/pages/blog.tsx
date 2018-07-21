import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'

import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('sm:w-full md:w-3/4 lg:w-1/2 mx-auto pb-10')};
`

const PageTitleWrapper = styled('div')`
  ${tw('mb-8')};
`

const PageTitle = styled('h1')`
  ${tw('text-grey text-sm uppercase tracking-wide')};
`

interface IProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
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
      }>
    }
  }
}

const BlogPage = ({ data }: IProps) => (
  <Layout>
    <Root>
      <PageTitleWrapper>
        <PageTitle>Latest Blog Posts</PageTitle>
      </PageTitleWrapper>

      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogCard key={node.id} data={node} />
      ))}
    </Root>
  </Layout>
)

export default BlogPage

export const query = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 10
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            tags
          }
        }
      }
    }
  }
`
