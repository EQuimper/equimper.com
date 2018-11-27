import React from 'react'

interface IProps {
  className?: string
}

const ArrowLeft: React.SFC<IProps> = ({ className }) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    className={className}
  >
    <polygon
      fill="currentColor"
      points="3.828 9 9.899 2.929 8.485 1.515 0 10 .707 10.707 8.485 18.485 9.899 17.071 3.828 11 20 11 20 9 3.828 9"
    />
  </svg>
)

export default ArrowLeft
