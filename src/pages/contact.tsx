import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { constants } from '../utils/constants'

const Contact = () => (
  <Layout>
    <SEO url={`${constants.site.url}/contact`} customTitle="Contact Me" />
    <h1>Contact Me</h1>
  </Layout>
)

export default Contact
