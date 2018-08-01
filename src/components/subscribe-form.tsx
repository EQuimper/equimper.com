import axios from 'axios'
import { Formik, FormikActions, FormikProps } from 'formik'
import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Input from '../commons/input'
import { constants } from '../utils/constants'
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

const Form = styled('form')`
  ${tw('flex items-center flex-col sm:flex-row sm:items-baseline')};
`

const SubInput = styled(Input)`
  ${tw('')};
`

const InputWrapper = styled('div')`
  ${tw('sm:mr-4 mb-4 sm:mb-0 w-full sm:w-auto')};
`

const Title = styled('h2')`
  ${tw('font-bold text-lg text-grey-darker m-0 tracking-wide')};
`

const TitleWrapper = styled('div')`
  ${tw('text-left mb-4 sm:text-left')};
`

const DetailWrapper = styled('div')`
  ${tw('text-center mb-6 sm:text-left')};
`

const Detail = styled('p')`
  ${tw('text-sm text-grey-dark tracking-small')};
`

const ButtonWrapper = styled('div')`
  ${tw('w-full sm:w-auto')};
`

const Button = styled('button')`
  ${tw(
    'focus:outline-none focus:shadow-outline text-white w-full sm:w-auto text-sm font-bold py-3 px-5 rounded border-0 cursor-pointer bg-blue-lighter sm:text-base'
  )} &:disabled {
    ${tw('bg-grey cursor-not-allowed')};
  }
`

const ErrorWrapper = styled('div')`
  ${tw('mt-1')};
`

const ErrorMessage = styled('p')`
  ${tw('text-red text-xs italic mb-0')};
`

const TopWrapper = styled('div')`
  ${tw('flex items-baseline justify-between')};
`

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
        constants.mailChimpUrl,
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
                    <SubInput
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
                    <SubInput
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
