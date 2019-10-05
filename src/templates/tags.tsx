import { graphql } from 'gatsby'
import React from 'react'

import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import styled from '../utils/styled'
import { MdxConnection } from '../../types/graphql-types'

interface IProps {
  data: {
    allMdx: MdxConnection
  }
  pageContext: {
    tag: string
  }
}

const Root = styled('div')`
  ${tw('w-full lg:w-3/4 2xl:w-1/2 mx-auto pb-20 sm:pb-0')};
`

const postPluralize = (num: number) => (num > 1 ? 'posts' : 'post')

const Tags = ({ data, pageContext }: IProps) => {
  const { edges, totalCount } = data.allMdx
  return (
    <Layout>
      <Root>
        <RowTitle
          title={`${totalCount} ${postPluralize(totalCount)} about ${
            pageContext.tag
          }`}
        />
        {console.log('data', data)}

        {edges.map(({ node }) => (
          <BlogCard data={node} key={node.id} />
        ))}
      </Root>
    </Layout>
  )
}

export default Tags

export const query = graphql`
  query($tag: String!) {
    allMdx(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
