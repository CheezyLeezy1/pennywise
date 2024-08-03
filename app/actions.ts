'use server'

import { z } from 'zod'
import { encrypt } from '@/lib/crypto/cryptoUtils'
import { saveUserAndCredentials } from '@/data/prisma/prismaOperations'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { cookies } from 'next/headers'
import { Prisma } from '@prisma/client'

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

    if (!user.email) {
      throw new Error('User email is not available')
    }

    const formObject = Object.fromEntries(formData.entries())

    // Validate form data using zod
    const validation = authSchema.safeParse(formObject)
    if (!validation.success) {
      return { success: false, errors: validation.error.flatten().fieldErrors }
    }

    const secretKey = formObject.secretKey?.toString() ?? ''
    const encryptedSecret = await encrypt(secretKey)

    const userData = {
      email: user.email!,
      kindeUserId: user.id,
    }

    const secretId = formObject.clientId?.toString() ?? ''
    if (!secretId) {
      throw new Error('Client ID is missing or invalid')
    }

    const credentialData = {
      secretId,
      secretKey: encryptedSecret,
    }

    await saveUserAndCredentials(userData, credentialData)
    return { success: true }
  } catch (error: any) {
    console.error('Error creating credentials:', error)
    return { success: false, errors: error.message }
  }
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
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 90 * 60,
    path: '/',
  })

  cookies().set({
    name: 'AuthRefreshToken',
    value: AuthRefreshToken,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    path: '/',
  })
}
