import React from 'react'
import { animated, Transition } from 'react-spring'

const PageTransition: React.SFC<{}> = props => (
  <Transition
    native
    from={{ opacity: 0, transform: 'translate3d(100%, 0, 0)' }}
    enter={{ opacity: 1, transform: 'translate3d(0%, 0, 0)' }}
    leave={{ opacity: 0, transform: 'translate3d(-50%, 0, 0)' }}
  >
    {(styles: any) => (
      <animated.div style={styles}>{props.children}</animated.div>
    )}
  </Transition>
)

export default PageTransition
