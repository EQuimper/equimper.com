import React from 'react'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Contact = () => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/contact`} customTitle="Contact Me" />
    <h1>Contact Me</h1>
  </Layout>
)

export default Contact
