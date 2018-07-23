import { Link } from 'gatsby'
import React from 'react'

import styled from '../utils/styled'

const Wrapper = styled('div')`
  ${tw('mb-8 flex items-center justify-between')};
`

const Title = styled('h1')`
  ${tw('text-grey text-sm uppercase tracking-wide')};
`

const LinkTitle = styled(Link)`
  ${tw('text-grey font-bold text-sm uppercase tracking-wide')};
`

const LinkExternalTitle = styled('a')`
  ${tw('text-grey font-bold text-sm uppercase tracking-wide')};
`

interface IProps {
  title: string
  secondTitle?: string
  secondTitleLink?: string
  externalLink?: boolean
}

const RowTitle = ({
  title,
  secondTitle,
  secondTitleLink,
  externalLink,
}: IProps) => (
  <Wrapper>
    <Title>{title}</Title>
    {secondTitle &&
      secondTitleLink &&
      externalLink && (
        <LinkExternalTitle target="_blank" href={secondTitleLink}>
          {secondTitle}
        </LinkExternalTitle>
      )}
    {secondTitle &&
      secondTitleLink &&
      !externalLink && (
        <LinkTitle to={secondTitleLink}>{secondTitle}</LinkTitle>
      )}
    {secondTitle && !secondTitleLink && <Title>{secondTitle}</Title>}
  </Wrapper>
)

export default RowTitle
