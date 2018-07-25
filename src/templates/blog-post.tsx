import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Share from '../components/share'
import SubscribeForm from '../components/subscribe-form'
import TagList from '../components/tags-list'
import { IBlogPost } from '../interfaces/BlogPost'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('w-full xl:w-1/2 mx-auto pb-12')};
`

const Article = styled('article')`
  ${tw('bg-white p-4 rounded shadow mb-6')};
`

const ArticleTitleWrapper = styled('div')`
  ${tw('mb-6')};
`

const ArticleTitle = styled('h1')`
  ${tw('text-grey-darkest')};
`

const Date = styled('p')`
  ${tw('text-xs leading-normal tracking-wide text-grey uppercase')};
`

const DetailWrapper = styled('div')`
  ${tw('mb-6')};
`

interface IProps {
  data: {
    markdownRemark: IBlogPost
    avatarImg: {
      fixed: any
    }
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
  }
  location: {
    pathname: string
  }
}

const BlogPost = ({ data, location }: IProps) => {
  const post = data.markdownRemark

  const url = `${data.site.siteMetadata.siteUrl}${location.pathname}`

  return (
    <Layout>
      <SEO url={url} isBlogPost postMeta={post.frontmatter} />
      <Root>
        <SubscribeForm avatar={data.avatarImg.fixed} />

        <Article>
          <ArticleTitleWrapper>
            <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          </ArticleTitleWrapper>
          <DetailWrapper>
            <Date>{post.frontmatter.date}</Date>
          </DetailWrapper>

          <TagList tags={post.frontmatter.tags} />
          <div
            className="md-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <Share title={post.frontmatter.title} url={url} />
        </Article>

        <SubscribeForm avatar={data.avatarImg.fixed} />
      </Root>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }

    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        description
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
