import { Link as GatsbyLink } from 'gatsby'
import React, { useState } from 'react'
import { Portal } from 'react-portal'
import { useSpring, animated } from 'react-spring'

import { constants } from '../utils/constants'
import styled from '../utils/styled'
import Close from './icons/close'
import Menu from './icons/menu'

const NavMenu = styled('button')`
  ${tw(
    'focus:outline-none focus:shadow-outline block sm:hidden p-4 cursor-pointer appearance-none bg-transparent border-0'
  )};
`

const MenuIcon = styled(Menu)`
  ${tw('h-4 w-4 text-grey-darker')};
`

const ModalWrapper = styled(animated.div)`
  ${tw('fixed pin z-20 bg-white-80')};
`

const Modal = styled('div')`
  ${tw(
    'w-3/4 lg:w-1/3 fixed h-1/2 z-40 p-4 flex flex-col items-center justify-center'
  )};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LinkList = styled('ul')`
  ${tw('list-reset items-center')};
`

const LinkItem = styled('li')`
  ${tw('text-center mb-4')};
`

const activeClassName = 'nav-item-active'

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey-darker font-bold text-xl p-4')};

  &.${activeClassName} {
    ${tw('text-grey')};
  }
`

const CloseButton = styled('button')`
  ${tw('p-4 cursor-pointer appearance-none bg-transparent border-0')};
`

const CloseIcon = styled(Close)`
  ${tw('h-5 w-5 text-grey-darker')};
`

const NavBurger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [styles, set] = useSpring(() => ({ opacity: 1 }))

  const closePortal = () => setIsOpen(false)

  const openPortal = () => setIsOpen(true)

  set({ opacity: isOpen ? 1 : 0 })

  return (
    <>
      <NavMenu aria-label="Menu" type="button" onClick={openPortal}>
        <MenuIcon />
      </NavMenu>

      {isOpen && (
        <Portal>
          <>
            <ModalWrapper style={styles} />
            <Modal>
              <CloseButton
                type="button"
                aria-label="Close"
                onClick={closePortal}
              >
                <CloseIcon />
              </CloseButton>
              <LinkList>
                {constants.siteNav.map(item => (
                  <LinkItem key={item.name}>
                    <Link activeClassName={activeClassName} to={item.url}>
                      {item.name}
                    </Link>
                  </LinkItem>
                ))}
              </LinkList>
            </Modal>
          </>
        </Portal>
      )}
    </>
  )
}

export default NavBurger
