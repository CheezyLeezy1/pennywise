'use client'

import { useEffect, useState } from 'react'
import InstitutionItem from '@/components/banking/InstitutionItem'
import { institutionItem } from '@/lib/definitions'

export default function BankSelection() {
  const [institutions, setInstitutions] = useState<[]>([])

  const fetchInstitutions = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' // Assuming your API is on the same domain
      const response = await fetch(`${baseUrl}/api/banking/institutions`)
      if (!response.ok) {
        // Check for successful response (status code 200-299)
        throw new Error(`API request failed with status ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchInstitutions()
      .then((response) => setInstitutions(response.message))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return (
    <div className="w-full max-w-xl  mx-auto border border-gray-200 rounded-lg dark:border-gray-800">
      <div className="p-4 border-b">
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search banks..."
        />
      </div>

      {institutions.map((institution: institutionItem) => (
        <InstitutionItem key={institution.id} institution={institution} />
      ))}
    </div>
  )
}
