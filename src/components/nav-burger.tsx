import { Link as GatsbyLink } from 'gatsby'
import React, { PureComponent } from 'react'
import { Portal } from 'react-portal'
import { animated, Spring } from 'react-spring'
// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import { Easing, TimingAnimation } from 'react-spring/dist/addons'

import styled from '../utils/styled'
import Close from './icons/close'
import Menu from './icons/menu'

const NavMenu = styled('button')`
  ${tw(
    'block sm:hidden p-4 cursor-pointer appearance-none bg-transparent border-0'
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

const Link = styled(GatsbyLink)`
  ${tw('no-underline text-grey-darker font-bold text-xl p-4')};
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
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    this.setState({ isOpen: true })
  }

  closePortal = () => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
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
                      <LinkItem>
                        <Link to="/about">About</Link>
                      </LinkItem>
                      <LinkItem>
                        <Link to="/blog">Blog</Link>
                      </LinkItem>
                      <LinkItem>
                        <Link to="/contact">Contact Me</Link>
                      </LinkItem>
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
