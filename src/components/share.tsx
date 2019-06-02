import React from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'

import siteConfig from '../../data/siteConfig'
import styled from '../utils/styled'
import Facebook from './icons/facebook'
import Linkedin from './icons/linkedin'
import Reddit from './icons/reddit'
import Twitter from './icons/twitter'

const FacebookIcon = styled(Facebook)`
  ${tw('h-8 w-8 text-grey-dark cursor-pointer')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.facebook};
  }
`

const TwitterIcon = styled(Twitter)`
  ${tw('h-8 w-8 text-grey-dark cursor-pointer')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.twitter};
  }
`

const LinkedinIcon = styled(Linkedin)`
  ${tw('h-8 w-8 text-grey-dark cursor-pointer')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.linkedin};
  }
`

const RedditIcon = styled(Reddit)`
  ${tw('h-8 w-8 text-grey-dark cursor-pointer')};

  &:hover {
    color: ${props => props.theme.colors.socialBrand.reddit};
  }
`

const ShareWrapper = styled('div')`
  ${tw('flex items-center')};
`

const Root = styled('div')`
  ${tw('mt-12')};
`

interface IProps {
  url: string
  title: string
}

const Share = ({ url, title }: IProps) => (
  <Root>
    <ShareWrapper>
      <FacebookShareButton url={url}>
        <FacebookIcon />
      </FacebookShareButton>
      <RedditShareButton title={title} url={url}>
        <RedditIcon />
      </RedditShareButton>
      <TwitterShareButton
        title={title}
        url={url}
        via={siteConfig.twitterHandler}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <LinkedinShareButton title={title} url={url}>
        <LinkedinIcon />
      </LinkedinShareButton>
    </ShareWrapper>
  </Root>
)

export default Share
