import React from 'react'

import { IComment } from '../interfaces/Comment'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('mt-10')};
`

const Title = styled('h3')`
  ${tw('text-grey-darker')};
`

const Comment = styled('div')`
  ${tw(
    'bg-white p-4 mb-4 flex flex-row items-center rounded cursor-pointer shadow relative'
  )};
`

const MetaWrapper = styled('div')`
  ${tw('w-1/4')};
`

const ContentWrapper = styled('div')`
  ${tw('w-3/4')};
`

const ReplyWrapper = styled('div')`
  ${tw('absolute pin-t pin-r')};
`

const Reply = styled('button')`
  ${tw(
    'text-grey hover:text-grey-darker p-4 cursor-pointer appearance-none border-0'
  )};
`

const Author = styled('h4')`
  ${tw('text-grey-darker font-bold m-0')};
`

const Date = styled('p')`
  ${tw('text-grey text-sm')};
`

interface IProps {
  comments: Array<{
    node: IComment
  }>
}

const commentText = (num: number) => (num > 1 ? 'Comments' : 'Comment')

const CommentsList = ({ comments }: IProps) => (
  <Root>
    {comments.length === 0 ? (
      <Title>No comment yet!</Title>
    ) : (
      <Title>
        {comments.length} {commentText(comments.length)}
      </Title>
    )}
    {comments.map(({ node }) => (
      <Comment key={node.id}>
        <MetaWrapper>
          <Author>{node.name}</Author>
          <Date>{node.date}</Date>
        </MetaWrapper>
        <ContentWrapper>
          <div
            className="md-content"
            dangerouslySetInnerHTML={{ __html: node.message }}
          />
        </ContentWrapper>
        <ReplyWrapper>
          <Reply type="button">Reply</Reply>
        </ReplyWrapper>
      </Comment>
    ))}
  </Root>
)

export default CommentsList
