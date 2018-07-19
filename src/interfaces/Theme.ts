export interface ITheme {
  breakpoints: Array<string | number>
  space: Array<string | number>
  fontSizes: Array<string | number>
  fontWeights: Array<string | number>
  lineHeights: {
    solid: number
    title: number
    copy: number
  }
  letterSpacings: {
    normal: string
    tracked: string
    tight: string
    mega: string
  }
  fonts: {
    serif: string
    sansSerif: string
  }
  borders: Array<string | number>
  radii: Array<string | number>
  width: Array<string | number>
  heights: Array<string | number>
  maxWidths: Array<string | number>
  colors: {
    black: string
    'near-black': string
    'dark-gray': string
    'mid-gray': string
    gray: string
    'gray-lighter': string
    silver: string
    'light-silver': string
    'moon-gray': string
    'light-gray': string
    'near-white': string
    white: string
    transparent: string
    blacks: string[]
    whites: string[]
  }
}
