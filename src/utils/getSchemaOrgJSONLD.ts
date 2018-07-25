import siteConfig from '../../data/siteConfig'
import { constants } from './constants'

interface IProps {
  isBlogPost?: boolean
  url: string
  title?: string
  image?: string
  datePublished: string
  dateModified: string
  description?: string
}

export const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  description,
  datePublished,
  image,
  dateModified,
}: IProps) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: siteConfig.site.title,
    },
  ]

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image: image || constants.image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: siteConfig.site.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image || constants.image,
          },
          description: description || siteConfig.site.description,
          author: {
            '@type': 'Person',
            name: siteConfig.author,
          },
          publisher: {
            '@type': 'Organization',
            url: siteConfig.site.url,
            name: siteConfig.site.url,
            logo: {
              '@type': 'ImageObject',
              name: 'EQuimper logo',
              width: '60',
              height: '600',
              url: constants.image,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': siteConfig.site.url,
          },
          datePublished,
          dateModified,
        },
      ]
    : schemaOrgJSONLD
}
