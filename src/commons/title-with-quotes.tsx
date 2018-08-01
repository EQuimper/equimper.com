import styled from '../utils/styled'

const TitleWithQuotes = styled('h1')`
  quotes: '“' '”' '‘' '’';

  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`

TitleWithQuotes.displayName = 'TitleWithQuotes'

export default TitleWithQuotes
