import { Link as GatsbyLink } from 'gatsby'
import kebabCase from 'lodash.kebabcase'
import React, { SFC } from 'react'

import styled from '../utils/styled'

const Root = styled('ul')`
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

interface IProps {
  tags: string[]
}

const TagList: SFC<IProps> = ({ tags }) => (
  <Root>
    {tags.map(tag => (
      <TagWrapper key={tag}>
        <Tag to={`/tags/${kebabCase(tag)}`}>#{tag}</Tag>
      </TagWrapper>
    ))}
  </Root>
)

export default TagList
