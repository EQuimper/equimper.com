import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import TextWithQuotes from '../commons/text-with-quotes'
import ContactForm from '../components/contact-form'
import ContactIcon from '../components/icons/contact'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialFollow from '../components/social-follow'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full xl:w-3/4')};
`

const Wrapper = styled('div')`
  ${tw('bg-white rounded shadow p-4 mb-8 flex flex-col sm:flex-row items-center sm:justify-between')};
`

const ContactWrapper = styled('div')`
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
  ${tw('mb-8 w-100 sm:w-2/3')};

  h1 {
    ${tw('tracking-wide text-grey-darker font-bold text-2xl mt-0')};
  }

  p {
    ${tw('leading-tight tracking-small text-grey-darker')};
  }
`

const ContactImgWrapper = styled('div')`
  ${tw('flex w-100 sm:w-1/3')}
`

const FollowTitle = styled(TextWithQuotes.withComponent('h3'))`
  ${tw('tracking-wide text-grey-darker font-bold text-xl mt-0')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

const ContactImg = styled(ContactIcon)`
  ${tw('text-blue-light')};

  width: 100%;
  height: 9.375em;
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
          <h1>Send me a message?</h1>

          <p>
            Do you want to connect with me about anything? You can just write
            the message here with your name, email, and subject. I would answer
            you as fast as possible.
          </p>
        </TopWrapper>
        <ContactImgWrapper>
        <ContactImg />
        </ContactImgWrapper>
      </Wrapper>
      <ContactWrapper>
        <ContactForm />
      </ContactWrapper>

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
