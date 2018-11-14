import axios from 'axios'
import { Formik, FormikActions, FormikProps } from 'formik'
import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Input from '../commons/input'
import { constants } from '../utils/constants'
import styled from '../utils/styled'
import Spinner from './spinner'

const Root = styled('div')`
  ${tw('')};
`

const InputWrapper = styled('div')`
  ${tw('mb-4')};
`

interface IMessageInputProps {
  valid?: boolean
  isNotValid?: boolean
}

const MessageInput = styled('textarea')`
  ${tw(
    'focus:outline-none focus:shadow-outline font-sans bg-grey-lighter appearance-none border-0 border-grey-lighter rounded w-full py-3 px-4 text-sm text-grey-darker leading-tight sm:text-base'
  )};

  resize: vertical;
  min-height: 15rem;

  &:focus {
    box-shadow: rgba(0, 255, 240, 0.25) 0px 0px 0px 0.2rem;
    border-color: rgb(0, 255, 240);
    border-width: 1px;
  }

  ${(props: IMessageInputProps) => {
    if (props.valid) {
      return `
        box-shadow: rgba(40, 167, 69, 0.25) 0px 0px 0px 0.2rem;
        border-color: rgb(40, 167, 69);
        border-width: 1px;
      `
    } else if (props.isNotValid) {
      return `
        box-shadow: rgba(220, 53, 69, 0.25) 0px 0px 0px 0.2rem;
        border-color: rgb(220, 53, 69);
        border-width: 1px;
      `
    }
  }};
`

const ButtonWrapper = styled('div')``

const Button = styled('button')`
  ${tw(
    'focus:outline-none focus:shadow-outline w-full text-white text-sm font-bold py-3 px-5 rounded border-0 cursor-pointer bg-blue-lighter sm:text-base'
  )};

  &:disabled {
    ${tw('bg-grey cursor-not-allowed')};
  }
`

const LoadingWrapper = styled('div')`
  ${tw('flex items-center justify-center py-32')};
`

const ErrorWrapper = styled('div')`
  ${tw('mt-1 mb-4')};
`

const ErrorMessage = styled('p')`
  ${tw('text-red text-xs italic')};
`

const ThankYouTitle = styled('h3')`
  ${tw('text-grey-darker font-bold text-base text-center')};
`

interface IFormValues {
  email: string
  message: string
  subject: string
  name: string
}

interface IProps {}

type State = Readonly<{
  showThankYou: boolean
  haveError: boolean
}>

class ContactForm extends PureComponent<IProps, State> {
  readonly state = {
    showThankYou: false,
    haveError: false,
  }

  handleSubmit = async (
    values: IFormValues,
    bag: FormikActions<IFormValues>
  ) => {
    try {
      const res = await axios.post(constants.contactMeUrl, values)

      if (res.status === 200) {
        this.setState({ showThankYou: true })
      }
    } catch (error) {
      bag.setSubmitting(false)
      console.log('error', error)

      this.setState({ haveError: true })
    }
  }

  render() {
    if (this.state.showThankYou) {
      return (
        <Root>
          <ThankYouTitle>
            Thank you, I will reply to you as fast as possible.
          </ThankYouTitle>
        </Root>
      )
    }

    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={{
          email: '',
          message: '',
          name: '',
          subject: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Not a valid Email')
            .required('Email is a required field'),
          name: Yup.string()
            .min(2, 'Not long enough')
            .required('Name is a required field'),
          subject: Yup.string()
            .min(2, 'Not long enough')
            .required('Subject is a required field'),
          message: Yup.string()
            .min(2, 'Not long enough')
            .required('Message is a required field'),
        })}
      >
        {({
          handleChange,
          handleBlur,
          values,
          isSubmitting,
          isValid,
          handleSubmit,
          touched,
          errors,
        }: FormikProps<IFormValues>) => {
          if (isSubmitting) {
            return (
              <Root>
                <LoadingWrapper>
                  <Spinner />
                </LoadingWrapper>
              </Root>
            )
          }

          return (
            <Root>
              <form onSubmit={handleSubmit}>
                <InputWrapper>
                  <Input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                    placeholder="Your Name*"
                    isNotValid={!!(touched.name && errors.name)}
                    valid={touched.name && !errors.name}
                  />
                  {touched.name &&
                    errors.name && (
                      <ErrorWrapper>
                        <ErrorMessage>{errors.name}</ErrorMessage>
                      </ErrorWrapper>
                    )}
                </InputWrapper>
                <InputWrapper>
                  <Input
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="email"
                    placeholder="Your Email*"
                    isNotValid={!!(touched.email && errors.email)}
                    valid={touched.email && !errors.email}
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
                    name="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                    type="subject"
                    placeholder="Your Subject*"
                    isNotValid={!!(touched.subject && errors.subject)}
                    valid={touched.subject && !errors.subject}
                  />
                  {touched.subject &&
                    errors.subject && (
                      <ErrorWrapper>
                        <ErrorMessage>{errors.subject}</ErrorMessage>
                      </ErrorWrapper>
                    )}
                </InputWrapper>
                <InputWrapper>
                  <MessageInput
                    name="message"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.message}
                    rows={10}
                    placeholder="Your message*"
                    isNotValid={!!(touched.message && errors.message)}
                    valid={touched.message && !errors.message}
                  />
                  {touched.message &&
                    errors.message && (
                      <ErrorWrapper>
                        <ErrorMessage>{errors.message}</ErrorMessage>
                      </ErrorWrapper>
                    )}
                </InputWrapper>
                <ButtonWrapper>
                  <Button disabled={!isValid || isSubmitting} type="submit">
                    Submit
                  </Button>
                </ButtonWrapper>
              </form>
            </Root>
          )
        }}
      </Formik>
    )
  }
}

export default ContactForm
