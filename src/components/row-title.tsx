import React from 'react'

import styled from '../utils/styled'

const Wrapper = styled('div')`
  ${tw('mb-8')};
`

const Title = styled('h1')`
  ${tw('text-grey text-sm uppercase tracking-wide')};
`

interface IProps {
  title: string
}

const RowTitle = ({ title }: IProps) => (
  <Wrapper>
    <Title>{title}</Title>
  </Wrapper>
)

export default RowTitle
