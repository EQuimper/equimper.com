import styled from '../utils/styled'

interface IProps {
  valid?: boolean
  isNotValid?: boolean
}

const Input = styled('input')`
  ${tw(
    'focus:outline-none bg-grey-lighter appearance-none border-0 border-grey-lighter tracking-small rounded w-full py-3 px-4 text-sm text-grey-darker leading-tight sm:text-base'
  )};

  &:focus {
    box-shadow: rgba(0, 255, 240, 0.25) 0px 0px 0px 0.2rem;
    border-color: rgb(0, 255, 240);
    border-width: 1px;
  }

  ${(props: IProps) => {
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

Input.displayName = 'Input'

export default Input
