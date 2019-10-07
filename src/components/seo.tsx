import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

import siteConfig from '../../data/siteConfig'
import { SeoQuery } from '../../types/graphql-types'
import { constants } from '../utils/constants'
import { getSchemaOrgJSONLD } from '../utils/getSchemaOrgJSONLD'

interface IProps {
  url: string
  isBlogPost?: boolean
  postImage?: string
  postMeta?: {
    title: string
    date: string
    description: string
    tags: string[]
  }
  customTitle?: string
}

const SEO: React.FC<IProps> = ({
  postMeta,
  url,
  isBlogPost,
  postImage,
  customTitle,
}) => {
  return (
    <StaticQuery<SeoQuery> query={query}>
      {({ site }) => {
        const image = `${site && site.siteMetadata &&
          site.siteMetadata.siteUrl}${postImage || constants.image}`

        const description = isBlogPost
          ? postMeta && postMeta.description
          : siteConfig.site.description

        const title = isBlogPost
          ? postMeta && postMeta.title
          : customTitle || siteConfig.site.seoTitle

        const schemaOrgJSONLD = getSchemaOrgJSONLD({
          isBlogPost,
          url,
          title,
          image,
          description,
          datePublished: (postMeta && postMeta.date) || '',
          dateModified: (postMeta && postMeta.date) || '',
        })

        const keywords =
          isBlogPost && postMeta
            ? siteConfig.keywords.concat(',', String(postMeta.tags))
            : siteConfig.keywords
        return (
          <Helmet>
            <meta name="description" content={description} />
            <meta name="author" content={siteConfig.author} />
            {isBlogPost && (
              <meta
                itemProp="datePublished"
                content={postMeta && postMeta.date}
              />
            )}
            {isBlogPost && (
              <meta
                itemProp="dateModified"
                content={postMeta && postMeta.date}
              />
            )}

            {/* Schema.org tags */}
            <script type="application/ld+json">
              {JSON.stringify(schemaOrgJSONLD)}
            </script>

            {/* OpenGraph tags */}
            <meta property="og:url" content={url} />
            {isBlogPost && <meta property="og:type" content="article" />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:height" content="400" />
            <meta property="og:image:width" content="400" />
            <meta property="og:site_name" content={siteConfig.site.seoTitle} />
            <meta property="fb:app_id" content={siteConfig.fbAppID} />
            <meta itemProp="keywords" content={keywords} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:label1" content="Written by" />
            <meta name="twitter:data1" content={siteConfig.author} />
            <meta
              name="twitter:creator"
              content={`@${siteConfig.twitterHandler}`}
            />
            <meta
              name="twitter:site"
              content={`@${siteConfig.twitterHandler}`}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Google Verification tags */}
            <meta
              name="google-site-verification"
              content={siteConfig.googleVerification}
            />

            <title>{title}</title>
          </Helmet>
        )
      }}
    </StaticQuery>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
