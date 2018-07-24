import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
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
  }
}

const BlogPost = ({ data }: IProps) => {
  const post = data.markdownRemark

  return (
    <Layout>
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
        </Article>

        <SubscribeForm avatar={data.avatarImg.fixed} />
      </Root>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
