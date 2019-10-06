import { graphql } from 'gatsby'
import React from 'react'

import siteConfig from '../../data/siteConfig'
import AuthorIntro from '../components/author-intro'
import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import VideoCard from '../components/video-card'
import styled from '../utils/styled'
import {
  MdxConnection,
  YoutubeVideoConnection,
} from '../../types/graphql-types'

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full lg:w-3/4 2xl:w-1/2')};
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

interface IProps {
  data: {
    allMdx: MdxConnection
    allYoutubeVideo: YoutubeVideoConnection
    avatarImg: {
      fixed: any
    }
  }
}

const IndexPage: React.SFC<IProps> = ({ data }) => (
  <Layout>
    <SEO url={siteConfig.site.url} customTitle="Home Page" />
    <Root>
      <AuthorIntro data={data} />

      <RowTitle
        title="Latest Blog Post"
        secondTitle="View All"
        secondTitleLink="/blog"
      />

      <RowWrapper>
        {data.allMdx.edges.map(({ node }) => (
          <BlogCard key={node.id} data={node} />
        ))}
      </RowWrapper>

      <RowTitle
        title="Latest Videos"
        secondTitle="View All"
        externalLink
        secondTitleLink={siteConfig.youtubeChannelUrl}
      />

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
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      limit: 3
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }

    allYoutubeVideo(limit: 4) {
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
          publishedAt(formatString: "MMMM DD, YYYY")
          localThumbnail {
            childImageSharp {
              fluid(maxWidth: 500) {
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
