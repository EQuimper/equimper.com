import { Link as GatsbyLink } from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import React from 'react'

import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'

const Post = styled('div')`
  ${tw('bg-white rounded p-4 pb-0 mb-4 shadow')};
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
    <TagList>
      {data.frontmatter.tags.map(tag => (
        <TagWrapper key={tag}>
          <Tag to={`/tags/${kebabCase(tag)}`}>#{tag}</Tag>
        </TagWrapper>
      ))}
    </TagList>
  </Post>
)

export default BlogCard
