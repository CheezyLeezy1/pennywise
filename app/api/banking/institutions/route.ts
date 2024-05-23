import { getValidInstitutions } from '@/lib/utils'

export async function GET(req: Request) {
  try {
    const authResponse = await fetch('http://localhost:3000/api/banking/auth')
    const authResponseData = await authResponse.json()

    if (!authResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch auth token' }),
        {
          status: authResponse.status,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const {
      authToken,
      authTokenExpiry,
      authRefreshToken,
      authRefreshTokenExpiry,
    } = authResponseData.message

    const headers = new Headers()

    headers.append(
      'Set-Cookie',
      `authToken=${authToken}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; SameSite=Strict; Max-Age=${new Date(authTokenExpiry).getTime() / 1000}`
    )

    headers.append(
      'Set-Cookie',
      `authTokenExpiry=${authTokenExpiry}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; SameSite=Strict; Max-Age=${new Date(authTokenExpiry).getTime() / 1000}`
    )

    headers.append(
      'Set-Cookie',
      `authRefreshToken=${authRefreshToken}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; SameSite=Strict; Max-Age=${new Date(authRefreshTokenExpiry).getTime() / 1000}`
    )

    headers.append(
      'Set-Cookie',
      `authRefreshTokenExpiry=${authRefreshTokenExpiry}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; SameSite=Strict; Max-Age=${new Date(authRefreshTokenExpiry).getTime() / 1000}`
    )

    const institutionList = await getValidInstitutions(authToken)

    return new Response(JSON.stringify({ message: institutionList }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...Object.fromEntries(headers.entries()),
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'InternalServerError' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
