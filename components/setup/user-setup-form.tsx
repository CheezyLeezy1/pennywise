'use client'

import React, { useState } from 'react'
import { createCredentials } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/lib/definitions'

export function UserSetupForm() {
  const [errors, setErrors] = useState({ clientId: '', secretKey: '' })
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)

    // Clear existing errors
    setErrors({ clientId: '', secretKey: '' })

    const result = await createCredentials(formData)
    if (result.success) {
      router.push(`${baseUrl}/integrations/setup`)
    } else {
      // Update error messages
      const newErrors = result.errors
        ? result.errors
        : { general: result.errors }
      setErrors(newErrors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <label
          htmlFor="clientId"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Client ID
        </label>
        <input
          type="text"
          id="clientId"
          name="clientId"
          autoComplete="off"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter your Client ID"
        />
        {errors.clientId && <p className="text-red-500">{errors.clientId}</p>}
      </div>
      <div className="space-y-6">
        <label
          htmlFor="secretKey"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Secret Key
        </label>
        <input
          type="password"
          id="secretKey"
          name="secretKey"
          autoComplete="off"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter your Secret Key"
        />
        {errors.secretKey && <p className="text-red-500">{errors.secretKey}</p>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
    >
      Authenticate
    </button>
  )
}
