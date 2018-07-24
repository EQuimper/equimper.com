require('dotenv').config()
const {
  createFilePath,
  createRemoteFileNode,
} = require('gatsby-source-filesystem')
const path = require('path')
const axios = require('axios')
const get = require('lodash.get')
const uniq = require('lodash.uniq')
const kebabCase = require('lodash.kebabcase')
const crypto = require('crypto')
const createPaginatedPages = require('gatsby-paginate')

const digest = str =>
  crypto
    .createHash(`md5`)
    .update(str)
    .digest(`hex`)

exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({ name: 'babel-plugin-tailwind' })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)

    const parsedFilePath = path.parse(fileNode.relativePath)

    const { createNodeField } = actions

    createNodeField({
      node,
      name: 'slug',
      value: parsedFilePath.name,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve('./src/templates/blog-post.tsx')
  const tagTemplate = path.resolve('./src/templates/tags.tsx')

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      const posts = result.data.allMarkdownRemark.edges
      // Blog Post
      createPaginatedPages({
        edges: posts,
        createPage,
        pageTemplate: './src/templates/blog.tsx',
        pageLength: 5,
        pathPrefix: 'blog',
        context: {},
      })
      posts.forEach(({ node }) => {
        createPage({
          path: `blog/${node.fields.slug}`,
          component: blogPostTemplate,
          context: {
            slug: node.fields.slug,
          },
        })
      })

      // Tags
      let tags = []
      posts.forEach(edge => {
        if (get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })

      tags = uniq(tags)

      tags.forEach(tag => {
        createPage({
          path: `tags/${kebabCase(tag)}`,
          component: tagTemplate,
          context: {
            tag,
          },
        })
      })

      resolve()
    })
  })
}

const getYoutubeApi = () => {
  const rateLimit = 500
  let lastCalled = null

  const rateLimiter = call => {
    const now = Date.now()
    if (lastCalled) {
      lastCalled += rateLimit
      const wait = lastCalled - now
      if (wait > 0) {
        return new Promise(resolve => setTimeout(() => resolve(call), wait))
      }
    }
    lastCalled = now
    return call
  }

  const api = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
  })

  api.interceptors.request.use(rateLimiter)

  return api
}

const downloadThumbnails = async ({ items, store, cache, createNode }) =>
  Promise.all(
    items.map(async item => {
      let fileNode
      if (item.thumbnail && item.thumbnail.url) {
        try {
          fileNode = await createRemoteFileNode({
            url: item.thumbnail.url,
            store,
            cache,
            createNode,
          })
        } catch (error) {
          console.error(error)
          process.exit(1)
        }
      }

      if (fileNode) {
        item.localThumbnail___NODE = fileNode.id
      }

      return item
    })
  )

const createVideoNode = (videos, createNode) => {
  videos.forEach(video => {
    createNode({
      ...video,
      parent: null,
      children: [],
      internal: {
        type: 'YoutubeVideo',
        contentDigest: digest(JSON.stringify(video)),
      },
    })
  })
}

exports.sourceNodes = async ({ actions, store, cache }) => {
  const { createNode } = actions
  const CHANNEL_ID = 'UC7R7bcH9-KEBDiGNP1mZnmw'
  const API_KEY = process.env.YOUTUBE_API_KEY
  const MAX_VIDEOS = 10

  const youtubeApi = getYoutubeApi()

  try {
    const channelResp = await youtubeApi.get(
      `channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    )

    const channelData = channelResp.data.items[0]

    if (channelData) {
      const uploadsId = get(
        channelData,
        'contentDetails.relatedPlaylists.uploads'
      )

      let videos = []
      let pageSize = MAX_VIDEOS

      let videoResp = await youtubeApi.get(
        `playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=${pageSize}&playlistId=${uploadsId}&key=${API_KEY}`
      )
      videos.push(...videoResp.data.items)

      while (videoResp.data.nextPageToken && videos.length < MAX_VIDEOS) {
        pageSize = MAX_VIDEOS - videos.length
        let nextPageToken = videoResp.data.nextPageToken
        videoResp = await youtubeApi.get(
          `playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=${pageSize}&pageToken=${nextPageToken}&playlistId=${uploadsId}&key=${API_KEY}`
        )
        videos.push(...videoResp.data.items)
      }

      videos = videos.map(video => ({
        publishedAt: get(video, 'snippet.publishedAt'),
        title: get(video, 'snippet.title'),
        description: get(video, 'snippet.description'),
        id: get(video, 'contentDetails.videoId'),
        channelTitle: get(video, 'snippet.channelTitle'),
        thumbnail: get(
          video,
          'snippet.thumbnails.maxres',
          get(
            video,
            'snippet.thumbnails.standard',
            get(
              video,
              'snippet.thumbnails.high',
              get(
                video,
                'snippet.thumbnails.medium',
                get(video, 'snippet.thumbnails.default')
              )
            )
          )
        ),
      }))

      videos = await downloadThumbnails({
        items: videos,
        store,
        cache,
        createNode,
      })

      createVideoNode(videos, createNode)
    }

    return
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
