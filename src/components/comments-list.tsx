import React from 'react'

import { IComment } from '../interfaces/Comment'
import styled from '../utils/styled'
import Comment from './comment'

const Root = styled('div')`
  ${tw('mt-10')};
`

const Title = styled('h3')`
  ${tw('text-grey text-sm uppercase tracking-wide')};
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
    {comments.map(({ node }) => <Comment key={node.id} data={node} />)}
  </Root>
)

export default CommentsList