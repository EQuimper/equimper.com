import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'
import Headroom from 'react-headroom'

import { constants } from '../utils/constants'
import styled from '../utils/styled'
import NavBurger from './nav-burger'

interface IProps {
  siteTitle: string
}

const Nav = styled('nav')`
  ${tw('w-full shadow bg-white-80')};
`

const NavWrapper = styled('div')`
  ${tw('px-4 py-2 w-full flex items-center justify-between')};
`

const LinkList = styled('ul')`
  ${tw('hidden sm:flex flex-wrap list-reset items-center')};
`

const LinkItem = styled('li')`
  ${tw('ml-4')};
`

const BrandWrapper = styled('div')`
  ${tw('')};
`

const activeClassName = 'nav-item-active'

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey-darkest hover:text-grey tracking-small')};

  &.${activeClassName} {
    ${tw('text-grey')};
  }
`
const BrandLink = styled(GatsbyLink)`
  ${tw(
    'no-underline tracking-wide leading-normal font-bold text-md md:text-xl text-grey-darkest hover:text-grey'
  )};

  font-family: Cormorant Garamond;
`

const Header: SFC<IProps> = ({ siteTitle }) => (
  <Headroom>
    <header>
      <Nav>
        <NavWrapper>
          <BrandWrapper>
            <BrandLink to="/">{siteTitle}</BrandLink>
          </BrandWrapper>
          <NavBurger />
          <LinkList>
            {constants.siteNav.map(el => (
              <LinkItem key={el.name}>
                <Link
                  activeClassName={activeClassName}
                  exact={el.url !== '/blog'}
                  to={el.url}
                >
                  {el.name}
                </Link>
              </LinkItem>
            ))}
          </LinkList>
        </NavWrapper>
      </Nav>
    </header>
  </Headroom>
)

export default Header
