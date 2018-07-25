import React, { SFC } from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { constants } from '../utils/constants'

const AboutPage: SFC = () => (
  <Layout>
    <SEO url={`${constants.site.url}/about`} customTitle="About" />
    <h1>About me</h1>
  </Layout>
)

export default AboutPage
