import React from 'react'

interface IProps {
  className?: string
}

const Menu: React.SFC<IProps> = ({ className }) => (
  <svg
    aria-hidden="true"
    role="img"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <path fill="currentColor" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
)

export default Menu
