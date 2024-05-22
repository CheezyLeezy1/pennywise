import { NextResponse } from 'next/server'
import { BankAuthTokenResponse } from '@/lib/definitions'
import { requestToken } from '@/lib/utils'
import { cookies } from 'next/headers'

export async function GET() {
  const response: BankAuthTokenResponse = await requestToken()

  const messageObj = {
    authToken: `${response.access}`,
    authTokenExpiry: `${response.access_expires}`,
    authRefreshToken: `${response.refresh}`,
    authRefreshTokenExpiry: `${response.refresh_expires}`,
  }

  console.log(messageObj)

  return NextResponse.json({ message: messageObj }, { status: 200 })
}
