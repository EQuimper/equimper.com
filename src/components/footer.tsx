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
  ${tw('w-3/4 px-4 py-2 flex items-center justify-between text-sm')};
`

const AllContentWrapper = styled('div')`
  ${tw('flex items-baseline')};
`

const AllContent = styled('p')`
  ${tw('mr-4 text-grey')};
`

const SiteTitle = styled(GatsbyLink)`
  ${tw('no-underline tracking-wide font-bold text-grey-darkest hover:text-red')};
`

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey hover:text-red')};
`

const LinkList = styled('ul')`
  ${tw('list-reset')};
`

const Footer: SFC<IProps> = ({ siteTitle }) => (
  <Root>
    <FooterWrapper>
      <AllContentWrapper>
        <AllContent>All content &copy;</AllContent>
        <SiteTitle to="https://github.com/EQuimper">{siteTitle}</SiteTitle>
      </AllContentWrapper>
      <LinkList>
        <li>
          <Link to="/blob">Blog</Link>
        </li>
      </LinkList>
    </FooterWrapper>
  </Root>
)

export default Footer
