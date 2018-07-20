import { injectGlobal } from 'emotion'
import { graphql, StaticQuery } from 'gatsby'
import React, { SFC } from 'react'
import Helmet from 'react-helmet'

// tslint:disable-next-line:no-submodule-imports
import 'prismjs/themes/prism-solarizedlight.css'

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

  :root {
    --primary: #2779bd;
    --grey-dark: #8795a1;
    --grey-darkest: #3d4852;
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
    color: var(--grey-darkest);
  }

  .md-content > p > a, .md-content > ol > li > a, .md-content > ul > li > a {
    color: var(--grey-dark);
    font-style: oblique;
    text-decoration: none;
    box-shadow: inset 0 -0.2em 0 var(--primary);
    transition: box-shadow .3s ease-in-out,-webkit-box-shadow .3s ease-in-out;
  }

  .md-content > p > a:hover {
    box-shadow: inset 0 -1.2em 0 var(--primary);
    color: #fff;
  }

  .md-content > p > img {
    width: 80%;
    margin: 30px 0;
  }

  .md-content > ul {
    list-style-type: circle;
  }

  .md-content > ul > li, .md-content > ul > li > a {
    line-height: 1.5;
  }

  .md-content > h1, h2, h3, h4, h5, .md-content > h3 > a {
    margin: 30px 0;
    color: var(--grey-darkest);
    letter-spacing: 0.05em;
  }

  .gatsby-resp-iframe-wrapper {
    margin: 50px 0;
  }

  .md-content > p > code.language-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
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
