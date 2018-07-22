import Img from 'gatsby-image'
import React from 'react'

import styled from '../utils/styled'

const Container = styled('div')`
  ${tw('w-full w-full flex')};
`

const Wrapper = styled('a')`
  ${tw(
    'no-underline flex flex-1 flex-col items-center bg-white rounded pb-4 shadow overflow-hidden'
  )};
`

const VideoTitle = styled('h2')`
  ${tw('text-base text-grey-darkest font-bold pb')};
`

const ImgWrapper = styled('div')`
  ${tw('h-1/3')};

  min-width: 700px;
`

const DetailWrapper = styled('div')`
  ${tw('h-2/3 px-4')};
`

const VideoDate = styled('p')`
  ${tw('text-grey-dark text-sm')};
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
}

const VideoCard = ({ data }: IProps) => (
  <Container>
    <Wrapper
      target="_blank"
      href={`https://www.youtube.com/watch?v=${data.id}`}
    >
      {console.log(data.localThumbnail.childImageSharp)}
      <ImgWrapper>
        <Img
          alt="thumbnail"
          fluid={data.localThumbnail.childImageSharp.fluid}
        />
      </ImgWrapper>
      <DetailWrapper>
        <VideoTitle>{data.title}</VideoTitle>
        <VideoDate>Published at: {data.publishedAt}</VideoDate>
      </DetailWrapper>
    </Wrapper>
  </Container>
)

export default VideoCard
