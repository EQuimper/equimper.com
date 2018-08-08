import { Link as GatsbyLink } from 'gatsby'
import React, { PureComponent } from 'react'
import { Portal } from 'react-portal'
import { animated, Spring } from 'react-spring'
// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import { Easing, TimingAnimation } from 'react-spring/dist/addons'

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

interface P {}

type State = Readonly<{
  isOpen: boolean
}>

class NavBurger extends PureComponent<P, State> {
  readonly state = {
    isOpen: false,
  }

  openPortal = () => {
    // document.body.classList.add('stop-scrolling')
    this.setState({ isOpen: true })
  }

  closePortal = () => {
    // document.body.classList.remove('stop-scrolling')
    this.setState({ isOpen: false })
  }

  render() {
    return (
      <>
        <NavMenu aria-label="Menu" type="button" onClick={this.openPortal}>
          <MenuIcon />
        </NavMenu>

        {this.state.isOpen && (
          <Portal>
            <Spring
              impl={TimingAnimation}
              native
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ duration: 400, easing: Easing.inOut(Easing.ease) }}
            >
              {styles => (
                <>
                  <ModalWrapper style={styles} />
                  <Modal>
                    <CloseButton
                      type="button"
                      aria-label="Close"
                      onClick={this.closePortal}
                    >
                      <CloseIcon />
                    </CloseButton>
                    <LinkList>
                      {constants.siteNav.map(el => (
                        <LinkItem key={el.name}>
                          <Link activeClassName={activeClassName} to={el.url}>
                            {el.name}
                          </Link>
                        </LinkItem>
                      ))}
                    </LinkList>
                  </Modal>
                </>
              )}
            </Spring>
          </Portal>
        )}
      </>
    )
  }
}

export default NavBurger
