import styled from '../utils/styled'

const Input = styled('input')`
  ${tw(
    'focus:outline-none focus:shadow-outline bg-grey-lighter appearance-none border-0 border-grey-lighter rounded w-full py-3 px-4 text-sm text-grey-darker leading-tight sm:text-base'
  )};
`

Input.displayName = 'Input'

export default Input
