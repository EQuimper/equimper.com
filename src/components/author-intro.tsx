import Img from 'gatsby-image'
import React from 'react'

import siteConfig from '../../data/siteConfig.js'
import styled from '../utils/styled'
import Facebook from './icons/facebook'
import Github from './icons/github'
import Linkedin from './icons/linkedin'
import RSS from './icons/rss'
import Twitter from './icons/twitter'
import Youtube from './icons/youtube'

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

const IconWrapper = styled('a')`
  ${tw('')};
`

const GithubIcon = styled(Github)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const LinkedinIcon = styled(Linkedin)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const TwitterIcon = styled(Twitter)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const FacebookIcon = styled(Facebook)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const YoutubeIcon = styled(Youtube)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const RSSIcon = styled(RSS)`
  ${tw('text-grey-dark h-8 w-8 hover:text-blue-lighter')};
`

const IconsWrapper = styled('div')`
  ${tw('')};
`

const socials = [
  {
    link: 'https://github.com/EQuimper',
    icon: <GithubIcon />,
  },
  {
    link: 'https://twitter.com/QuimperEmanuel',
    icon: <TwitterIcon />,
  },
  {
    link: 'https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw',
    icon: <YoutubeIcon />,
  },
  {
    link: 'https://www.linkedin.com/in/emanuelquimper',
    icon: <LinkedinIcon />,
  },
  {
    link: 'https://www.facebook.com/EQuimperCoding',
    icon: <FacebookIcon />,
  },
  {
    link: `${siteConfig.site.url}/rss.xml`,
    icon: <RSSIcon />,
  },
]

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
        <IconsWrapper>
          {socials.map(social => (
            <IconWrapper
              key={social.link}
              rel="noreferrer"
              href={social.link}
              target="_blank"
            >
              {social.icon}
            </IconWrapper>
          ))}
        </IconsWrapper>
      </DetailWrapper>
    </IntroductionWrapper>
  )
}

export default AuthorIntro
