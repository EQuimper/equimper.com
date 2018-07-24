import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/layout'
import SubscribeForm from '../components/subscribe-form'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('w-full xl:w-1/2 mx-auto pb-12')};
`

const Article = styled('article')`
  ${tw('bg-white p-4 rounded shadow mb-6')};
`

interface IProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
      }
    }
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
          <h1>{post.frontmatter.title}</h1>
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
        title
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
