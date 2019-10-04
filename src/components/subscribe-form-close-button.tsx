import React, { PureComponent } from 'react'
import { Portal } from 'react-portal'
import { animated,  } from 'react-spring'
import { Spring } from 'react-spring/renderprops';
import * as easings from 'd3-ease'


import { storeItem } from '../utils/localStorage'
import styled from '../utils/styled'
import Close from './icons/close'

const KEYCODES = {
  ESCAPE: 27,
}

const CloseButton = styled('button')`
  ${tw('appearance-none focus:outline-none focus:shadow-outline border-0 cursor-pointer bg-transparent')};
`

const CloseIcon = styled(Close)`
  ${tw('text-grey-dark h-4 w-4')};
`

const ModalWrapper = styled(animated.div)`
  ${tw('fixed pin z-20 bg-black-60')};
`

const Modal = styled('div')`
  ${tw('w-3/4 lg:w-1/3 fixed h-1/2 z-40 bg-white p-4 rounded shadow')};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const TitleWrapper = styled('div')``

const Title = styled('h2')`
  ${tw('text-base font-bold sm:text-lg text-grey-darker')};
`

const ButtonsWrapper = styled('div')`
  ${tw('flex items-center justify-end')};
`

const ButtonConfirm = styled('button')`
  ${tw(
    'appearance-none py-2 px-4 bg-transparent border-0 text-blue-lighter text-base font-bold cursor-pointer'
  )};
`

const ButtonCancel = styled('button')`
  ${tw(
    'appearance-none py-2 px-4 text-grey bg-transparent border-0 text-base cursor-pointer'
  )};
`

const NOT_SHOW_SUB = '@equimper-not-show-sub'

interface IProps {}

type State = Readonly<{
  isOpen: boolean
}>

class SubscribeFormCloseButton extends PureComponent<IProps, State> {
  readonly state = {
    isOpen: false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  onDontShowClick = () => {
    const event = new CustomEvent('itemInserted', {
      detail: {
        notShowSub: true,
      },
    })
    window.dispatchEvent(event)

    this.closePortal()

    storeItem(NOT_SHOW_SUB, true)
  }

  openPortal = () => {
    document.body.classList.add('stop-scrolling')
    this.setState({ isOpen: true })
  }

  closePortal = () => {
    document.body.classList.remove('stop-scrolling')
    this.setState({ isOpen: false })
  }

  handleKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.isOpen) {
      this.closePortal()
    }
  }

  render() {
    return (
      <>
        <CloseButton type="button" aria-label="Close" onClick={this.openPortal}>
          <CloseIcon />
        </CloseButton>

        {this.state.isOpen && (
          <Portal>
            <Spring
              native
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={{ duration: 400, easing: easings.easeCubic }}
            >
              {styles => (
                <>
                  <ModalWrapper style={styles} onClick={this.closePortal} />
                  <Modal>
                    <TitleWrapper>
                      <Title>
                        Are you sure you don't want to receive any notification
                        when new article get posted ?
                      </Title>
                    </TitleWrapper>
                    <ButtonsWrapper>
                      <ButtonCancel
                        type="button"
                        aria-label="Cancel"
                        onClick={this.closePortal}
                      >
                        Cancel
                      </ButtonCancel>
                      <ButtonConfirm
                        type="button"
                        aria-label="Confirm"
                        onClick={this.onDontShowClick}
                      >
                        Confirm
                      </ButtonConfirm>
                    </ButtonsWrapper>
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

export default SubscribeFormCloseButton
