import { getValidInstitutions } from '@/lib/utils'
import { cookies } from 'next/headers'

function getCookies(): string {
  try {
    const cookieStore = cookies();
    const authTokenCookie = cookieStore.get('AuthToken')

    if (!authTokenCookie) {
      throw new Error('Cannot find authToken.')
    }

    return authTokenCookie.value
  } catch (error) {
    console.error('Error retrieving cookies:', error)
    throw new Error('Failed to retrieve cookies.')
  }
}

export async function GET() {
  try {
    const authToken = getCookies()
    const institutionList = await getValidInstitutions(authToken)
    return new Response(JSON.stringify({ message: institutionList }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in GET handler:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
