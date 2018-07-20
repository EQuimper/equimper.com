import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'

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

const Post = styled('div')`
  ${tw('bg-white rounded p-6 pb-0 mb-4 hover:shadow')};
`

const TagList = styled('ul')`
  ${tw('list-reset flex flex-wrap items-center')};
`

const TagWrapper = styled('li')`
  ${tw('mr-4 mb-8')};
`

const Tag = styled(GatsbyLink)`
  ${tw(
    'no-underline lowercase text-sm bg-grey-lighter rounded p-2 hover:shadow text-black'
  )};
`

const DescriptionWrapper = styled('div')`
  ${tw('mb-8')};
`

const PostTitle = styled(GatsbyLink)`
  ${tw(
    'text-grey-darkest no-underline font-bold tracking-wide text-2xl hover:underline'
  )};
`

const Description = styled('p')`
  ${tw('text-md leading-normal text-grey-darker')};
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
        <Post key={node.id}>
          <PostTitle to={`/blog/${node.fields.slug}`}>
            {node.frontmatter.title}
          </PostTitle>
          <DescriptionWrapper>
            <Description>{node.frontmatter.description}</Description>
          </DescriptionWrapper>
          <TagList>
            {node.frontmatter.tags.map(tag => (
              <TagWrapper key={tag}>
                <Tag to={`tags/${tag}`}>#{tag}</Tag>
              </TagWrapper>
            ))}
          </TagList>
        </Post>
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
