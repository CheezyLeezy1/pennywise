import { cookies } from 'next/headers'

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  console.log('hereeeee....')

  const body = await req.json()
  const { institutionId } = body

  const cookieStore = cookies()

  let accessToken = cookieStore.get('authToken')
  const allaDem = cookieStore.getAll()
  console.log(allaDem)
  console.log('accessToken', accessToken)
  const authToken = accessToken?.value

  console.log('Authorization: Bearer', authToken)

  const redirectUrl =
    process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/dashboard'
  const userLanguage = 'EN'

  try {
    const response = await fetch(
      'https://bankaccountdata.gocardless.com/api/v2/requisitions/',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          redirect: redirectUrl,
          institution_id: institutionId,
          user_language: userLanguage,
        }),
      }
    )

    const data = await response.json()

    console.log('acquisition-data: ', data)

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: accessToken }), {
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
