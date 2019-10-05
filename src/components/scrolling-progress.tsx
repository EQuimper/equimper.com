import React, { useEffect, useState } from 'react'

import styled from '../utils/styled'

const BarWrapper = styled('div')`
  height: 4px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
`

const Bar = styled('span')`
  background: var(--secondary);
  height: 4px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 0;
  box-shadow: 1px 1px 1px whitesmoke;
`

interface IProps {
  showProgress: boolean
}

const ScrollingProgress: React.FC<IProps> = ({ showProgress }) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0)

  const listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = (winScroll / height) * 100

    setScrollHeight(scrolled)
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)

    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  }, [])

  return (
    <BarWrapper hidden={!showProgress}>
      <Bar style={{ width: `${scrollHeight}%` }} />
    </BarWrapper>
  )
}

export default ScrollingProgress
