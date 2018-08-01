import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import ContactForm from '../components/contact-form'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialFollow from '../components/social-follow'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-10 sm:pb-0 w-full xl:w-1/2')};
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
`

const Title = styled('h1')`
  ${tw('tracking-wide text-grey-darker font-bold text-2xl mt-0')};
`

const Message = styled('p')`
  ${tw('leading-tight tracking-small text-grey-darker')};
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
          <Title>Do you have a question?</Title>

          <Message>
            Do you want to connect with me about anything? You can just write
            the message here with your name, email, and subject. I would answer
            you as fast as possible.
          </Message>
        </TopWrapper>

        <ContactForm />
      </Wrapper>

      <BottomWrapper>
        <AvatarWrapper>
          <Avatar fixed={data.avatarImg.fixed} />
        </AvatarWrapper>
        <div>
          <Title>You can also follow or contact me on</Title>
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
