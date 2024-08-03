'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/components/loading-component'
import { setSecureAuthCookies } from '@/app/actions'
import { baseUrl } from '@/lib/definitions'

export default function SetupPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/banking/auth`)
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (
          data.message &&
          data.message.authToken &&
          data.message.authTokenExpiry &&
          data.message.authRefreshToken &&
          data.message.authRefreshTokenExpiry
        ) {
          const authToken = data.message.authToken
          const refreshToken = data.message.authRefreshToken

          await setSecureAuthCookies(authToken, refreshToken)

          // Redirect to the next page
          router.push(`${baseUrl}/integrations/bank-selection`)
        } else {
          throw new Error('Invalid authentication data')
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthData()
  }, [router])

  if (loading) {
    return <LoadingComponent />
  }

  if (error) {
    return <div>Error: {error}</div>
  }
}
