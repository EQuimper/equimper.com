import axios from 'axios'
import React, { ChangeEvent, FormEvent, PureComponent } from 'react'

import { isValidEmail } from '../utils/isValidEmail'
import { getItemFromStorage, storeItem } from '../utils/localStorage'
import styled from '../utils/styled'
import Spinner from './spinner'

const Root = styled('div')`
  ${tw('w-full')};
`

const Container = styled('div')`
  ${tw('bg-white rounded shadow p-4')};
`

const LoadingWrapper = styled('div')`
  ${tw('flex items-center justify-center py-10')};
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
  ${tw('mr-4 pb-2 relative')};
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

const ErrorWrapper = styled('div')`
  ${tw('pb-4 -mt-4 sm:mt-9 sm:absolute sm:pb-0')} bottom: -25px;
`

const ErrorMessage = styled('p')`
  ${tw('text-red text-xs italic')};
`

const MAILCHIMP_SIGNUP_URL =
  'https://f3gb25pq7i.execute-api.us-east-1.amazonaws.com/dev/api/mailchimp/subscribe'

const SUB_KEY = '@equimper-sub'

interface IProps {
  avatar: any
}

type State = Readonly<{
  email: string
  firstName: string
  isValid: boolean
  isSubmitting: boolean
  alreadySub: boolean
  showThankYou: boolean
  haveError: boolean
  emailVisited: boolean
  emailErrorMsg: string | null
}>

class SubscribeForm extends PureComponent<IProps, State> {
  state = {
    email: '',
    firstName: '',
    isValid: false,
    isSubmitting: false,
    alreadySub: false,
    showThankYou: false,
    haveError: false,
    emailVisited: false,
    emailErrorMsg: null,
  }

  componentDidMount() {
    this.checkIfSub()
  }

  componentDidUpdate(prevProps: IProps, prevState: State) {
    if (this.state.email !== prevState.email) {
      if (isValidEmail(this.state.email)) {
        this.setState({
          isValid: true,
          emailErrorMsg: null,
        })
      } else {
        this.setState({
          isValid: false,
        })
      }
    }

    if (this.state.emailVisited) {
      if (!isValidEmail(this.state.email)) {
        this.setState({
          emailErrorMsg: 'Email is not valid',
        })
      }
    }
  }

  checkIfSub = () => {
    const data = getItemFromStorage(SUB_KEY)

    if (data && data.isSubscribed) {
      this.setState({ alreadySub: true })
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    this.setState({
      isSubmitting: true,
    })

    try {
      const res = await axios.post(
        MAILCHIMP_SIGNUP_URL,
        {
          email: this.state.email,
          firstName: this.state.firstName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (res.data.success) {
        this.setState({ isSubmitting: false, showThankYou: true })

        storeItem(SUB_KEY, { isSubscribed: true })
      }
    } catch (error) {
      this.setState({ isSubmitting: false, haveError: true })
    }
  }

  handleEmailBlur = () => {
    this.setState({ emailVisited: true })
  }

  render() {
    if (this.state.alreadySub) {
      return null
    }

    if (this.state.isSubmitting) {
      return (
        <Root>
          <Container>
            <LoadingWrapper>
              <Spinner />
            </LoadingWrapper>
          </Container>
        </Root>
      )
    }

    if (this.state.haveError) {
      return (
        <Root>
          <Container>
            <LoadingWrapper>
              <h3>Something went wrong plz try again</h3>
            </LoadingWrapper>
          </Container>
        </Root>
      )
    }

    if (this.state.showThankYou) {
      return (
        <Root>
          <Container>
            <TitleWrapper>
              <Title>Thank You</Title>
            </TitleWrapper>
            <DetailWrapper>
              <Detail>
                You will receive email notification when new article get post
              </Detail>
            </DetailWrapper>
          </Container>
        </Root>
      )
    }
    return (
      <Root>
        <Container>
          <TitleWrapper>
            <Title>Subscribe to the Newsletter</Title>
          </TitleWrapper>
          <DetailWrapper>
            <Detail>Receive notification when new article get posted</Detail>
          </DetailWrapper>
          <Form onSubmit={this.handleSubmit}>
            <InputWrapper>
              <Input
                onBlur={this.handleEmailBlur}
                name="email"
                value={this.state.email}
                type="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              {this.state.emailVisited &&
                this.state.emailErrorMsg && (
                  <ErrorWrapper>
                    <ErrorMessage>{this.state.emailErrorMsg}</ErrorMessage>
                  </ErrorWrapper>
                )}
            </InputWrapper>
            <InputWrapper>
              <Input
                name="firstName"
                onChange={this.handleChange}
                value={this.state.firstName}
                type="text"
                placeholder="First Name"
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button
                disabled={!this.state.isValid || this.state.isSubmitting}
                type="submit"
              >
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
