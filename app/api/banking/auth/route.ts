import { BankAuthTokenResponse } from '@/lib/definitions'
import { requestToken } from '@/lib/utils'
import { cookies } from 'next/headers'

import { decrypt } from '@/lib/crypto/cryptoUtils'

function getAndCheckCookies() {
  const cookieStore = cookies()
  const clientId = cookieStore.get('clientId')?.value ?? ''

  const encryptedClientSecret = cookieStore.get('clientSecret')?.value ?? ''

  if (!clientId || !encryptedClientSecret) {
    throw new Error('Client ID or secret key is missing')
  }

  try {
    const decryptedSecret = decrypt(encryptedClientSecret)
    return { clientId, decryptedSecret }
  } catch (error: any) {
    throw new Error(`Failed to decrypt client secret: ${error.message}`)
  }
}

export async function GET() {
  const { clientId, decryptedSecret } = getAndCheckCookies()

  try {
    const response: BankAuthTokenResponse = await requestToken(
      clientId,
      decryptedSecret
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
    return new Response(JSON.stringify({ error: 'InternalServerError' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
