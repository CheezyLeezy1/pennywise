import { cookies } from 'next/headers'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const { institutionId } = body

    const cookieStore = cookies()
    const authTokenCookie = cookieStore.get('AuthToken')

    if (!authTokenCookie) {
      throw new Error('AuthToken cookie not found')
    }

    const redirectUrl =
      process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/dashboard'
    const userLanguage = 'EN'

    const response = await fetch(
      'https://bankaccountdata.gocardless.com/api/v2/requisitions/',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokenCookie.value}`,
        },
        body: JSON.stringify({
          redirect: redirectUrl,
          institution_id: institutionId,
          user_language: userLanguage,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error processing acquisition request:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'InternalServerError' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
