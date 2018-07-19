import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'

import Text from '../commons/Text'
import styled from '../utils/styled'

interface IProps {
  siteTitle: string
}

const NavWrapper = styled('div')`
  ${tw('px-4 py-2 flex items-center justify-between bg-white shadow')};
`

const LinkList = styled('ul')`
  ${tw('flex flex-wrap list-reset items-center')};
`

const LinkItem = styled('li')`
  ${tw('')};
`

const BrandWrapper = styled('div')`
  ${tw('border-b border-red')};
`

const Link = styled(GatsbyLink)`
  ${tw('no-underline ml-4 text-grey-darkest hover:text-red')};
`
const BrandLink = styled(GatsbyLink)`
  ${tw('no-underline tracking-wide font-bold text-md text-grey-darkest hover:text-red')};
`

const Heading = Text.withComponent('h1')

const Header: SFC<IProps> = ({ siteTitle }) => (
  <nav>
    <NavWrapper>
      <BrandWrapper>
        <BrandLink to="/">{siteTitle}</BrandLink>
      </BrandWrapper>
      <LinkList>
        <LinkItem>
          <Link to="/blog">Blog</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/contact">Contact Me</Link>
        </LinkItem>
      </LinkList>
    </NavWrapper>
  </nav>
)

export default Header
