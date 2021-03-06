import { graphql } from 'gatsby'
import React from 'react'

import siteConfig from '../../data/siteConfig'
import ProjectsIcon from '../components/icons/projects'
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
  ${tw('container mx-auto pb-20 sm:pb-0 w-full lg:w-3/4 2xl:w-1/2')};
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

const ProjectsImgWrapper = styled('div')`
  ${tw('w-100 flex align-center justify-center')};
`

const ProjectsImg = styled(ProjectsIcon)`
  ${tw('text-blue-light')};

  width: 100%;
  height: 21.875em;
`

const TitleTopWrapper = styled('div')`
  ${tw('mb-4')};
`

const animOpts = {
  from: { opacity: 0, y: 100 },
  to: { opacity: 1, y: 0 },
}

const ProjectsPage: React.FC<IProps> = ({ data }) => (
  <Layout>
    <SEO url={`${siteConfig.site.url}/projects`} customTitle="Projects" />

    <Root>
      <TitleCard>
        <TitleTopWrapper>
          <h1>Projects</h1>
          <p>Here a list of the projects I've worked on recently</p>
        </TitleTopWrapper>
        <ProjectsImgWrapper>
          <ProjectsImg />
        </ProjectsImgWrapper>
      </TitleCard>

      <RowTitle title="Librairies" />

      <Row>
        {data.libraries.edges.map(({ node }) => (
          <ProjectCard withAnimation key={node.id} data={node} />
        ))}
      </Row>

      <RowTitle title="Applications" />

      <Row>
        {data.applications.edges.map(({ node }) => (
          <ProjectCard withAnimation key={node.id} data={node} />
        ))}
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
      sort: { fields: order, order: DESC }
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
