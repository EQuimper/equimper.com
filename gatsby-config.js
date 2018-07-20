module.exports = {
  siteMetadata: {
    title: '<EQuimper />;',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
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
        name: 'posts',
        path: `${__dirname}/posts`,
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
        name: 'EQuimper | Programming blog',
        short_name: 'EQuimper',
        start_url: '/',
        background_color: '#2779bd',
        theme_color: '#2779bd',
        display: 'minimal-ui'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify' // need to be last
  ],
}
