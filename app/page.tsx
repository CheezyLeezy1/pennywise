// app/page.tsx
import Header from '@/components/header'
import Footer from '@/components/footer'
import FeatureSection from '@/components/feature-section'
import IntroSection from '@/components/intro-section'

export default function Page({}) {
  return (
    <>
      <main className="flex min-h-screen bg-gray-50 flex-col p-6">
        <IntroSection />
        <FeatureSection />
      </main>
    </>
  )
}
