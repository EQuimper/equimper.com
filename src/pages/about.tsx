import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage: SFC = () => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/about`} customTitle="About" />
    <h1>About me</h1>
  </Layout>
)

export default AboutPage
