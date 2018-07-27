import { injectGlobal } from 'emotion'
import { ThemeProvider } from 'emotion-theming'
import { graphql, StaticQuery } from 'gatsby'
import React, { SFC } from 'react'
import Helmet from 'react-helmet'

// tslint:disable-next-line:no-submodule-imports
import 'prismjs/themes/prism-solarizedlight.css'
import 'typeface-cormorant-garamond'
import 'typeface-lato'

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
    --primary: #cefc86;
    --secondary: #00fff0;
    --grey-dark: #8795a1;
    --grey-darkest: #3d4852;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Lato;
    position: relative;
  }

  .md-content > p {
    line-height: 1.5;
  }

  .md-content > p > strong {
    color: var(--grey-darkest);
  }

  .md-content > p > a, .md-content > ol > li > a, .md-content > ul > li > a {
    font-style: oblique;
    color: var(--grey-darkest);
    text-decoration: none;
    box-shadow: inset 0 -0.5em 0 var(--primary);
    transition: box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
  }

  .md-content > p > a:hover, .md-content > ol > li > a:hover, .md-content > ul > li > a:hover {
    box-shadow: inset 0 -1.2em 0 var(--secondary);
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
    background-color: #f3f7f9;
  }

  .sk-circle {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .sk-circle > div {
    background-color: initial;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .sk-circle > div::before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 20%;
    height: 20%;
    background-color: var(--secondary);
    border-radius: 100%;

    -webkit-animation: sk-bouncedelay 1.2s infinite ease-in-out;
    animation: sk-bouncedelay 1.2s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .sk-circle > div:nth-child(2)  { -webkit-transform: rotate(30deg);  transform: rotate(30deg)  }
  .sk-circle > div:nth-child(3)  { -webkit-transform: rotate(60deg);  transform: rotate(60deg)  }
  .sk-circle > div:nth-child(4)  { -webkit-transform: rotate(90deg);  transform: rotate(90deg)  }
  .sk-circle > div:nth-child(5)  { -webkit-transform: rotate(120deg); transform: rotate(120deg) }
  .sk-circle > div:nth-child(6)  { -webkit-transform: rotate(150deg); transform: rotate(150deg) }
  .sk-circle > div:nth-child(7)  { -webkit-transform: rotate(180deg); transform: rotate(180deg) }
  .sk-circle > div:nth-child(8)  { -webkit-transform: rotate(210deg); transform: rotate(210deg) }
  .sk-circle > div:nth-child(9)  { -webkit-transform: rotate(240deg); transform: rotate(240deg) }
  .sk-circle > div:nth-child(10) { -webkit-transform: rotate(270deg); transform: rotate(270deg) }
  .sk-circle > div:nth-child(11) { -webkit-transform: rotate(300deg); transform: rotate(300deg) }
  .sk-circle > div:nth-child(12) { -webkit-transform: rotate(330deg); transform: rotate(330deg) }

  .sk-circle > div:nth-child(2)::before  { -webkit-animation-delay: -1.1s; animation-delay: -1.1s }
  .sk-circle > div:nth-child(3)::before  { -webkit-animation-delay: -1.0s; animation-delay: -1.0s }
  .sk-circle > div:nth-child(4)::before  { -webkit-animation-delay: -0.9s; animation-delay: -0.9s }
  .sk-circle > div:nth-child(5)::before  { -webkit-animation-delay: -0.8s; animation-delay: -0.8s }
  .sk-circle > div:nth-child(6)::before  { -webkit-animation-delay: -0.7s; animation-delay: -0.7s }
  .sk-circle > div:nth-child(7)::before  { -webkit-animation-delay: -0.6s; animation-delay: -0.6s }
  .sk-circle > div:nth-child(8)::before  { -webkit-animation-delay: -0.5s; animation-delay: -0.5s }
  .sk-circle > div:nth-child(9)::before  { -webkit-animation-delay: -0.4s; animation-delay: -0.4s }
  .sk-circle > div:nth-child(10)::before { -webkit-animation-delay: -0.3s; animation-delay: -0.3s }
  .sk-circle > div:nth-child(11)::before { -webkit-animation-delay: -0.2s; animation-delay: -0.2s }
  .sk-circle > div:nth-child(12)::before { -webkit-animation-delay: -0.1s; animation-delay: -0.1s }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0.0);
      transform: scale(0.0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }

  .twitter-tweet.twitter-tweet-rendered {
    margin: 30px auto;
  }

  .headroom--unfixed > header > nav {
    background: #fff;
  }
`

const Body = styled('div')`
  ${tw('bg-grey-lighter font-sans antialiased min-h-screen relative pb-20')};
`

const Root = styled('div')`
  ${tw('container mx-auto pt-10 pb-20 sm:py-10 px-4')};
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
    // tslint:disable-next-line:jsx-no-lambda
    render={(data: IndexPageData) => (
      <ThemeProvider theme={theme}>
        <Body>
          <Helmet titleTemplate="%s · <EQuimper />" defaultTitle="<EQuimper />">
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </Helmet>
          <html lang="en" />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Root>{children}</Root>
          <Footer siteTitle={data.site.siteMetadata.title} />
        </Body>
      </ThemeProvider>
    )}
  />
)

export default Layout
