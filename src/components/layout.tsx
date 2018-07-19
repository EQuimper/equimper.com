import { injectGlobal } from 'emotion'
import { graphql, StaticQuery } from 'gatsby'
import React, { SFC } from 'react'
import Helmet from 'react-helmet'

import styled from '../utils/styled'
import { theme } from '../utils/theme'
import Footer from './footer'
import Header from './header'

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`

const Body = styled('div')`
  ${tw('bg-grey-lighter font-sans antialiased min-h-screen relative')};
`

const Root = styled('div')`
  ${tw('container mx-auto py-10 px-6')};
`

const Layout: SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
  >
    {(data: IndexPageData) => (
      <Body>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'This is my blog' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Root>{children}</Root>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </Body>
    )}
  </StaticQuery>
)

export default Layout
