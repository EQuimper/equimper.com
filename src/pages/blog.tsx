import { Link } from 'gatsby'
import React from 'react'

import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('sm:w-full md:w-3/4 lg:w-1/2 mx-auto pb-10')};
`

const ButtonsWrapper = styled('div')`
  ${tw('flex items-center justify-between mt-8')};
`

const ButtonWrapper = styled('div')``

const Button = styled(Link)`
  ${tw('text-grey font-bold text-sm uppercase tracking-wide')};
`

interface IProps {
  pathContext: {
    group: Array<{
      node: IBlogPost
    }>
    index: number
    first: boolean
    last: boolean
    pageCount: number
  }
}

const BlogPage = ({ pathContext }: IProps) => {
  const { group, index, first, last, pageCount } = pathContext
  const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <Layout>
      <Root>
        <RowTitle title="Latest Blog Posts" />

        {group.map(({ node }) => <BlogCard key={node.id} data={node} />)}

        <ButtonsWrapper>
          <ButtonWrapper>
            {!first && <Button to={`/blog/${previousUrl}`}>Newer Posts</Button>}
          </ButtonWrapper>
          <ButtonWrapper>
            {!last && <Button to={`/blog/${nextUrl}`}>Older Posts</Button>}
          </ButtonWrapper>
        </ButtonsWrapper>
      </Root>
    </Layout>
  )
}

export default BlogPage
