import React, { PureComponent } from 'react'

import { storeItem } from '../utils/localStorage'
import styled from '../utils/styled'
import Close from './icons/close'

const CloseButton = styled('button')`
  ${tw('appearance-none border-0 cursor-pointer bg-transparent')};
`

const CloseIcon = styled(Close)`
  ${tw('text-grey-dark h-4 w-4')};
`

const ModalWrapper = styled('div')`
  ${tw('fixed pin z-20 bg-black-60')};
  animation: fadein 200ms ease-in-out;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Modal = styled('div')`
  ${tw('fixed h-1/2 z-40 bg-white p-4 rounded shadow')};

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const TitleWrapper = styled('div')``

const Title = styled('h2')`
  ${tw('font-bold text-lg text-grey-darker')};
`

const ButtonsWrapper = styled('div')`
  ${tw('flex items-center justify-end')};
`

const ButtonConfirm = styled('button')`
  ${tw(
    'appearance-none py-2 px-4 bg-transparent border-0 text-blue text-base font-bold cursor-pointer'
  )};
`

const ButtonCancel = styled('button')`
  ${tw(
    'appearance-none py-2 px-4 text-gray bg-transparent border-0 text-base cursor-pointer'
  )};
`

const NOT_SHOW_SUB = '@equimper-not-show-sub'

interface IProps extends IReactPortalProps {}

class SubscribeFormCloseButton extends PureComponent<IProps> {
  onDontShowClick = () => {
    this.setState({ notShowSub: true }, () => {
      const event = new CustomEvent('itemInserted', {
        detail: {
          notShowSub: true,
        },
      })
      window.dispatchEvent(event)

      this.props.closePortal()

      storeItem(NOT_SHOW_SUB, true)
    })
  }

  render() {
    const { portal, closePortal, openPortal } = this.props

    return (
      <>
        <CloseButton onClick={openPortal}>
          <CloseIcon />
        </CloseButton>
        {portal(
          <>
            <ModalWrapper onClick={closePortal} />
            <Modal>
              <TitleWrapper>
                <Title>
                  Are you sure you don't want to receive any notification when
                  new article get posted ?
                </Title>
              </TitleWrapper>
              <ButtonsWrapper>
                <ButtonCancel onClick={closePortal}>Cancel</ButtonCancel>
                <ButtonConfirm onClick={this.onDontShowClick}>
                  Yes
                </ButtonConfirm>
              </ButtonsWrapper>
            </Modal>
          </>
        )}
      </>
    )
  }
}

export default SubscribeFormCloseButton
