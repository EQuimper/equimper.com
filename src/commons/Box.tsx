import { color, fontSize, space, width } from 'styled-system'

import styled from '../utils/styled'

const Box = styled('div')`
  ${space}
  ${width}
  ${fontSize}
  ${color}`

Box.displayName = 'Box'

export default Box