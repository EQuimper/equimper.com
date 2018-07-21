import Img from 'gatsby-image'
import React from 'react'

import styled from '../utils/styled'

const Container = styled('div')`
  ${tw('w-full w-full flex')};
`

const Wrapper = styled('div')`
  ${tw('flex flex-1 flex-col items-center bg-white rounded shadow')};
`

const VideoTitle = styled('h2')`
  ${tw('text-base text-grey-darkest font-bold')};
`

const ImgWrapper = styled('div')`
  ${tw('flex-1')};
`

const DetailWrapper = styled('div')`
  ${tw('w-2/3 pl-4')};
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
      }
    }
  }
}

const VideoCard = ({ data }: IProps) => (
  <Container>
    <Wrapper>
      <ImgWrapper>
        <Img
          alt="thumbnail"
          resolutions={data.localThumbnail.childImageSharp.resolutions}
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
