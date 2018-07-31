import Img from 'gatsby-image'
import React from 'react'

import styled from '../utils/styled'
import SocialFollow from './social-follow'

const IntroductionWrapper = styled('div')`
  ${tw('text-center mb-10 bg-white p-4 rounded shadow')};
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

const DetailWrapper = styled('div')``

const Title = styled('h1')`
  ${tw('text-grey-darkest font-bold text-4xl leading-normal tracking-wide')};

  font-family: Cormorant Garamond;
`

const UserDescriptionWrapper = styled('div')`
  ${tw('mb-4')};
`

const UserDescription = styled('p')`
  ${tw('text-sm text-grey-dark text-base leading-normal')};
`

interface IProps {
  data: {
    avatarImg: {
      fixed: any
    }
  }
}

const AuthorIntro = ({ data }: IProps) => {
  return (
    <IntroductionWrapper>
      <Avatar alt="avatar" fixed={data.avatarImg.fixed} />
      <DetailWrapper>
        <Title>EQuimper's Blog</Title>
        <UserDescriptionWrapper>
          <UserDescription>
            Programmer - Mentor - Blogger - Youtuber
          </UserDescription>
        </UserDescriptionWrapper>
        <SocialFollow />
      </DetailWrapper>
    </IntroductionWrapper>
  )
}

export default AuthorIntro
