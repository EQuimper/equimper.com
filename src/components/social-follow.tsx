import React, { SFC } from 'react'

import siteConfig from '../../data/siteConfig.js'
import styled from '../utils/styled'
import Dev from './icons/dev'
import Github from './icons/github'
import Instagram from './icons/instagram'
import Linkedin from './icons/linkedin'
import RSS from './icons/rss'
import StackOverFlow from './icons/stackoverflow'
import Twitch from './icons/twitch'
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

const YoutubeIcon = styled(Youtube)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.youtube};
  }
`

const DevIcon = styled(Dev)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.dev};
  }
`

const InstagramIcon = styled(Instagram)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.instagram};
  }
`

const TwitchIcon = styled(Twitch)`
  ${tw('text-grey-dark h-8 w-8')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.twitch};
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
    link: 'https://dev.to/equimper',
    icon: <DevIcon />,
    name: 'Dev',
  },
  {
    link: 'https://www.twitch.tv/equimper',
    icon: <TwitchIcon />,
    name: 'Twitch',
  },
  {
    link: 'https://twitter.com/QuimperEmanuel',
    icon: <TwitterIcon />,
    name: 'Twitter',
  },
  {
    link: 'https://www.instagram.com/equimper/',
    icon: <InstagramIcon />,
    name: 'Instagram',
  },
  {
    link: `${siteConfig.site.url}/rss.xml`,
    icon: <RSSIcon />,
    name: 'RSS',
  },
  {
    link: 'https://stackoverflow.com/users/5670861/equimper?tab=profile',
    icon: <StackOverFlowIcon />,
    name: 'StackOverFlow',
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
