import { graphql } from 'gatsby'
import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig'
import Layout from '../components/layout'
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

const ProjectTitleWrapper = styled('div')`
  ${tw('mb-4')};
`

const PageDescription = styled('p')`
  ${tw('text-grey-dark text-base tracking-small m-0')};
`

const Root = styled('div')`
  ${tw('container mx-auto pb-10 sm:pb-0 w-full xl:w-3/4')};
`

const ProjectTitle = styled('a')`
  ${tw(
    'text-grey-darkest no-underline font-bold tracking-wide text-2xl hover:underline mt-0'
  )};
`

const AppAndFlow = styled('a')`
  ${tw('text-grey-dark no-underline hover:underline text-xs m-0')};
`

const ProjectCard = styled('div')`
  ${tw('bg-white rounded shadow p-4 mb-4')};
`

const Row = styled('div')`
  ${tw('mb-8')};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 1em;
`

const TechsWrapper = styled('ul')`
  ${tw('list-reset flex flex-wrap items-center')};
`

const TagWrapper = styled('li')`
  ${tw('mr-4')};
`

const Tag = styled('p')`
  ${tw(
    'no-underline lowercase text-sm bg-grey-lighter rounded p-2 text-black tracking-small'
  )};
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
          Here a list of the current projects I've worked on recently
        </PageDescription>
      </TitleCard>

      <RowTitle title="Librairies" />

      <Row>
        {data.libraries.edges.map(({ node }) => (
          <ProjectCard key={node.id}>
            <ProjectTitle
              aria-label="Github repos link"
              rel="noreferrer"
              target="_blank"
              href={node.repo}
            >
              {node.title}
            </ProjectTitle>
            <TechsWrapper>
              {node.techs.map(tech => (
                <TagWrapper key={tech}>
                  <Tag>{tech}</Tag>
                </TagWrapper>
              ))}
            </TechsWrapper>
            <PageDescription>{node.description}</PageDescription>
            <PageDescription>{node.text}</PageDescription>
          </ProjectCard>
        ))}
      </Row>

      <RowTitle title="Applications" />

      <Row>
        {data.applications.edges.map(({ node }) => (
          <ProjectCard key={node.id}>
            <ProjectTitleWrapper>
              <ProjectTitle
                href={node.url}
                aria-label={`${node.title} link`}
                rel="noreferrer"
                target="_blank"
              >
                {node.title}
              </ProjectTitle>
            </ProjectTitleWrapper>
            <AppAndFlow href="https://appandflow.com">
              Made at AppAndFlow
            </AppAndFlow>
            <TechsWrapper>
              {node.techs.map(tech => (
                <TagWrapper key={tech}>
                  <Tag>{tech}</Tag>
                </TagWrapper>
              ))}
            </TechsWrapper>
            <PageDescription>{node.description}</PageDescription>
          </ProjectCard>
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
        }
      }
    }
  }
`
