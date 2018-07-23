import Img from 'gatsby-image'
import React, { ChangeEvent, PureComponent } from 'react'

import { isValidEmail } from '../utils/isValidEmail'
import styled from '../utils/styled'

const Root = styled('div')`
  ${tw('w-full')};
`

const Container = styled('div')`
  ${tw('bg-white rounded shadow p-4')};
`

const Input = styled('input')`
  ${tw(
    'bg-grey-lighter appearance-none border-0 border-grey-lighter rounded w-full mb-4 py-2 px-3 text-sm text-grey-darker leading-tight sm:text-base sm:mb-0 sm:py-3 sm:px-4'
  )};
`

const Form = styled('form')`
  ${tw('flex items-center mb-2 flex-col sm:flex-row')};
`

const InputWrapper = styled('div')`
  ${tw('mr-4')};
`

const Title = styled('h2')`
  ${tw('font-bold text-lg text-grey-darker m-0')};
`

const TitleWrapper = styled('div')`
  ${tw('text-center mb-4 sm:text-left')};
`

const DetailWrapper = styled('div')`
  ${tw('text-center mb-6 sm:text-left')};
`

const Detail = styled('p')`
  ${tw('text-sm text-grey-dark')};
`

const ButtonWrapper = styled('div')``

const Button = styled('button')`
  ${tw(
    'text-white text-sm font-bold py-2 px-4 rounded border-0 cursor-pointer bg-green-light bg-green-light sm:text-base sm:py-3 sm:px-5'
  )};

  &:disabled {
    ${tw('bg-grey cursor-not-allowed')};
  }
`

const Avatar = styled(Img)`
  ${tw('rounded-full')};
`

const Wrapper = styled('div')`
  ${tw('')};
`

interface IProps {
  avatar: any
}

type State = Readonly<{
  email: string
  firstName: string
  isValid: boolean
}>

class SubscribeForm extends PureComponent<IProps, State> {
  state = {
    email: '',
    firstName: '',
    isValid: false,
  }

  componentDidUpdate(prevProps: IProps, prevState: State) {
    if (this.state.email !== prevState.email) {
      if (isValidEmail(this.state.email)) {
        this.setState({
          isValid: true,
        })
      } else {
        this.setState({
          isValid: false,
        })
      }
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <Root>
        <Container>
          <TitleWrapper>
            <Title>Subscribe to the Newsletter</Title>
          </TitleWrapper>
          <DetailWrapper>
            <Detail>Receive notification when new article get posted</Detail>
          </DetailWrapper>
          <Form>
            <InputWrapper>
              <Input
                name="email"
                value={this.state.email}
                type="email"
                placeholder="Email"
                id="email"
                onChange={this.handleChange}
              />
            </InputWrapper>
            <InputWrapper>
              <Input
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                placeholder="First Name"
                id="firstName"
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button disabled={!this.state.isValid} type="submit">
                Subscribe
              </Button>
            </ButtonWrapper>
          </Form>
        </Container>
      </Root>
    )
  }
}

export default SubscribeForm
