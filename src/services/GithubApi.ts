import axios from 'axios'

const baseUrl = 'https://api.github.com'

const parseToMarkdown = async (text: string) => {
  const path = `${baseUrl}/markdown`

  const body = {
    text,
    mode: 'markdown',
  }

  try {
    const res = await axios.post(path, body)

    return res.data as string
  } catch (error) {
    throw error
  }
}

export const GithubApi = {
  parseToMarkdown,
}
