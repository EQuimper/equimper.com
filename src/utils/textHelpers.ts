export const pluralize = (
  num: number,
  singularWord: string,
  pluralWord: string
) => {
  if (num > 1) {
    return pluralWord
  }

  return singularWord
}
