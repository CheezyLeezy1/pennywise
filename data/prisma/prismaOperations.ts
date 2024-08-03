import { PrismaClient, Prisma, User } from '@prisma/client'
import { getUserEmail } from '@/lib/kindeUtils'
import { decrypt } from '@/lib/crypto/cryptoUtils'

const prisma = new PrismaClient()

export async function saveUserAndCredentials(
  userData: Prisma.UserCreateInput,
  credentialData: Omit<Prisma.GoCardlessCredentialCreateInput, 'user'>
): Promise<User> {
  if (!userData.email) {
    throw new Error('Email cannot be null or undefined')
  }

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

// Function to get user credentials and decrypt
export async function getUserCredentialsAndDecrypt() {
  try {
    // Step 1: Get the authenticated user's email
    const email = await getUserEmail()
    if (!email) {
      throw new Error('Email is not available')
    }

    // Step 2: Fetch the user's credentials using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
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

// Function to check if a secret key exists
export async function checkIfSecretKeyExists(): Promise<boolean> {
  try {
    // Get the authenticated user's email
    const email = await getUserEmail()
    if (!email) {
      throw new Error('Email is not available')
    }

    // Fetch the user's credentials using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        goCardlessKeys: true,
      },
    })

    if (!user || !user.goCardlessKeys || !user.goCardlessKeys.secretKey) {
      console.log('User does not have a secret key')
      return false
    }

    return true
  } catch (error) {
    console.error('Error checking for secret key existence:', error)
    return false
  }
}
