import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import TextWithQuotes from '../commons/text-with-quotes'
import ContactForm from '../components/contact-form'
import Layout from '../components/layout'
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
  ${tw('mr-4 mb-4 sm:mb-0')};
`

const BottomWrapper = styled(Wrapper)`
  ${tw(
    'flex flex-col sm:flex-row items-center text-center sm:text-left sm:justify-start'
  )};
`

const TopWrapper = styled('div')`
  ${tw('mb-8')};

  h1 {
    ${tw('tracking-wide text-grey-darker font-bold text-2xl mt-0')};
  }

  p {
    ${tw('leading-tight tracking-small text-grey-darker')};
  }
`

const FollowTitle = styled(TextWithQuotes.withComponent('h3'))`
  ${tw('tracking-wide text-grey-darker font-bold text-xl mt-0')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

interface IProps {
  data: {
    avatarImg: {
      fixed: any
    }
  }
}

const Contact: SFC<IProps> = ({ data }) => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/contact`} customTitle="Contact Me" />

    <Root>
      <Wrapper>
        <TopWrapper>
          <h1>Do you have a question?</h1>

          <p>
            Do you want to connect with me about anything? You can just write
            the message here with your name, email, and subject. I would answer
            you as fast as possible.
          </p>
        </TopWrapper>

        <ContactForm />
      </Wrapper>

      <BottomWrapper>
        <AvatarWrapper>
          <Avatar fixed={data.avatarImg.fixed} />
        </AvatarWrapper>
        <div>
          <FollowTitle>You can also follow or contact me on</FollowTitle>
          <SocialFollow />
        </div>
      </BottomWrapper>
    </Root>
  </Layout>
)

export default Contact

export const query = graphql`
  query ContactQuery {
    avatarImg: imageSharp(original: { src: { regex: "/avatar/" } }) {
      fixed(width: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
