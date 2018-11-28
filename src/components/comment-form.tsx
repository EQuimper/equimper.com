import axios from 'axios'
import { Formik, FormikActions, FormikProps } from 'formik'
import qs from 'qs'
import React, { PureComponent } from 'react'
import * as Yup from 'yup'

import Input from '../commons/input'
import { GithubApi } from '../services/GithubApi'
import { constants } from '../utils/constants'
import styled from '../utils/styled'
import Spinner from './spinner'

const Root = styled('div')`
  ${tw('bg-white rounded shadow p-4 mb-6')};
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

const TitleWrapper = styled('div')`
  ${tw('mb-8')};
`

const Title = styled('h2')`
  ${tw('text-grey-darker m-0 text-lg font-bold text-left tracking-wide')};
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

const CheckBox = styled('input')`
  ${tw('appearance-none')};

  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked {
    display: block;
  }
`

interface ICheckBoxProps {
  disabled: boolean
}

const CheckBoxWrapper = styled('label')`
  cursor: ${(props: ICheckBoxProps) =>
    props.disabled ? 'not-allowed' : 'pointer'};
`

const CheckBoxTitle = styled('span')`
  ${tw('text-sm tracking-small')};

  ${(props: ICheckBoxProps) =>
    props.disabled ? tw('text-grey') : tw('text-grey-darker')};
`

interface IIndicatorProps {
  isChecked: boolean
}

const Indicator = styled('div')`
  ${tw('rounded')};

  ${(props: IIndicatorProps) =>
    props.isChecked ? tw('bg-blue-lighter') : 'bg-grey-lighter'};

  ${(props: IIndicatorProps) =>
    !props.isChecked && 'border: 0.5px solid var(--grey)'};
`

const ThankYouTitle = styled('h3')`
  ${tw('text-grey-darker font-bold text-base text-center')};
`

interface IFormValues {
  email: string
  comment: string
  name: string
  notification: boolean
}

interface IProps {
  slug: string
}

type State = Readonly<{
  showThankYou: boolean
  haveError: boolean
  notificationIsHover: boolean
}>

class CommentForm extends PureComponent<IProps, State> {
  readonly state = {
    showThankYou: false,
    haveError: false,
    notificationIsHover: false,
  }

  notificationHoverTimeout?: NodeJS.Timer

  onNotificationHover = () => {
    this.notificationHoverTimeout = setTimeout(() => {
      this.setState({ notificationIsHover: true })
    }, 500)
  }

  onHoverNotificationOut = () => {
    if (this.notificationHoverTimeout) {
      clearTimeout(this.notificationHoverTimeout)
    }
    this.setState({ notificationIsHover: false })
  }

  handleSubmit = async (
    values: IFormValues,
    bag: FormikActions<IFormValues>
  ) => {
    try {
      const message = await GithubApi.parseToMarkdown(values.comment)

      const options: { subscribe?: string } = {}

      if (values.notification) {
        options.subscribe = values.email
      }

      const data = qs.stringify({
        fields: {
          email: values.email,
          message,
          name: values.name,
          slug: this.props.slug,
        },
        options,
      })

      const res = await axios.post(`${constants.staticManUrl}/comments`, data, {
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      })

      console.log('res', res)

      if (res.status === 200) {
        this.setState({
          showThankYou: true,
        })
      }
    } catch (error) {
      bag.setSubmitting(false)
      console.log('error', error)

      this.setState({ haveError: true })
    }
  }

  onSecondCommentClick = () => {
    this.setState({ showThankYou: false })
  }

  render() {
    if (this.state.showThankYou) {
      return (
        <Root>
          <ThankYouTitle>
            Thank you, I will reviewed your comment. It will show on the site
            once it has been approved.
          </ThankYouTitle>
          <div>
            <Button
              type="submit"
              aria-label="Send another comment"
              onClick={this.onSecondCommentClick}
            >
              Send another comment
            </Button>
          </div>
        </Root>
      )
    }

    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={{
          email: '',
          comment: '',
          name: '',
          notification: false,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Not a valid Email')
            .required('Email is a required field'),
          name: Yup.string()
            .min(2, 'Not long enough')
            .required('Name is a required field'),
          comment: Yup.string()
            .min(2, 'Not long enough')
            .required('Comment is a required field'),
          notification: Yup.boolean(),
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

          const emailIsValid = values.email.length > 0 && !errors.email

          return (
            <Root>
              <TitleWrapper>
                <Title>Add a new Comment</Title>
              </TitleWrapper>

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
                  {touched.name && errors.name && (
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
                  {touched.email && errors.email && (
                    <ErrorWrapper>
                      <ErrorMessage>{errors.email}</ErrorMessage>
                    </ErrorWrapper>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <MessageInput
                    name="comment"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    rows={10}
                    placeholder="Your Comment* (markdown is accepted)"
                    isNotValid={!!(touched.comment && errors.comment)}
                    valid={touched.comment && !errors.comment}
                  />
                  {touched.comment && errors.comment && (
                    <ErrorWrapper>
                      <ErrorMessage>{errors.comment}</ErrorMessage>
                    </ErrorWrapper>
                  )}
                </InputWrapper>
                <InputWrapper>
                  <CheckBoxWrapper
                    className="control control--checkbox"
                    disabled={!emailIsValid}
                    onMouseOver={this.onNotificationHover}
                    onMouseOut={this.onHoverNotificationOut}
                  >
                    <CheckBox
                      name="notification"
                      onChange={handleChange}
                      checked={values.notification}
                      type="checkbox"
                      disabled={!emailIsValid}
                    />
                    <Indicator
                      isChecked={values.notification}
                      className="control__indicator"
                    />

                    <CheckBoxTitle disabled={!emailIsValid}>
                      Notify me of new comments by email!
                    </CheckBoxTitle>
                    {!emailIsValid && this.state.notificationIsHover && (
                      <ErrorWrapper>
                        <ErrorMessage>
                          {values.email.length === 0
                            ? 'To be able to check, you must provide a email'
                            : 'To be able to check, you must provide a valid email'}
                        </ErrorMessage>
                      </ErrorWrapper>
                    )}
                  </CheckBoxWrapper>
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

export default CommentForm
