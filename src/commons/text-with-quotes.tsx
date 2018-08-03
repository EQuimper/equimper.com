import styled from '../utils/styled'

const TextWithQuotes = styled('h1')`
  quotes: '“' '”' '‘' '’';

  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`

TextWithQuotes.displayName = 'TextWithQuotes'

export default TextWithQuotes
