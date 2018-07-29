import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

import ArrowLeft from '../components/icons/arrow-left'
import ArrowRight from '../components/icons/arrow-right'
import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'

const OtherPostWrapper = styled('div')`
  ${tw('flex-col sm:flex-row my-12 flex items-center justify-between')};
`

const ArrowRightIcon = styled(ArrowRight)`
  ${tw('h-4 w-4 text-grey ml-2')};
`

const ArrowLeftIcon = styled(ArrowLeft)`
  ${tw('h-4 w-4 text-grey mr-2')};
`

const PreviousWrapper = styled(GatsbyLink)`
  ${tw(
    'flex no-underline flex-1 flex-col items-start appearance-none border-0 text-grey bg-transparent'
  )};
`

const NextWrapper = styled(GatsbyLink)`
  ${tw(
    'flex no-underline flex-1 flex-col items-end appearance-none border-0 text-grey bg-transparent'
  )};
`

interface IWrapperProps {
  previous?: boolean
}

const Wrapper = styled('div')`
  ${tw('w-full h-full flex flex-1 sm:w-1/2')};

  ${(props: IWrapperProps) => props.previous && tw('mb-8 sm:mb-0')};
`

const TitleWrapper = styled('div')`
  ${tw('')};
`

const TopWrapper = styled('div')`
  ${tw('flex flex-row items-center mb-2 flex-1')};
`

const PostTitleWrapper = styled('div')`
  ${tw('flex flex-1')};
`

const Title = styled('h4')`
  ${tw(
    'tracking-wide leading-tight uppercase text-grey m-0 text-sm sm:text-base'
  )};
`

interface IPostTitleProps {
  side: 'left' | 'right'
}

const PostTitle = styled('p')`
  ${tw('leading-tight text-grey text-xs sm:text-sm m-0')};

  text-align: ${(props: IPostTitleProps) => props.side};
`

interface IProps {
  next: null | IBlogPost
  previous: null | IBlogPost
}

const OtherPostLinks = ({ next, previous }: IProps) => (
  <OtherPostWrapper>
    <Wrapper previous={!!previous}>
      {previous && (
        <PreviousWrapper to={`/blog/${previous.fields.slug}`}>
          <TopWrapper>
            <ArrowLeftIcon />
            <TitleWrapper>
              <Title>Previous</Title>
            </TitleWrapper>
          </TopWrapper>
          <PostTitleWrapper>
            <PostTitle side="left">{previous.frontmatter.title}</PostTitle>
          </PostTitleWrapper>
        </PreviousWrapper>
      )}
    </Wrapper>
    <Wrapper>
      {next && (
        <NextWrapper to={`/blog/${next.fields.slug}`}>
          <TopWrapper>
            <TitleWrapper>
              <Title>Next</Title>
            </TitleWrapper>
            <ArrowRightIcon />
          </TopWrapper>
          <PostTitleWrapper>
            <PostTitle side="right">{next.frontmatter.title}</PostTitle>
          </PostTitleWrapper>
        </NextWrapper>
      )}
    </Wrapper>
  </OtherPostWrapper>
)

export default OtherPostLinks
