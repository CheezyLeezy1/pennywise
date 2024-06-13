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

export interface KindeUser {
  id: string
  email: string
  picture: string
  fullName: string
  lastName: string
  createdOn: Date
  firstName: string
  isSuspended: boolean
  lastSignedIn: Date
  totalSignIns: number
  failedSignIns: number
}

export interface DecodedJWT {
  aud: any[]
  azp: string
  email: string
  exp: number
  iat: number
  iss: string
  jti: string
  orgCode: string
  permissions: any[]
  scp: string[]
  sub: string
}
