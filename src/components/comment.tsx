import Img from 'gatsby-image'
import React, { PureComponent } from 'react'

import { IComment } from '../interfaces/Comment'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('bg-white p-4 mb-4 flex flex-col items-center rounded shadow relative')};
`

const MetaWrapper = styled('div')`
  ${tw('w-full flex items-center')};
`

const ContentWrapper = styled('div')`
  ${tw('w-full')};
`

const ReplyWrapper = styled('div')`
  ${tw('absolute pin-t pin-r')};
`

const Reply = styled('button')`
  ${tw(
    'text-grey hover:text-grey-darker p-4 cursor-pointer appearance-none border-0 bg-transparent'
  )};
`

const Author = styled('h4')`
  ${tw('text-grey-darker font-bold m-0')};
`

const Date = styled('p')`
  ${tw('text-xs leading-normal tracking-wide text-grey uppercase')};
`

const AuthorImg = styled(Img)`
  ${tw('rounded-full')};
`

const AuthorImgWrapper = styled('div')`
  ${tw('mr-4')};
`

const CommentInfoWrapper = styled('div')`
  ${tw('')};
`

interface IProps {
  data: IComment
  isAuthor: boolean
  avatarImg: any
}

class Comment extends PureComponent<IProps> {
  onReplyClick = () => {
    window.alert('Not implement yet!')
  }
  render() {
    const { data, avatarImg, isAuthor } = this.props
    return (
      <Root>
        <MetaWrapper>
          {isAuthor && (
            <AuthorImgWrapper>
              <AuthorImg fixed={avatarImg} />
            </AuthorImgWrapper>
          )}
          <CommentInfoWrapper>
            <Author>{data.name}</Author>
            <Date>{data.date}</Date>
          </CommentInfoWrapper>
        </MetaWrapper>
        <ContentWrapper>
          <div
            className="md-content"
            dangerouslySetInnerHTML={{ __html: data.message }}
          />
        </ContentWrapper>
        <ReplyWrapper>
          <Reply
            type="button"
            onClick={this.onReplyClick}
            aria-label="Reply Button"
          >
            Reply
          </Reply>
        </ReplyWrapper>
      </Root>
    )
  }
}

export default Comment
