import { BankAuthTokenResponse } from '@/lib/definitions'
import { requestToken } from '@/lib/utils'

export async function GET() {
  try {
    const response: BankAuthTokenResponse = await requestToken()

    const messageObj = {
      authToken: `${response.access}`,
      authTokenExpiry: `${response.access_expires}`,
      authRefreshToken: `${response.refresh}`,
      authRefreshTokenExpiry: `${response.refresh_expires}`,
    }

    console.log(messageObj)

    return new Response(JSON.stringify({ message: messageObj }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'InternalServerError' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
