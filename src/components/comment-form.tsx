import axios from 'axios'
import { Formik, FormikActions, FormikProps } from 'formik'
import qs from 'qs'
import React, { PureComponent } from 'react'
import * as Yup from 'yup'

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

const Input = styled('input')`
  ${tw(
    'bg-grey-lighter appearance-none border-0 border-grey-lighter rounded w-full py-2 px-3 text-sm text-grey-darker leading-tight sm:text-base sm:py-3 sm:px-4'
  )};
`

const MessageInput = styled('textarea')`
  ${tw(
    'bg-grey-lighter appearance-none border-0 border-grey-lighter rounded w-full py-2 px-3 text-sm text-grey-darker leading-tight sm:text-base sm:py-3 sm:px-4'
  )};

  resize: vertical;
`

const ButtonWrapper = styled('div')``

const Button = styled('button')`
  ${tw(
    'w-full text-white text-sm font-bold py-2 px-4 rounded border-0 cursor-pointer bg-green-light bg-green-light sm:text-base sm:py-3 sm:px-5'
  )};

  &:disabled {
    ${tw('bg-grey cursor-not-allowed')};
  }
`

const TitleWrapper = styled('div')`
  ${tw('mb-8')};
`

const Title = styled('h3')`
  ${tw('text-grey-darker m-0 text-left')};
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

const CheckBoxWrapper = styled('label')``

const CheckBoxTitle = styled('span')`
  ${tw('text-sm text-grey-dark')};
`

const Indicator = styled('div')`
  ${tw('rounded bg-grey-lighter')};
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
}>

class CommentForm extends PureComponent<IProps, State> {
  readonly state = {
    showThankYou: false,
    haveError: false,
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
          <h3>
            Thank you, I will reviewed your comment. It will show on the site
            once it has been approved.
          </h3>
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
                  />
                  {touched.email &&
                    errors.email && (
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
                  />
                  {touched.comment &&
                    errors.comment && (
                      <ErrorWrapper>
                        <ErrorMessage>{errors.comment}</ErrorMessage>
                      </ErrorWrapper>
                    )}
                </InputWrapper>
                <InputWrapper>
                  <CheckBoxWrapper className="control control--checkbox">
                    <CheckBox
                      name="notification"
                      onChange={handleChange}
                      checked={values.notification}
                      type="checkbox"
                    />
                    <Indicator className="control__indicator" />
                    <CheckBoxTitle>
                      Notify me of new comments by email!
                    </CheckBoxTitle>
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
