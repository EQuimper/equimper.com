import { Link as GatsbyLink } from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import React from 'react'

import styled from '../utils/styled'
import { MdxFrontmatter } from '../../types/graphql-types'

const Root = styled('ul')`
  ${tw('list-reset flex flex-wrap items-center')};
`

const TagWrapper = styled('li')`
  ${tw('mr-4 mb-8')};
`

const Tag = styled(GatsbyLink)`
  ${tw(
    'no-underline lowercase text-sm bg-grey-lighter rounded p-2 hover:shadow text-black tracking-small'
  )};
`

interface IProps {
  tags: MdxFrontmatter['tags']
}

const TagList: React.FC<IProps> = ({ tags }) => (
  <Root>
    {(tags || []).map(tag => (
      <TagWrapper key={(tag && tag) || ''}>
        <Tag to={`/tags/${kebabCase((tag && tag) || '')}`}>#{tag}</Tag>
      </TagWrapper>
    ))}
  </Root>
)

export default TagList
