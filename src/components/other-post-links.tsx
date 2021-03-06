import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import ArrowLeft from '../components/icons/arrow-left'
import ArrowRight from '../components/icons/arrow-right'
import styled from '../utils/styled'
import { Mdx } from '../../types/graphql-types'

const OtherPostWrapper = styled('div')`
  ${tw('flex-col flex-1 sm:flex-row my-12 flex items-stretch justify-between')};
`

interface IWrapperProps {
  previous?: boolean
  side: 'left' | 'right'
}

const Wrapper = styled('div')<IWrapperProps>`
  ${tw('flex flex-1')};

  ${props => props.previous && tw('mb-8 sm:mb-0')};

  ${props =>
    props.side === 'right' ? tw('justify-end') : tw('justify-start')};
`

const ArrowRightIcon = styled(ArrowRight)`
  ${tw('h-4 w-4 text-grey ml-2')};
`

const ArrowLeftIcon = styled(ArrowLeft)`
  ${tw('h-4 w-4 text-grey mr-2')};
`

interface ILinkProps {
  side: 'left' | 'right'
}

const Link = styled(GatsbyLink)<ILinkProps>`
  ${tw(
    'no-underline appearance-none border-0 text-grey bg-transparent flex flex-col'
  )};

  ${props => (props.side === 'left' ? tw('items-start') : tw('items-end'))};
`

const TitleWrapper = styled('div')`
  ${tw('flex flex-')};
`

const TopWrapper = styled('div')`
  ${tw('flex flex-row items-center mb-2 flex-1')};
`

const PostTitleWrapper = styled('div')`
  ${tw('flex flex-1')};
`

const Title = styled('h4')`
  ${tw(
    'tracking-wide font-bold leading-tight uppercase text-grey m-0 sm:text-sm'
  )};
`

interface IPostTitleProps {
  side: 'left' | 'right'
}

const PostTitle = styled('p')<IPostTitleProps>`
  ${tw(
    'leading-tight text-grey text-sm sm:text-base m-0 underline tracking-wide'
  )};

  text-align: ${props => props.side};
`

interface IProps {
  next: null | Mdx
  previous: null | Mdx
}

const OtherPostLinks = ({ next, previous }: IProps) => (
  <OtherPostWrapper>
    <Wrapper side="left" previous={!!previous}>
      {previous && (
        <Link
          side="left"
          to={`/blog/${(previous.fields && previous.fields.slug) || ''}`}
        >
          <TopWrapper>
            <ArrowLeftIcon />
            <TitleWrapper>
              <Title>Previous</Title>
            </TitleWrapper>
          </TopWrapper>
          <PostTitleWrapper>
            <PostTitle side="left">
              {(previous.frontmatter && previous.frontmatter.title) || ''}
            </PostTitle>
          </PostTitleWrapper>
        </Link>
      )}
    </Wrapper>
    <Wrapper side="right">
      {next && (
        <Link
          side="right"
          to={`/blog/${(next.fields && next.fields.slug) || ''}`}
        >
          <TopWrapper>
            <TitleWrapper>
              <Title>Next</Title>
            </TitleWrapper>
            <ArrowRightIcon />
          </TopWrapper>
          <PostTitleWrapper>
            <PostTitle side="right">
              {(next.frontmatter && next.frontmatter.title) || ''}
            </PostTitle>
          </PostTitleWrapper>
        </Link>
      )}
    </Wrapper>
  </OtherPostWrapper>
)

export default OtherPostLinks
