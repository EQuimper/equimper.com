import { Link } from 'gatsby'
import React from 'react'

import siteConfig from '../../data/siteConfig'
import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('w-full lg:w-3/4 2xl:w-1/2 mx-auto pb-20 sm:pb-0')};
`

const ButtonsWrapper = styled('div')`
  ${tw('flex items-center justify-between mt-8 mb-4')};
`

const Button = styled(Link)`
  ${tw('text-grey font-bold text-sm uppercase tracking-wide')};
`

const PageCount = styled('p')`
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
      <SEO url={`${siteConfig.site.url}/blog`} customTitle="Blog" />
      <Root>
        <RowTitle title="Latest Blog Posts" />

        {group.map(({ node }) => (
          <BlogCard key={node.id} data={node} />
        ))}

        <ButtonsWrapper>
          {!first && (
            <div>
              <Button to={`/blog/${previousUrl}`}>Newer</Button>
            </div>
          )}
          <div>
            <PageCount>
              Page {index} of {pageCount}
            </PageCount>
          </div>
          {!last && (
            <div>
              <Button to={`/blog/${nextUrl}`}>Older</Button>
            </div>
          )}
        </ButtonsWrapper>
      </Root>
    </Layout>
  )
}

export default BlogPage
