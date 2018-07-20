import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'

import styled from '../utils/styled'

interface IProps {
  siteTitle: string
}

const Root = styled('footer')`
  ${tw('bg-white mx-auto flex justify-center absolute pin-b pin-x px-6 pt-2 sm:py-2')};
`

const FooterWrapper = styled('div')`
  ${tw(
    'flex-col-reverse w-full xl:w-1/2 flex items-center justify-between sm:flex-row'
  )};
`

const AllContentWrapper = styled('div')`
  ${tw('flex items-baseline')};
`

const AllContent = styled('p')`
  ${tw('text-xs mr-4 text-grey-darker sm:text-base')};
`

const SiteTitle = styled(GatsbyLink)`
  ${tw(
    'text-sm no-underline tracking-wide font-bold text-grey-darkest hover:text-grey sm:text-base'
  )};
`

const LinkItem = styled('li')`
  ${tw('mb-4 ml-4 sm:mb-0')};
`

const Link = styled(GatsbyLink)`
  ${tw('text-sm no-underline text-grey-darker hover:text-grey-darkest sm:text-base')};
`

const LinkList = styled('ul')`
  ${tw('flex-col list-reset flex items-center sm:flex-row')};
`

const Footer: SFC<IProps> = ({ siteTitle }) => (
  <Root>
    <FooterWrapper>
      <AllContentWrapper>
        <AllContent>All content &copy;</AllContent>
        <SiteTitle to="https://www.github.com/EQuimper" target="_blank">
          {siteTitle}
        </SiteTitle>
      </AllContentWrapper>
      <LinkList>
        <LinkItem>
          <Link to="/blog">Blog</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/contact">Contact Me</Link>
        </LinkItem>
      </LinkList>
    </FooterWrapper>
  </Root>
)

export default Footer
