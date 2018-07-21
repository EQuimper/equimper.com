import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'

import styled from '../utils/styled'

interface IProps {
  siteTitle: string
}

const Nav = styled('nav')`
  ${tw('bg-white w-full shadow')};
`

const NavWrapper = styled('div')`
  ${tw('px-4 py-2 w-full flex items-center justify-between')};
`

const LinkList = styled('ul')`
  ${tw('flex flex-wrap list-reset items-center')};
`

const LinkItem = styled('li')`
  ${tw('ml-4')};
`

const BrandWrapper = styled('div')`
  ${tw('')};
`

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey-darkest hover:text-grey')};
`
const BrandLink = styled(GatsbyLink)`
  ${tw(
    'no-underline tracking-wide font-bold text-md md:text-lg text-grey-darkest hover:text-grey'
  )};
`

const Header: SFC<IProps> = ({ siteTitle }) => (
  <header>
    <Nav>
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
    </Nav>
  </header>
)

export default Header
