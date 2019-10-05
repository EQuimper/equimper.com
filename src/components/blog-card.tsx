import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import styled from '../utils/styled'
import TagList from './tags-list'
import { Mdx } from '../../types/graphql-types'

const Post = styled('div')`
  ${tw('bg-white rounded p-4 pb-0 mb-4 shadow')};
`

const DescriptionWrapper = styled('div')`
  ${tw('mb-8')};
`

const TopWrapper = styled('div')`
  ${tw('flex-col sm:flex-row flex items-left sm:items-center justify-between')};
`

const PostTitleWrapper = styled('div')`
  ${tw('sm:w-3/4 mb-4 sm:mb-0')};
`

const DateWrapper = styled('div')`
  ${tw('sm:w-1/4 flex sm:justify-end')};
`

const PostTitle = styled(GatsbyLink)`
  ${tw(
    'text-grey-darkest no-underline font-bold tracking-wide text-2xl hover:underline'
  )};
`

const Description = styled('p')`
  ${tw('text-md leading-normal text-grey-darker tracking-small')};
`

const Date = styled('p')`
  ${tw('text-xs leading-normal tracking-wide text-grey uppercase')};
`

interface IProps {
  data: Mdx
}

const BlogCard: React.FC<IProps> = ({ data }) => {
  return (
    <Post>
      <TopWrapper>
        <PostTitleWrapper>
          <PostTitle to={`/blog/${(data.fields && data.fields.slug) || ''}`}>
            {(data.frontmatter && data.frontmatter.title) || ''}
          </PostTitle>
        </PostTitleWrapper>
        <DateWrapper>
          <Date>{(data.frontmatter && data.frontmatter.date) || ''}</Date>
        </DateWrapper>
      </TopWrapper>
      <DescriptionWrapper>
        <Description>
          {(data.frontmatter && data.frontmatter.description) || ''}
        </Description>
      </DescriptionWrapper>

      <TagList tags={(data.frontmatter && data.frontmatter.tags) || []} />
    </Post>
  )
}

export default BlogCard
