import React from 'react'
import Helmet from 'react-helmet'

import { constants } from '../utils/constants'

interface IProps {
  url: string
  isBlogPost?: boolean
  postImage?: string
  postMeta?: {
    title: string
    date: string
    description: string
  }
  customTitle?: string
}

const SEO = ({ postMeta, url, isBlogPost, postImage, customTitle }: IProps) => {
  const image = postImage || constants.image
  const description = isBlogPost
    ? postMeta && postMeta.description
    : constants.site.description

  const title = isBlogPost
    ? postMeta && postMeta.title
    : customTitle || constants.site.title

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="author" content={constants.author} />
      {isBlogPost && (
        <meta itemProp="datePublished" content={postMeta && postMeta.date} />
      )}
      {isBlogPost && (
        <meta itemProp="dateModified" content={postMeta && postMeta.date} />
      )}

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost && <meta property="og:type" content="article" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:height" content="300" />
      <meta property="og:image:width" content="400" />
      <meta property="og:site_name" content={constants.site.title} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:label1" content="Written by" />
      <meta name="twitter:data1" content={constants.author} />
      <meta name="twitter:creator" content={`@${constants.twitterUsername}`} />
      <meta name="twitter:site" content={`@${constants.twitterUsername}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
