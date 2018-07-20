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
    font-family: Lato;
  }

  .md-content > p {
    line-height: 1.5;
  }

  .md-content > p > strong {
    color: #3d4852;
  }

  .md-content > p > a {
    color: #b8c2cc;
    text-decoration: none;
    /* border-bottom: 2px solid #f73859; */
    box-shadow: inset 0 -0.2em 0 #f73859;
    transition: box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
  }

  .md-content > p > a:hover {
    box-shadow: inset 0 -1.2em 0 #f73859;
    color: #fff;
  }

  .md-content > h1, h2, h3, h4, h5 {
    margin: 30px 0;
    color: #3d4852;
    letter-spacing: 0.05em;
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
