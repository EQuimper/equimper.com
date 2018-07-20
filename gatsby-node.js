const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

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

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `blog/${node.fields.slug}`,
          component: path.resolve(`./src/templates/blog-post.tsx`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}
