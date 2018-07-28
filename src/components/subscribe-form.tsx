import axios from 'axios'
import { Formik, FormikActions, FormikProps } from 'formik'
import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import { getItemFromStorage, storeItem } from '../utils/localStorage'
import styled from '../utils/styled'
import Spinner from './spinner'
import SubscribeFormCloseButton from './subscribe-form-close-button'

const Root = styled('div')`
  ${tw('w-full mb-6')};
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
  ${tw('flex items-center mb-2 flex-col sm:flex-row sm:items-baseline')};
`

const InputWrapper = styled('div')`
  ${tw('sm:mr-4 pb-2 relative')};
`

const Title = styled('h2')`
  ${tw('font-bold text-lg text-grey-darker m-0')};
`

const TitleWrapper = styled('div')`
  ${tw('text-left mb-4 sm:text-left')};
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

const TopWrapper = styled('div')`
  ${tw('flex items-baseline justify-between')};
`

const MAILCHIMP_SIGNUP_URL =
  'https://f3gb25pq7i.execute-api.us-east-1.amazonaws.com/dev/api/mailchimp/subscribe'

const SUB_KEY = '@equimper-sub'
const NOT_SHOW_SUB = '@equimper-not-show-sub'

interface IFormValues {
  email: string
  firstName: string
}

interface IProps {
  avatar: any
}

type State = Readonly<{
  alreadySub: boolean
  showThankYou: boolean
  haveError: boolean
  notShowSub: boolean
}>

class SubscribeForm extends PureComponent<IProps, State> {
  state = {
    alreadySub: false,
    showThankYou: false,
    haveError: false,
    notShowSub: !!getItemFromStorage(NOT_SHOW_SUB),
  }

  componentDidMount() {
    this.checkIfSub()

    if (typeof window !== 'undefined') {
      window.addEventListener('itemInserted', this.listenToStorage, false)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('itemInserted', this.listenToStorage, false)
    }
  }

  listenToStorage = (e: Event) => {
    const event = e as CustomEvent

    if (event.detail.notShowSub) {
      this.setState({ notShowSub: true })
    }
  }

  checkIfSub = () => {
    const data = getItemFromStorage(SUB_KEY)

    if (data && data.isSubscribed) {
      this.setState({ alreadySub: true })
    }
  }

  handleSubmit = async (
    values: IFormValues,
    bag: FormikActions<IFormValues>
  ) => {
    try {
      const res = await axios.post(
        MAILCHIMP_SIGNUP_URL,
        {
          email: values.email,
          firstName: values.firstName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (res.data.success) {
        this.setState({ showThankYou: true })

        storeItem(SUB_KEY, { isSubscribed: true })
      }
    } catch (error) {
      bag.setSubmitting(false)
      this.setState({ haveError: true })
    }
  }

  render() {
    if (this.state.alreadySub || this.state.notShowSub) {
      return null
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
      <Formik
        initialValues={{ email: '', firstName: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Not a valid Email')
            .required('Email is a required field'),
          firstName: Yup.string().required('First Name is a required field'),
        })}
        onSubmit={this.handleSubmit}
      >
        {({
          values,
          handleBlur,
          handleChange,
          isSubmitting,
          handleSubmit,
          errors,
          touched,
          isValid,
        }: FormikProps<IFormValues>) => {
          if (isSubmitting) {
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
          return (
            <Root>
              <Container>
                <TopWrapper>
                  <TitleWrapper>
                    <Title>Subscribe to the Newsletter</Title>
                  </TitleWrapper>
                  <SubscribeFormCloseButton />
                </TopWrapper>
                <DetailWrapper>
                  <Detail>
                    Receive notification when new article get posted
                  </Detail>
                </DetailWrapper>
                <Form onSubmit={handleSubmit}>
                  <InputWrapper>
                    <Input
                      onBlur={handleBlur}
                      name="email"
                      value={values.email}
                      type="email"
                      placeholder="Email*"
                      onChange={handleChange}
                    />
                    {touched.email &&
                      errors.email && (
                        <ErrorWrapper>
                          <ErrorMessage>{errors.email}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                  </InputWrapper>
                  <InputWrapper>
                    <Input
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      type="text"
                      placeholder="First Name*"
                    />
                    {touched.firstName &&
                      errors.firstName && (
                        <ErrorWrapper>
                          <ErrorMessage>{errors.firstName}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                  </InputWrapper>
                  <ButtonWrapper>
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      Subscribe
                    </Button>
                  </ButtonWrapper>
                </Form>
              </Container>
            </Root>
          )
        }}
      </Formik>
    )
  }
}

export default SubscribeForm
