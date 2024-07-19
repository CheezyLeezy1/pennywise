import { BankAuthTokenResponse } from '@/lib/definitions'
import { requestToken } from '@/lib/utils'
import { getUserCredentialsAndDecrypt } from '@/data/prisma/prismaOperations'

export async function GET() {
  const { clientId, clientSecret } = await getUserCredentialsAndDecrypt()

  try {
    const response: BankAuthTokenResponse = await requestToken(
      clientId,
      clientSecret
    )

    const messageObj = {
      authToken: `${response.access}`,
      authTokenExpiry: `${response.access_expires}`,
      authRefreshToken: `${response.refresh}`,
      authRefreshTokenExpiry: `${response.refresh_expires}`,
    }

    return new Response(JSON.stringify({ message: messageObj }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log('error encountered: ', error)
    return new Response(JSON.stringify({ error: 'InternalServerError' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
