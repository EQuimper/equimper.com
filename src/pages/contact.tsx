import React from 'react'

import siteConfig from '../../data/siteConfig'
import ContactForm from '../components/contact-form'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('container mx-auto pb-10 sm:pb-0 w-full xl:w-1/2')};
`

const Wrapper = styled('div')`
  ${tw('bg-white rounded shadow p-4')};
`

const TopWrapper = styled('div')`
  ${tw('mb-8')};
`

const Title = styled('h1')`
  ${tw('leading-tight tracking-wide text-grey-darker font-bold text-2xl mt-0')};
`

const Message = styled('p')`
  ${tw('leading-tight tracking-small text-grey-darker')};
`

const Contact = () => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/contact`} customTitle="Contact Me" />

    <Root>
      <Wrapper>
        <TopWrapper>
          <Title>Do you have a question?</Title>

          <Message>
            You want to connect with me about anything? You can just wrote a
            message here with your name, email and subject. I would answer you
            when as fast as possible.
          </Message>
        </TopWrapper>

        <ContactForm />
      </Wrapper>
    </Root>
  </Layout>
)

export default Contact
