import { ThemeProvider } from 'emotion-theming'
import { graphql, StaticQuery } from 'gatsby'
import React, { SFC } from 'react'
import Helmet from 'react-helmet'

import Box from '../commons/Box'
import { theme } from '../utils/theme'
import Header from './header'
import './layout.css'

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

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
      <ThemeProvider theme={theme}>
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'This is my blog' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Box width={1 / 2}>{children}</Box>
        </>
      </ThemeProvider>
    )}
  </StaticQuery>
)

export default Layout
