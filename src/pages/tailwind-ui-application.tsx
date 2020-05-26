import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React, { createRef, useEffect } from 'react'
import Typed from 'typed.js'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import SocialFollow from '../components/social-follow'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full lg:w-3/4 2xl:w-1/2')};
`

const Wrapper = styled('div')`
  ${tw('bg-white rounded shadow p-4 mb-8')};
`

const AvatarWrapper = styled('div')`
  ${tw('mb-4 text-center')};
`

const FollowWrapper = styled('div')`
  ${tw('mb-4 text-center')};
`

const SocialFollowWrapper = styled('div')`
  ${tw('text-center')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

const TitleWrapper = styled('div')`
  ${tw('py-4 text-center text-grey-darker font-bold text-2xl')};

  quotes: '“' '”' '‘' '’';

  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`

const FollowTitle = styled('h3')`
  ${tw('text-grey-dark font-bold text-xl m-0 tracking-wide text-center')};
`

const Content = styled('div')`
  ${tw('mb-6')};
`

const ContentWrapper = styled('div')`
  ${tw('bg-white p-4 rounded shadow')};

  h4 {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`

interface IProps {
  data: {
    avatarImg: {
      fixed: any
    }
    mdx: {
      body: string
      frontmatter: {
        title: string
      }
    }
  }
}

const TailwindUiApplication: React.FC<IProps> = ({ data }) => {
  let typed: Typed | null = null
  const textElement = createRef<HTMLSpanElement>()

  useEffect(() => {
    const str = 'Hey, I am Emanuel.<br>I think I can be a good fit<br>for Tailwind UI :)'


    const options = {
      strings: [str],
      typeSpeed: 70,
      backSpeed: 50,
    }

    if (textElement.current) {
      typed = new Typed(textElement.current as any, options)
    }

    return () => {
      if (typed) {
        typed.destroy()
      }
    }
  }, [])

  return (
    <Layout>
      <Root>
        <Wrapper>
          <AvatarWrapper>
            <Avatar fixed={data.avatarImg.fixed} />
          </AvatarWrapper>
          <TitleWrapper>
            <span ref={textElement} />
          </TitleWrapper>
          <FollowWrapper>
            <FollowTitle>You can see my online profiles here</FollowTitle>
          </FollowWrapper>
          <SocialFollowWrapper>
            <SocialFollow />
          </SocialFollowWrapper>
        </Wrapper>
        <RowTitle title="About Myself" />
        <Content>
          <ContentWrapper className="md-content">
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </ContentWrapper>
        </Content>
      </Root>
    </Layout>
  )
}

export default TailwindUiApplication

export const query = graphql`
  query TailwindUiApplicationQuery {
    mdx(fileAbsolutePath: { regex: "/tailwind-ui-application.md/" }) {
      body
      frontmatter {
        title
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/profile/" } }) {
      fixed(width: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
