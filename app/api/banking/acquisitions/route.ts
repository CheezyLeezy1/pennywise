import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log('hereeeee....')

  const { institutionId } = req.body

  const cookieStore = cookies()

  let accessToken = cookieStore.get('authToken')
  const allaDem = cookies().getAll()
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
      return NextResponse.json({ error: data }, { status: response.status })
    }

    return NextResponse.json({ message: accessToken }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'InternalServerError' }, { status: 500 })
  }
}
