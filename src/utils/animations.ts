export const animationFromY = (
  style: any,
  withAnimation: boolean
): object | undefined =>
  withAnimation && style
    ? {
        opacity: style.opacity,
        transform: style.y.interpolate((y: number) => `translate3d(0,${y}%,0)`),
      }
    : undefined

export const animationFromX = (
  style: any,
  withAnimation: boolean
): object | undefined =>
  withAnimation && style
    ? {
        ...style,
        opacity: style.opacity,
        transform: style.x
          ? style.x.interpolate((x: number) => `translate3d(${x}%,0,0)`)
          : undefined,
      }
    : undefined
