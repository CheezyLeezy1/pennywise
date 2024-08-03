import { prisma } from '@/lib/prisma-client'
import { getUserEmail } from '@/lib/kindeUtils'
import { decrypt } from '@/lib/crypto/cryptoUtils'

export async function saveUserAndCredentials(
  userData: any, // Replace 'any' with an appropriate type
  credentialData: any // Replace 'any' with an appropriate type
) {
  //succeed or fail as a whole
  return prisma.$transaction(async (tx) => {
    // Check if user already exists
    let user = await tx.user.findUnique({
      where: { kindeUserId: userData.kindeUserId },
    })

    if (!user) {
      // Create user if not exists
      user = await tx.user.create({
        data: userData,
      })
    }

    // Upsert GoCardless credentials
    await tx.goCardlessCredential.upsert({
      where: { userId: user.id },
      update: credentialData,
      create: {
        ...credentialData,
        userId: user.id,
      },
    })

    return user
  })
}

export async function getUserCredentialsAndDecrypt() {
  try {
    // Step 1: Get the authenticated user's email
    const email = await getUserEmail()

    if (!email) {
      throw new Error('Email is not available')
    }

    // Step 2: Fetch the user's credentials using Prisma
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        goCardlessKeys: true,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    if (!user.goCardlessKeys) {
      throw new Error('GoCardless credentials not found')
    }

    const { secretId, secretKey } = user.goCardlessKeys

    // Step 3: Decrypt the client secret
    const decryptedClientSecret = decrypt(secretKey)

    console.log('clientId: secretId: ', secretId)
    console.log('secret: secret value, decrypted: ', decryptedClientSecret)

    return {
      clientId: secretId,
      clientSecret: decryptedClientSecret,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to get and decrypt user credentials: ${error.message}`
      )
    }
    throw new Error('An unknown error occurred')
  }
}

export async function checkIfSecretKeyExists() {
  try {
    // Get the authenticated user's email
    const email = await getUserEmail()

    if (!email) {
      throw new Error('Email is not available')
    }

    // Fetch the user's credentials using Prisma
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        goCardlessKeys: true,
      },
    })

    if (!user || !user.goCardlessKeys || !user.goCardlessKeys.secretKey) {
      console.log('user does not a secret key')
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking for secret key existence:', error)
    return false
  }
}
