import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'

import styled from '../utils/styled'

interface IProps {
  siteTitle: string
}

const Root = styled('footer')`
  ${tw('bg-white mx-auto flex justify-center absolute pin-b pin-x')};
`

const FooterWrapper = styled('div')`
  ${tw(
    'w-full md:w-3/4 lg:w-1/2 px-6 px-4 py-2 flex items-center justify-between text-sm'
  )};
`

const AllContentWrapper = styled('div')`
  ${tw('flex items-baseline')};
`

const AllContent = styled('p')`
  ${tw('mr-4 text-grey')};
`

const SiteTitle = styled(GatsbyLink)`
  ${tw(
    'no-underline tracking-wide font-bold text-grey-darkest hover:text-grey'
  )};
`

const LinkItem = styled('li')`
  ${tw('ml-4')};
`

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey hover:text-grey-darkest')};
`

const LinkList = styled('ul')`
  ${tw('list-reset flex items-center')};
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
          <Link to="/blob">Blog</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/contact">Contact Me</Link>
        </LinkItem>
      </LinkList>
    </FooterWrapper>
  </Root>
)

export default Footer
