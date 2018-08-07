export interface IProject {
  description: string
  id: string
  title: string
  url?: string
  repo?: string
  type: 'LIBRARY' | 'APP'
  techs: string[]
  text: string
  author: 'AppAndFlow' | 'MySelf'
  order?: number
}
