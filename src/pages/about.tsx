import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { RefObject } from 'react'
import { css } from 'react-emotion'
import Typed from 'typed.js'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import SocialFollow from '../components/social-follow'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full xl:w-3/4')};
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
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
      }
    }
  }
}

class AboutPage extends React.Component<IProps> {
  typed?: Typed
  el: RefObject<any>

  constructor(props: IProps) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount() {
    const str =
      window.innerWidth <= 576
        ? 'Hey, I am Emanuel. <br>Happy to see you there.'
        : 'Hey, I am Emanuel. Happy to see you there.'

    const options = {
      strings: [str],
      typeSpeed: 70,
      backSpeed: 50,
    }

    this.typed = new Typed(this.el.current, options)
  }

  componentWillUnmount() {
    if (this.typed) {
      this.typed.destroy()
    }
  }

  render() {
    const { data } = this.props
    return (
      <Layout>
        <SEO url={`${siteConfig.site.url}/about`} customTitle="About" />

        <Root>
          <Wrapper>
            <AvatarWrapper>
              <Avatar fixed={data.avatarImg.fixed} />
            </AvatarWrapper>
            <TitleWrapper>
              <span ref={this.el} />
            </TitleWrapper>
            <FollowWrapper>
              <FollowTitle>You can follow me on</FollowTitle>
            </FollowWrapper>
            <SocialFollowWrapper>
              <SocialFollow />
            </SocialFollowWrapper>
          </Wrapper>
          <RowTitle title="About Myself" />
          <Content>
            <ContentWrapper
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              className="md-content"
            />
          </Content>
        </Root>
      </Layout>
    )
  }
}

export default AboutPage

export const query = graphql`
  query AboutQuery {
    markdownRemark(fileAbsolutePath: { regex: "/about.md/" }) {
      html
      frontmatter {
        title
      }
    }

    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 150) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
