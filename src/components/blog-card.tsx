import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'
import TagList from './tags-list'

const Post = styled('div')`
  ${tw('bg-white rounded p-4 pb-0 mb-4 shadow')};
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
  data: IBlogPost
}

const BlogCard = ({ data }: IProps) => (
  <Post>
    <PostTitle to={`/blog/${data.fields.slug}`}>
      {data.frontmatter.title}
    </PostTitle>
    <DescriptionWrapper>
      <Description>{data.frontmatter.description}</Description>
    </DescriptionWrapper>

    <TagList tags={data.frontmatter.tags} />
  </Post>
)

export default BlogCard
