import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import VideoCard from '../components/video-card'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-10 w-full lg:w-3/4 xl:w-1/2')};
`

const RowWrapper = styled('div')`
  ${tw('mb-10')};
`

const VideosWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2em;
`

const IntroductionWrapper = styled('div')`
  ${tw('text-center mb-10 bg-white p-4 rounded shadow')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

interface IProps {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: {
          fields: {
            slug: string
          }
          frontmatter: {
            title: string
            description: string
            tags: string[]
          }
          id: string
        }
      }>
    }
    allYoutubeVideo: {
      edges: Array<{
        node: {
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
      }>
    }
    avatarImg: {
      resolutions: any
    }
  }
}

const IndexPage = ({ data }: IProps) => (
  <Layout>
    <Root>
      <IntroductionWrapper>
        <Avatar alt="avatar" resolutions={data.avatarImg.resolutions} />
        <div>
          <h1>EQuimper's Blog</h1>
          <p>Programmer | Mentor | Blogger | Youtuber</p>
        </div>
      </IntroductionWrapper>

      <RowTitle title="Latest Blog Post" />

      <RowWrapper>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogCard key={node.id} data={node} />
        ))}
      </RowWrapper>

      <RowTitle title="Latest Videos" />

      <RowWrapper>
        <VideosWrapper>
          {data.allYoutubeVideo.edges.map(({ node }) => (
            <VideoCard key={node.id} data={node} />
          ))}
        </VideosWrapper>
      </RowWrapper>
    </Root>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            tags
          }
        }
      }
    }

    allYoutubeVideo(limit: 3) {
      edges {
        node {
          id
          title
          description
          thumbnail {
            url
            height
            width
          }
          channelTitle
          publishedAt(formatString: "YYYY-MM-DD")
          localThumbnail {
            childImageSharp {
              resolutions(width: 300) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      resolutions(width: 200) {
        ...GatsbyImageSharpResolutions
      }
    }
  }
`
