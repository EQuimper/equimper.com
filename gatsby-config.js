const siteConfig = require('./data/siteConfig')

module.exports = {
  siteMetadata: {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    siteUrl: siteConfig.site.url,
    author: siteConfig.author,
    keywords: siteConfig.keywords,
    lang: siteConfig.lang,
    twitterHandler: siteConfig.twitterHandler,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        enableIdentityWidget: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/data/comments`,
        name: 'comments',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/img`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteConfig.site.url,
        sitemap: `${siteConfig.site.url}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteConfig.site.url,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: siteConfig.gaId,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  url:
                    site.siteMetadata.siteUrl +
                    '/blog/' +
                    edge.node.fields.slug,
                  guid:
                    site.siteMetadata.siteUrl +
                    '/blog/' +
                    edge.node.fields.slug,
                  title: edge.node.frontmatter.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                  categories: edge.node.frontmatter.tags,
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        tags
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              height: 400,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-smartypants',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '±',
              aliases: {},
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'EQuimper | Programming Blog',
        short_name: 'EQuimper',
        start_url: '/',
        background_color: siteConfig.themeColor,
        theme_color: siteConfig.themeColor,
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify', // need to be last
  ],
}
