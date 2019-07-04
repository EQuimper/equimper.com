import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'
import React from 'react'

import Layout from '../components/layout'
import OtherPostLinks from '../components/other-post-links'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import Share from '../components/share'
import SubscribeForm from '../components/subscribe-form'
import TagList from '../components/tags-list'
import { IBlogPost } from '../interfaces/BlogPost'
import { IComment } from '../interfaces/Comment'
import styled from '../utils/styled'
import { pluralize } from '../utils/textHelpers'

const Root = styled('div')`
  ${tw('w-full lg:w-3/4 2xl:w-1/2 mx-auto pb-12')};
`

const Article = styled('article')`
  ${tw('bg-white p-4 rounded shadow mb-6')};
`

const ArticleTitleWrapper = styled('div')`
  ${tw('mb-6')};
`

const ArticleTitle = styled('h1')`
  ${tw('text-grey-darkest mt-0')};
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
    smallAvatarImg: {
      fixed: any
    }
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    comments: {
      edges: Array<{
        node: IComment
      }>
    }
  }
  location: {
    pathname: string
  }
  pageContext: {
    next: null | IBlogPost
    previous: null | IBlogPost
  }
}

const BlogPost = ({ data, location, pageContext }: IProps) => {
  const post = data.markdownRemark

  const url = `${data.site.siteMetadata.siteUrl}${location.pathname}`

  const disqusConfig = {
    url,
    identifier: post.id,
    title: post.frontmatter.title,
  }

  return (
    <Layout showProgress>
      <SEO url={url} isBlogPost postMeta={post.frontmatter} />
      <Root>
        <SubscribeForm avatar={data.avatarImg.fixed} />

        <Article>
          <ArticleTitleWrapper>
            <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          </ArticleTitleWrapper>
          <DetailWrapper>
            <Date>
              {post.frontmatter.date} &bull; {post.timeToRead}{' '}
              {pluralize(post.timeToRead, 'minute', 'minutes')} to read{' '}
            </Date>
          </DetailWrapper>

          <TagList tags={post.frontmatter.tags} />
          <div
            className="md-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <Share title={post.frontmatter.title} url={url} />
        </Article>

        <OtherPostLinks
          next={pageContext.next}
          previous={pageContext.previous}
        />

        <SubscribeForm avatar={data.avatarImg.fixed} />

        <RowTitle title="Comments" />

        <Disqus config={disqusConfig} />
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
      timeToRead
      fields {
        slug
      }
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

    smallAvatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 60) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
