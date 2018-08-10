import { graphql } from 'gatsby'
import React, { SFC } from 'react'
import { Trail } from 'react-spring'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import ProjectCard from '../components/project-card'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import { IProject } from '../interfaces/Project'
import styled from '../utils/styled'

const TitleCard = styled('div')`
  ${tw('bg-white p-4 mb-8 rounded shadow')};

  h1 {
    ${tw('text-grey-darker text-3xl tracking-wide mt-0')};
  }

  p {
    ${tw('text-grey-dark text-base tracking-small m-0')};
  }
`

const Root = styled('div')`
  ${tw('container mx-auto pb-20 sm:pb-0 w-full xl:w-3/4')};
`

const Row = styled('div')`
  ${tw('mb-8')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 1em;
`

interface IProps {
  data: {
    libraries: {
      edges: Array<{
        node: IProject
      }>
    }
    applications: {
      edges: Array<{
        node: IProject
      }>
    }
  }
}

const animOpts = {
  from: { opacity: 0, y: 100 },
  to: { opacity: 1, y: 0 },
}

const ProjectsPage: SFC<IProps> = ({ data }) => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/projects`} customTitle="Projects" />

    <Root>
      <TitleCard>
        <h1>Projects</h1>
        <p>Here a list of the projects I've worked on recently</p>
      </TitleCard>

      <RowTitle title="Librairies" />

      <Row>
        <Trail
          {...animOpts}
          native
          keys={data.libraries.edges.map(({ node }) => node.id)}
        >
          {data.libraries.edges.map(({ node }) => (styles: any) => (
            <ProjectCard
              withAnimation
              style={styles}
              key={node.id}
              data={node}
            />
          ))}
        </Trail>
      </Row>

      <RowTitle title="Applications" />

      <Row>
        <Trail
          {...animOpts}
          native
          keys={data.applications.edges.map(({ node }) => node.id)}
        >
          {data.applications.edges.map(({ node }) => (styles: any) => (
            <ProjectCard
              withAnimation
              style={styles}
              key={node.id}
              data={node}
            />
          ))}
        </Trail>
      </Row>
    </Root>
  </Layout>
)

export default ProjectsPage

export const query = graphql`
  query ProjectsQuery {
    libraries: allProjectsYaml(
      filter: { type: { eq: "LIBRARY" } }
      sort: { fields: order, order: ASC }
    ) {
      edges {
        node {
          id
          title
          text
          description
          url
          type
          techs
          repo
          author
        }
      }
    }

    applications: allProjectsYaml(
      filter: { type: { eq: "APP" } }
      sort: { fields: order, order: ASC }
    ) {
      edges {
        node {
          id
          title
          description
          url
          type
          techs
          author
        }
      }
    }
  }
`
