
export const getLocalStorageTokens = () => {
  const refreshToken = localStorage.getItem('refresh-token')
  const accessToken = localStorage.getItem('access-token')
  return {
    refreshToken,
    accessToken
  }
}

export const setLocalStorageTokens = (tokens) => {
  for (let i = 0; i < tokens.length; i++) {
    localStorage.setItem(tokens[i].key, tokens[i].value)
  }
}
