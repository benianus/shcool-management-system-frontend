export function saveTokenInLocalStorage(token: string) {
  localStorage.setItem('token', token)
}

export function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem('token') ?? null
}
