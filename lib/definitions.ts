export type BankAuthTokenResponse = {
  access: string
  access_expires: number
  refresh: string
  refresh_expires: number
}

export type institutionItem = {
  id: string
  name: string
  bic: string
  transaction_total_days: string
  countries: string[]
  logo: string
}

export type AuthResponse = {
  authToken: string
  authTokenExpiry: string
  authRefreshToken: string
  authRefreshTokenExpiry: string
}
