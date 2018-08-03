import { graphql } from 'gatsby'
import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
import ProjectCard from '../components/project-card'
import RowTitle from '../components/row-title'
import SEO from '../components/seo'
import { IProject } from '../interfaces/Project'
import styled from '../utils/styled'

const TitleCard = styled('div')`
  ${tw('bg-white p-4 mb-8 rounded shadow')};
`

const PageTitle = styled('h1')`
  ${tw('text-grey-darker text-3xl tracking-wide mt-0')};
`

const PageDescription = styled('p')`
  ${tw('text-grey-dark text-base tracking-small m-0')};
`

const Root = styled('div')`
  ${tw('container mx-auto pb-10 sm:pb-0 w-full xl:w-3/4')};
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

const ProjectsPage: SFC<IProps> = ({ data }) => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/projects`} customTitle="Projects" />

    <Root>
      <TitleCard>
        <PageTitle>Projects</PageTitle>
        <PageDescription>
          Here a list of the projects I've worked on recently
        </PageDescription>
      </TitleCard>

      <RowTitle title="Librairies" />

      <Row>
        {data.libraries.edges.map(({ node }) => (
          <ProjectCard key={node.id} data={node} />
        ))}
      </Row>

      <RowTitle title="Applications" />

      <Row>
        {data.applications.edges.map(({ node }) => (
          <ProjectCard key={node.id} data={node} />
        ))}
      </Row>
    </Root>
  </Layout>
)

export default ProjectsPage

export const query = graphql`
  query ProjectsQuery {
    libraries: allProjectsYaml(filter: { type: { eq: "LIBRARY" } }) {
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

    applications: allProjectsYaml(filter: { type: { eq: "APP" } }) {
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
