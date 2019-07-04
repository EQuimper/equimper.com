// tslint:disable-next-line
declare function tw(string): string

declare module 'typeface-lato'
declare module 'typeface-inter'
declare module 'gatsby-image'
declare module 'react-portal'
declare module 'react-headroom'
declare module 'gatsby-plugin-disqus'
declare module '*.png'

declare interface IReactPortalProps {
  openPortal: () => void
  portal: (node: React.ReactNode) => void
  isOpen: boolean
  closePortal: () => void
}
