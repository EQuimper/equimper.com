import React from 'react'

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

type State = Readonly<{
  scrollHeight: number
}>

class ScrollingProgress extends React.PureComponent<IProps, State> {
  state = {
    scrollHeight: 0,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight

    const scrolled = (winScroll / height) * 100

    this.setState({
      scrollHeight: scrolled,
    })
  }

  render() {
    return (
      <BarWrapper hidden={!this.props.showProgress}>
        <Bar style={{ width: `${this.state.scrollHeight}%` }} />
      </BarWrapper>
    )
  }
}

export default ScrollingProgress
