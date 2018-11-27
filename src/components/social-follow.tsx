import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig.js'
import styled from '../utils/styled'
import Facebook from './icons/facebook'
import Github from './icons/github'
import Linkedin from './icons/linkedin'
import RSS from './icons/rss'
import StackOverFlow from './icons/stackoverflow'
import Twitter from './icons/twitter'
import Youtube from './icons/youtube'

const IconWrapper = styled('a')`
  ${tw('')};
`

const GithubIcon = styled(Github)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.github};
  }
`

const LinkedinIcon = styled(Linkedin)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.linkedin};
  }
`

const TwitterIcon = styled(Twitter)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.twitter};
  }
`

const FacebookIcon = styled(Facebook)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.facebook};
  }
`

const YoutubeIcon = styled(Youtube)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.youtube};
  }
`

const StackOverFlowIcon = styled(StackOverFlow)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.stackoverflow};
  }
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
    name: 'Github',
  },
  {
    link: 'https://www.linkedin.com/in/emanuelquimper',
    icon: <LinkedinIcon />,
    name: 'Linkedin',
  },
  {
    link: 'https://www.youtube.com/channel/UC7R7bcH9-KEBDiGNP1mZnmw',
    icon: <YoutubeIcon />,
    name: 'Youtube',
  },
  {
    link: 'https://twitter.com/QuimperEmanuel',
    icon: <TwitterIcon />,
    name: 'Twitter',
  },
  {
    link: 'https://www.facebook.com/EQuimperCoding',
    icon: <FacebookIcon />,
    name: 'Facebook',
  },
  {
    link: 'https://stackoverflow.com/users/5670861/equimper?tab=profile',
    icon: <StackOverFlowIcon />,
    name: 'StackOverFlow',
  },
  {
    link: `${siteConfig.site.url}/rss.xml`,
    icon: <RSSIcon />,
    name: 'RSS',
  },
]

const SocialFollow: SFC = () => (
  <IconsWrapper>
    {socials.map(social => (
      <IconWrapper
        aria-label={social.name}
        key={social.link}
        rel="noreferrer"
        href={social.link}
        target="_blank"
      >
        {social.icon}
      </IconWrapper>
    ))}
  </IconsWrapper>
)

export default SocialFollow
