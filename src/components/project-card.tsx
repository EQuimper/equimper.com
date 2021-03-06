import React, { SFC } from 'react'

import TextWithQuotes from '../commons/text-with-quotes'
import { IProject } from '../interfaces/Project'
import { animationFromY } from '../utils/animations'
import styled from '../utils/styled'

const TitleWrapper = styled('div')`
  ${tw('mb-4')};
`

const Description = styled('p')`
  ${tw('text-grey-dark text-base tracking-small m-0')};
`

const Text = styled(TextWithQuotes.withComponent('p'))`
  ${tw('text-grey-dark text-base tracking-small m-0 mt-6')};
`

const Title = styled('a')`
  ${tw(
    'text-grey-darkest no-underline font-bold tracking-wide text-2xl hover:underline mt-0'
  )};
`

const AppAndFlow = styled('a')`
  ${tw('text-blue-dark no-underline text-sm m-0 font-bold')};

  box-shadow: inset 0 -0.5em 0 var(--hightlighter);
  transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: inset 0 -1.2em 0 var(--hightlighter);
  }
`

const Root = styled('div')`
  ${tw('bg-white rounded shadow p-4 mb-4')};
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
  data: IProject
  style?: {
    opacity: number
    y: any
  }
  withAnimation?: boolean
}

const ProjectCard: SFC<IProps> = ({ data, withAnimation = false, style }) => (
  <Root style={animationFromY(style, withAnimation)}>
    <TitleWrapper>
      <Title
        href={data.repo || data.url || ''}
        aria-label={`${data.title} link`}
        rel="noreferrer"
        target="_blank"
      >
        {data.title}
      </Title>
    </TitleWrapper>
    {data.author === 'AppAndFlow' && (
      <AppAndFlow
        aria-label="AppAndFlow link"
        rel="noreferrer"
        target="_blank"
        href="https://appandflow.com"
      >
        Made at AppAndFlow
      </AppAndFlow>
    )}
    <TechsWrapper>
      {data.techs.map(tech => (
        <TagWrapper key={tech}>
          <Tag>{tech}</Tag>
        </TagWrapper>
      ))}
    </TechsWrapper>
    <Description>{data.description}</Description>

    {data.text && <Text>{data.text}</Text>}
  </Root>
)

export default ProjectCard
