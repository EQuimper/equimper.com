import Img from 'gatsby-image'
import React from 'react'
import { animated } from 'react-spring'

import { animationFromY } from '../utils/animations'
import styled from '../utils/styled'

const Container = styled(animated.div)`
  ${tw('w-full h-full flex')};
`

const VideoTitle = styled('h2')`
  ${tw('text-base tracking-wide text-grey-darkest font-bold pb')};
`

const Wrapper = styled('a')`
  ${tw(
    'no-underline flex flex-1 flex-col items-center bg-white rounded pb-4 shadow overflow-hidden'
  )};

  &:hover {
    ${VideoTitle} {
      text-decoration: underline;
    }
  }
`

const VideoTitleWrapper = styled('div')`
  display: flex;
  flex: 1;
  align-items: center;
`

const ImgWrapper = styled('div')`
  ${tw('h-1/3 w-full')};
`

const DetailWrapper = styled('div')`
  ${tw('w-full h-full px-4 text-left flex flex-col')};
`

const VideoDateWrapper = styled('div')`
  display: flex;
  flex: 0.2;
  align-items: center;
`

const VideoDate = styled('p')`
  ${tw('text-xs leading-normal tracking-wide text-grey uppercase')};
`

interface IProps {
  data: {
    id: string
    title: string
    description: string
    thumbnail: {
      url: string
      height: number
      width: number
    }
    channelTitle: string
    publishedAt: string
    localThumbnail: {
      childImageSharp: {
        resolutions: any
        fluid: any
      }
    }
  }
  withAnimation?: boolean
  style?: {
    opacity: number
    y: any
  }
}

const VideoCard = ({ data, withAnimation = false, style }: IProps) => (
  <Container style={animationFromY(style, withAnimation)}>
    <Wrapper
      target="_blank"
      href={`https://www.youtube.com/watch?v=${data.id}`}
      rel="noreferrer"
    >
      <ImgWrapper>
        <Img
          alt="thumbnail"
          fluid={data.localThumbnail.childImageSharp.fluid}
        />
      </ImgWrapper>
      <DetailWrapper>
        <VideoTitleWrapper>
          <VideoTitle>{data.title}</VideoTitle>
        </VideoTitleWrapper>
        <VideoDateWrapper>
          <VideoDate>{data.publishedAt}</VideoDate>
        </VideoDateWrapper>
      </DetailWrapper>
    </Wrapper>
  </Container>
)

export default VideoCard
