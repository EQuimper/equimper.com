import { css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { graphql, StaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import Helmet from 'react-helmet'



// tslint:disable-next-line
import 'typeface-cormorant-garamond'
import 'typeface-inter'
import 'typeface-shadows-into-light'

import '../assets/language_tabs.css'
import styled from '../utils/styled'
import { theme } from '../utils/theme'
import Footer from './footer'
import Header from './header'
import PageTransition from './page-transition'
import ScrollingProgress from './scrolling-progress'
import MdxComponents from './mdx';

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const Body = styled('div')`
  ${tw('bg-grey-lighter font-sans antialiased min-h-screen relative pb-20')};
`

const Root = styled('div')`
  ${tw('container mx-auto pt-10 pb-20 sm:py-10 px-2')};
`

interface IProps {
  showProgress?: boolean
}

const Layout: React.FC<IProps> = ({ children, showProgress }) => (
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
        <>
          <Global
            styles={css`
              * {
                box-sizing: border-box;
              }

              :root {
                --primary: #cefc86;
                --secondary: #00fff0;
                --grey-dark: #8795a1;
                --grey: #b8c2cc;
                --grey-darkest: #3d4852;
                --grey-lighter: #f3f7f9;
                --green: #38c172;
                --hightlighter: #fff5c4;
                --blue-dark: #2779bd;
              }

              @media screen and (min-width: 576px) {
                html {
                  width: 100vw;
                  overflow-x: hidden;
                }
              }

              body {
                margin: 0;
                padding: 0;
                height: 100%;
                font-family: 'Inter', sans-serif;
                position: relative;
              }

              .md-content > p {
                line-height: 1.5;
                letter-spacing: 0.01em;
              }

              .md-content > p > strong {
                color: var(--grey-darkest);
              }

              .md-content > p > a,
              .md-content > ol > li > a,
              .md-content > ul > li > a {
                text-decoration: none;
                box-shadow: inset 0 -0.5em 0 var(--hightlighter);
                transition: box-shadow 0.2s ease-in-out,
                  -webkit-box-shadow 0.2s ease-in-out;
                font-weight: 700;
                color: var(--blue-dark);
              }

              .md-content > p > a:hover,
              .md-content > ol > li > a:hover,
              .md-content > ul > li > a:hover {
                box-shadow: inset 0 -1.2em 0 var(--hightlighter);
              }

              .md-content > p > img {
                width: 100%;
                margin: 30px 0;
              }

              .md-content > ul {
                list-style-type: circle;
              }

              .md-content > ul > li,
              .md-content > ul > li > a {
                line-height: 1.5;
                letter-spacing: 0.01em;
              }

              .md-content > h1,
              .md-content > h2,
              .md-content > h3,
              .md-content > h4,
              .md-content > h5,
              .md-content > h3 > a {
                margin: 30px 0;
                color: var(--grey-darkest);
                letter-spacing: 0.05em;
              }

              .md-content > blockquote {
                /* border: 4px solid var(--secondary);
    color: var(--secondary); */
                border: 4px solid var(--blue-dark);
                color: var(--blue-dark);
                transform: rotate(-3deg);
                padding: 16px 32px;
                max-width: 80%;
                font-family: Shadows Into Light, cursive;
                font-size: 32px;
                margin-top: 64px;
                margin-bottom: 64px;
              }

              @media (max-width: 576px) {
                .md-content > blockquote {
                  max-width: 100%;
                }
              }

              .gatsby-resp-iframe-wrapper {
                margin: 50px 0;
              }

              .md-content > p > code.language-text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                background-color: #011627;
                color: #fff;
                border-radius: 2px;
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
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
              }

              .sk-circle > div:nth-of-type(2) {
                -webkit-transform: rotate(30deg);
                transform: rotate(30deg);
              }
              .sk-circle > div:nth-of-type(3) {
                -webkit-transform: rotate(60deg);
                transform: rotate(60deg);
              }
              .sk-circle > div:nth-of-type(4) {
                -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
              }
              .sk-circle > div:nth-of-type(5) {
                -webkit-transform: rotate(120deg);
                transform: rotate(120deg);
              }
              .sk-circle > div:nth-of-type(6) {
                -webkit-transform: rotate(150deg);
                transform: rotate(150deg);
              }
              .sk-circle > div:nth-of-type(7) {
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
              }
              .sk-circle > div:nth-of-type(8) {
                -webkit-transform: rotate(210deg);
                transform: rotate(210deg);
              }
              .sk-circle > div:nth-of-type(9) {
                -webkit-transform: rotate(240deg);
                transform: rotate(240deg);
              }
              .sk-circle > div:nth-of-type(10) {
                -webkit-transform: rotate(270deg);
                transform: rotate(270deg);
              }
              .sk-circle > div:nth-of-type(11) {
                -webkit-transform: rotate(300deg);
                transform: rotate(300deg);
              }
              .sk-circle > div:nth-of-type(12) {
                -webkit-transform: rotate(330deg);
                transform: rotate(330deg);
              }

              .sk-circle > div:nth-of-type(2)::before {
                -webkit-animation-delay: -1.1s;
                animation-delay: -1.1s;
              }
              .sk-circle > div:nth-of-type(3)::before {
                -webkit-animation-delay: -1s;
                animation-delay: -1s;
              }
              .sk-circle > div:nth-of-type(4)::before {
                -webkit-animation-delay: -0.9s;
                animation-delay: -0.9s;
              }
              .sk-circle > div:nth-of-type(5)::before {
                -webkit-animation-delay: -0.8s;
                animation-delay: -0.8s;
              }
              .sk-circle > div:nth-of-type(6)::before {
                -webkit-animation-delay: -0.7s;
                animation-delay: -0.7s;
              }
              .sk-circle > div:nth-of-type(7)::before {
                -webkit-animation-delay: -0.6s;
                animation-delay: -0.6s;
              }
              .sk-circle > div:nth-of-type(8)::before {
                -webkit-animation-delay: -0.5s;
                animation-delay: -0.5s;
              }
              .sk-circle > div:nth-of-type(9)::before {
                -webkit-animation-delay: -0.4s;
                animation-delay: -0.4s;
              }
              .sk-circle > div:nth-of-type(10)::before {
                -webkit-animation-delay: -0.3s;
                animation-delay: -0.3s;
              }
              .sk-circle > div:nth-of-type(11)::before {
                -webkit-animation-delay: -0.2s;
                animation-delay: -0.2s;
              }
              .sk-circle > div:nth-of-type(12)::before {
                -webkit-animation-delay: -0.1s;
                animation-delay: -0.1s;
              }

              @-webkit-keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                  -webkit-transform: scale(0);
                }
                40% {
                  -webkit-transform: scale(1);
                }
              }

              @keyframes sk-bouncedelay {
                0%,
                80%,
                100% {
                  -webkit-transform: scale(0);
                  transform: scale(0);
                }
                40% {
                  -webkit-transform: scale(1);
                  transform: scale(1);
                }
              }

              .twitter-tweet.twitter-tweet-rendered {
                margin: 30px auto;
              }

              .headroom--unfixed > header > nav {
                background: #fff;
              }

              .stop-scrolling {
                overflow: hidden;
              }

              /* Checkbox */
              .control:hover input ~ .control__indicator,
              .control input:focus ~ .control__indicator {
                background: var(--grey-lighter);
              }

              .control input:checked ~ .control__indicator {
              }

              .control:hover
                input:not([disabled]):checked
                ~ .control__indicator,
              .control input:checked:focus ~ .control__indicator {
                background: var(--secondary);
              }

              .control input:disabled ~ .control__indicator {
                pointer-events: none;
                background: var(--grey-lighter);
              }

              .control__indicator:after {
                position: absolute;
                display: none;
                content: '';
              }

              .control input:checked ~ .control__indicator:after {
                display: block;
              }

              .control--checkbox .control__indicator:after {
                top: 4px;
                left: 8px;
                width: 3px;
                height: 8px;
                transform: rotate(45deg);
                border: solid #fff;
                border-width: 0 2px 2px 0;
              }

              .control--checkbox input:disabled ~ .control__indicator:after {
                border-color: #7b7b7b;
              }

              .control__indicator {
                position: absolute;
                top: 2px;
                left: 0;
                width: 20px;
                height: 20px;
              }

              .control {
                font-size: 18px;
                position: relative;
                display: block;
                margin-bottom: 15px;
                padding-left: 30px;
                cursor: pointer;
              }

              .control input {
                position: absolute;
                z-index: -1;
                opacity: 0;
              }

               code {
                padding: 2px 8px;
                background: var(--hightlighter);
                color: #011627;
                border-radius: 3px;
                font-size: 16px;
              }

              pre {
                a {
                  color: var(--secondary);
                }
              }

              .highlight-line {
                background-color: rgba(0, 255, 240, 0.1);
                /* This is need so the line number are all align even if we do get a border left */
                margin: 0 -10px;
                padding: 0 0 0 5px;
                border-left: 5px solid var(--secondary);
              }

              pre {
                background-color: #061526 !important;
                border-radius: 4px;
                font-size: 1.2rem;
                line-height: 20px;
                overflow-x: auto;
                position: relative;
                margin: 5px 0;

                /* Track */
                ::-webkit-scrollbar {
                  width: 100%;
                  height: 3px;
                  border-radius: 0 0 4px 4px;
                }
                ::-webkit-scrollbar-track {
                  background: #061526;
                  border-radius: 0 0 4px 4px;
                  border: 1px solid rgba(0, 0, 0, 0.2);
                }
                /* Handle */
                ::-webkit-scrollbar-thumb {
                  background: #061526;
                  border-radius: 4px;
                }
              }

              .typed-cursor {
                font-weight: 400;
              }

              ::-webkit-scrollbar {
                width: 0.4em;
              }

              ::-webkit-scrollbar-track {
                background-color: #06152630;
                border-radius: 4px;
              }

              ::-webkit-scrollbar-thumb {
                background: #061526;
                border-radius: 4px;
              }
            `}
          />
          <Body>
            {/*
            // @ts-ignore */}
            <Helmet
              titleTemplate="%s · <EQuimper />"
              defaultTitle="<EQuimper />"
            >
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
              <noscript>{`<h1>Plz yurn on JavaScript</h1>`}</noscript>
            </Helmet>
            <html lang="en" />
            <ScrollingProgress showProgress={!!showProgress} />
            <Header siteTitle={data.site.siteMetadata.title} />
            <PageTransition>
              <Root>
                <MDXProvider components={MdxComponents}>{children}</MDXProvider>
              </Root>
            </PageTransition>
            <Footer siteTitle={data.site.siteMetadata.title} />
          </Body>
        </>
      </ThemeProvider>
    )}
  />
)

export default Layout
