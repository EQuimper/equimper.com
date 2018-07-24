declare function tw(string): string

declare module 'typeface-lato'
declare module 'gatsby-image'
declare module 'react-portal'

declare interface IReactPortalProps {
  openPortal: () => void
  portal: (node: React.ReactNode) => void
  isOpen: boolean
  closePortal: () => void
}
