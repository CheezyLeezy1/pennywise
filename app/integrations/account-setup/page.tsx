// app/account-setup/page.tsx
'use client'
import WaitingScreen from '@/components/account-setup-component/waiting-screen'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { baseUrl } from '@/lib/definitions'

export default function AccountSetupPage() {
  const router = useRouter()
  const [statusMessage, setStatusMessage] = useState('Doing Something...')
  const searchParams = useSearchParams()
  const reqId = searchParams.get('ref')

  useEffect(() => {
    if (!reqId) {
      return
    }

    const fetchAccountDetails = async () => {
      try {
        setStatusMessage('Fetching account details...')

        const response = await fetch(
          `${baseUrl}/api/banking/accounts?reqId=${reqId}`
        )
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Failed to fetch account details:', errorText)
          throw new Error('F`ailed to fetch account details')
        }

        const accountData = await response.json()
        const accountNum = accountData.accounts[0] // Get the first account number

        setStatusMessage('Fetching your account...')
        router.push(`${baseUrl}/dashboard?accountNum=${accountNum}`)
      } catch (error) {
        console.error('Error:', error)
        setStatusMessage('Error fetching data')
      }
    }

    fetchAccountDetails()
  }, [reqId, router])

  return (
    <div>
      <WaitingScreen statusMessage={statusMessage} />
    </div>
  )
}
