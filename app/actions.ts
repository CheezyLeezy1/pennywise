'use server'

import { z } from 'zod'
import { encrypt } from '@/lib/crypto/cryptoUtils'
import { saveUserAndCredentials } from '@/data/prisma/prismaOperations'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { cookies } from 'next/headers'

// Define the authentication schema
const authSchema = z.object({
  clientId: z.string().min(36, 'Client ID must be at least 36 characters long'),
  secretKey: z
    .string()
    .min(128, 'Secret Key must be at least 128 characters long'),
})

// Main function to create credentials
export async function createCredentials(formData: FormData) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession()

    const isAuth = await isAuthenticated()
    const user = await getUser()

    if (!isAuth || !user) {
      throw new Error('User is not authenticated')
    }

    const formObject = Object.fromEntries(formData.entries())
    const secretId = formData.get('clientId')?.toString() ?? ''

    const secretKey = formData.get('secretKey')?.toString() ?? ''

    if (!secretKey) {
      throw new Error('Secret key is missing or invalid')
    }

    const encryptedSecret = await encrypt(secretKey)

    const validation = authSchema.safeParse(formObject)
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors }
    }

    const userData = {
      email: user.email,
      kindeUserId: user.id,
    }

    const credentialData = {
      secretId: formObject.clientId,
      secretKey: encryptedSecret,
    }

    await saveUserAndCredentials(userData, credentialData)

    const something = await setSecureCookies(secretId, encryptedSecret)
    console.log('something:', something)
    return { success: true }
  } catch (error: any) {
    console.error('Error creating credentials:', error)
    return { success: false, errors: error.errors || error.message }
  }
}
export async function setSecureCookies(clientId: string, clientSecret: string) {
  cookies().set({
    name: 'clientId',
    value: clientId,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true, // send over https
    maxAge: 90 * 60,
    path: '/',
  })

  cookies().set({
    name: 'clientSecret',
    value: clientSecret,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true, // send over https
    maxAge: 90 * 60,
    path: '/',
  })
}

export async function setSecureAuthCookies(
  AuthToken: string,
  AuthRefreshToken: string
) {
  cookies().set({
    name: 'AuthToken',
    value: AuthToken,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true, // send over https
    maxAge: 90 * 60,
    path: '/',
  })

  cookies().set({
    name: 'AuthRefreshToken',
    value: AuthRefreshToken,
    httpOnly: true,
    sameSite: 'strict',
    // secure: true, // send over https
    maxAge: 90 * 60,
    path: '/',
  })
}
