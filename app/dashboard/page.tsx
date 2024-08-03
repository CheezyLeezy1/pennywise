'use client'

import React, { Suspense } from 'react'
import { DashHeader } from '@/components/dashboard/dash-header'
import { useRouter, useSearchParams } from 'next/navigation'
import { TransactionsLoader } from '@/components/dashboard/TransactionLoader'
import WaitingScreen from '@/components/account-setup-component/waiting-screen'

const Dashboard = () => {
  const searchParams = useSearchParams()
  const accountNum = searchParams.get('accountNum')

  if (!accountNum) {
    return <div>Loading...</div>
  }

  return (
    <>
      <DashHeader accountNum={accountNum} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense
          fallback={<WaitingScreen statusMessage={'Loading Dashboard...'} />}
        >
          <TransactionsLoader accountNum={accountNum} />
        </Suspense>
      </main>
    </>
  )
}

export default Dashboard
