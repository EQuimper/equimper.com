import Img from 'gatsby-image'
import React from 'react'
import { animated } from 'react-spring'

import styled from '../utils/styled'
import { YoutubeVideo } from '../../types/graphql-types'

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
    h2 {
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
  data: YoutubeVideo
}

const VideoCard = ({ data }: IProps) => (
  <Container>
    <Wrapper
      target="_blank"
      href={`https://www.youtube.com/watch?v=${data.id}`}
      rel="noreferrer"
    >
      {data.localThumbnail && data.localThumbnail.childImageSharp && (
        <ImgWrapper>
          <Img
            alt="thumbnail"
            fluid={data.localThumbnail.childImageSharp.fluid}
          />
        </ImgWrapper>
      )}
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
