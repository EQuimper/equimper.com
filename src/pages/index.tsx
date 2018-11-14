import { graphql } from 'gatsby'
import React from 'react'
import { Trail } from 'react-spring'

import siteConfig from '../../data/siteConfig'
import AuthorIntro from '../components/author-intro'
import BlogCard from '../components/blog-card'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import VideoCard from '../components/video-card'
import { IBlogPost } from '../interfaces/BlogPost'
import { IYoutubeVideo } from '../interfaces/YoutubeVideo'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full xl:w-3/4')};
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
    allMarkdownRemark: {
      edges: Array<{
        node: IBlogPost
      }>
    }
    allYoutubeVideo: {
      edges: Array<{
        node: IYoutubeVideo
      }>
    }
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
        {data.allMarkdownRemark.edges.map(({ node }) => (
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
          <Trail
            from={{ opacity: 0, y: 100 }}
            to={{ opacity: 1, y: 0 }}
            native
            keys={data.allYoutubeVideo.edges.map(({ node }) => node.id)}
          >
            {data.allYoutubeVideo.edges.map(({ node }) => (styles: any) => (
              <VideoCard
                withAnimation
                style={styles}
                key={node.id}
                data={node}
              />
            ))}
          </Trail>
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
      filter: { fileAbsolutePath: { regex: "/posts/" } }
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
            date(formatString: "MMMM DD, YYYY")
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
          publishedAt(formatString: "MMMM DD, YYYY")
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
