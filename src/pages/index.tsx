import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'

import BlogCard from '../components/blog-card'
import Facebook from '../components/icons/facebook'
import Github from '../components/icons/github'
import Linkedin from '../components/icons/linkedin'
import Twitter from '../components/icons/twitter'
import Youtube from '../components/icons/youtube'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import VideoCard from '../components/video-card'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-10 w-full xl:w-3/4')};
`

const RowWrapper = styled('div')`
  ${tw('mb-10 w-full')};
`

const VideosWrapper = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  grid-gap: 1em;
`

const IntroductionWrapper = styled('div')`
  ${tw('text-center mb-10 bg-white p-4 rounded shadow')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

const DetailWrapper = styled('div')``

const Title = styled('h1')`
  ${tw('text-grey-darkest font-bold text-4xl leading-normal tracking-wide')};

  font-family: Cormorant Garamond;
`

const UserDescriptionWrapper = styled('div')`
  ${tw('mb-4')};
`

const UserDescription = styled('p')`
  ${tw('text-sm text-grey-dark text-base')};
`

const IconWrapper = styled('a')`
  ${tw('')};
`

const GithubIcon = styled(Github)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const LinkedinIcon = styled(Linkedin)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const TwitterIcon = styled(Twitter)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const FacebookIcon = styled(Facebook)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const YoutubeIcon = styled(Youtube)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const IconsWrapper = styled('div')`
  ${tw('')}
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
              fluid: any
            }
          }
        }
      }>
    }
    avatarImg: {
      fixed: any
    }
  }
}

const IndexPage = ({ data }: IProps) => (
  <Layout>
    <Root>
      <IntroductionWrapper>
        <Avatar alt="avatar" fixed={data.avatarImg.fixed} />
        <DetailWrapper>
          <Title>EQuimper's Blog</Title>
          <UserDescriptionWrapper>
            <UserDescription>
              Programmer - Mentor - Blogger - Youtuber
            </UserDescription>
          </UserDescriptionWrapper>
          <IconsWrapper>
            <IconWrapper href="https://github.com/EQuimper" target="_blank">
              <GithubIcon />
            </IconWrapper>
            <IconWrapper
              href="https://www.linkedin.com/in/emanuelquimper"
              target="_blank"
            >
              <LinkedinIcon />
            </IconWrapper>
            <IconWrapper
              href="https://twitter.com/QuimperEmanuel"
              target="_blank"
            >
              <TwitterIcon />
            </IconWrapper>
            <IconWrapper
              href="https://www.facebook.com/EQuimperCoding"
              target="_blank"
            >
              <FacebookIcon />
            </IconWrapper>
            <IconWrapper
              href="https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw"
              target="_blank"
            >
              <YoutubeIcon />
            </IconWrapper>
          </IconsWrapper>
        </DetailWrapper>
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
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
