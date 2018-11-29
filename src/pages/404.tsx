import React, { SFC } from 'react'

import NotFound from '../components/icons/not-found'
import Layout from '../components/layout'
import styled from '../utils/styled'

const Wrapper = styled('div')`
  ${tw('flex flex-col lg:flex-row align-center justify-center lg:justify-start pb-20 lg:pb-0')}
`

const TextWrapper = styled('div')`
  ${tw('flex flex-1 text-center lg:text-left align-center mb-4')};

  div {
    ${tw('w-full')};
  }

  h1 {
    ${tw('tracking-wide text-grey-darker font-bold')};
  }

  p {
    ${tw('leading-tight tracking-small text-grey-darker')};
  }
`

const IconWrapper = styled('div')`
  ${tw('flex flex-1 align-center justify-center')};
`

const NotFoundIcon = styled(NotFound)`
  ${tw('text-blue-dark h-64 lg:h-full')};

  width: 90%;
`

const NotFoundPage: SFC = () => (
  <Layout>
    <Wrapper>
      <IconWrapper>
        <NotFoundIcon />
      </IconWrapper>
      <TextWrapper>
        <div>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </TextWrapper>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
