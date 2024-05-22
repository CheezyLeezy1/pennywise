import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getValidInstitutions } from '@/lib/utils'

export async function GET() {
  const authResponse = await fetch('http://localhost:3000/api/banking/auth')
  const authResponseData = await authResponse.json()

  if (!authResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch auth token' },
      { status: authResponse.status }
    )
  }

  const {
    authToken,
    authTokenExpiry,
    authRefreshToken,
    authRefreshTokenExpiry,
  } = authResponseData.message

  cookies().set('authToken', authToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: new Date(authTokenExpiry).getTime(),
  })

  cookies().set('authTokenExpiry', authTokenExpiry, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: new Date(authTokenExpiry).getTime(),
  })

  cookies().set('authRefreshToken', authRefreshToken, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: new Date(authRefreshTokenExpiry).getTime(),
  })

  cookies().set('authRefreshTokenExpiry', authRefreshTokenExpiry, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: new Date(authRefreshTokenExpiry).getTime(),
  })

  const institutionList = await getValidInstitutions(authToken)

  return NextResponse.json({ message: institutionList }, { status: 200 })
}
