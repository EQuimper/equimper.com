import { graphql, StaticQuery } from 'gatsby'
import React, { SFC } from 'react'
import Helmet from 'react-helmet'

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
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'This is my blog' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </>
    )}
  </StaticQuery>
)

export default Layout
