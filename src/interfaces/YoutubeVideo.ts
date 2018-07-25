export interface IYoutubeVideo {
  id: string
  title: string
  description: string
  thumbnail: {
    url: string
    height: number
    width: number
  }
  channelTitle: string
  publishedAt: string
  localThumbnail: {
    childImageSharp: {
      resolutions: any
      fluid: any
    }
  }
}
