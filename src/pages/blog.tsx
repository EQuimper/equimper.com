import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('sm:w-full lg:w-1/2 mx-auto pb-10')};
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
    {console.log('data', data)}
    <Root>
      <PageTitleWrapper>
        <PageTitle>Latest Blog Posts</PageTitle>
      </PageTitleWrapper>

      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Post key={node.id}>
          <PostTitle to="#">{node.frontmatter.title}</PostTitle>
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

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 10) {
      edges {
        node {
          id
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

// <Post>
// <PostTitle to="#">How do I manage state with React?</PostTitle>

// <DescriptionWrapper>
//   <Description>
//     How do I manage state in my react application? When to use Redux,
//     MobX, Context API vs Component level state? What to do to handle
//     forms state? How can I make my app state easier to maintain?
//   </Description>
// </DescriptionWrapper>
// <TagList>
//   <TagWrapper>
//     <Tag to="#">#redux</Tag>
//   </TagWrapper>
//   <TagWrapper>
//     <Tag to="#">#react</Tag>
//   </TagWrapper>
//   <TagWrapper>
//     <Tag to="#">#javascript</Tag>
//   </TagWrapper>
//   <TagWrapper>
//     <Tag to="#">#mobx</Tag>
//   </TagWrapper>
//   <TagWrapper>
//     <Tag to="#">#tips</Tag>
//   </TagWrapper>
// </TagList>
// </Post>

// <Post>
// <PostTitle to="#">My Goals for 2018</PostTitle>
// <DescriptionWrapper>
//   <Description>
//     What is my goals for 2018? Where my youtube channel go?.
//   </Description>
// </DescriptionWrapper>
// <TagList>
//   <TagWrapper>
//     <Tag to="#">#life</Tag>
//   </TagWrapper>
// </TagList>
// </Post>
