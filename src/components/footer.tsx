import { Link as GatsbyLink } from 'gatsby'
import React, { SFC } from 'react'

import { constants } from '../utils/constants'
import styled from '../utils/styled'

interface IProps {
  siteTitle: string
}

const Root = styled('footer')`
  ${tw(
    'bg-white mx-auto flex justify-center absolute pin-b pin-x px-6 pt-2 sm:py-2'
  )};
`

const FooterWrapper = styled('div')`
  ${tw(
    'flex-col-reverse w-full xl:w-3/4 flex items-center justify-between sm:flex-row'
  )};
`

const AllContentWrapper = styled('div')`
  ${tw('flex items-baseline')};
`

const AllContent = styled('p')`
  ${tw('text-xs mr-4 text-grey-darker tracking-small')};
`

const SiteTitle = styled(GatsbyLink)`
  ${tw(
    'text-sm no-underline tracking-wide leading-normal font-bold text-grey-darkest hover:text-grey sm:text-base'
  )};

  font-family: Cormorant Garamond;
`

const LinkItem = styled('li')`
  ${tw('mb-4 ml-4 sm:mb-0')};
`

const activeClassName = 'nav-item-active'

const Link = styled(GatsbyLink)`
  ${tw(
    'text-sm no-underline text-grey-darker hover:text-grey-darkest sm:text-base tracking-small'
  )};

  &.${activeClassName} {
    ${tw('text-grey')};
  }
`

const LinkList = styled('ul')`
  ${tw('flex-col list-reset flex items-center sm:flex-row')};
`

const Footer: SFC<IProps> = ({ siteTitle }) => (
  <Root>
    <FooterWrapper>
      <AllContentWrapper>
        <AllContent>All content &copy; 2018</AllContent>
        <SiteTitle to="/">{siteTitle}</SiteTitle>
      </AllContentWrapper>
      <LinkList>
        {constants.siteNav.map(el => (
          <LinkItem key={el.name}>
            <Link
              exact={el.url !== '/blog'}
              activeClassName={activeClassName}
              to={el.url}
            >
              {el.name}
            </Link>
          </LinkItem>
        ))}
      </LinkList>
    </FooterWrapper>
  </Root>
)

export default Footer
