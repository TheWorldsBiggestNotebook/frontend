import { ModeToggle } from '@/components/ui/mode-toggle'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  const [orgLogoStatus, setOrgLogoStatus] = useState<'svg' | 'png' | 'fallback'>('svg')

  const orgName: string = import.meta.env.VITE_ORG_NAME || 'Organization Name'

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      {/* Mode Toggle Section */}
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      {/* Branding Header */}
      <header className="mb-10 flex flex-row items-center gap-6 sm:gap-8">
        {/* TWBN Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="TWBN Logo.svg"
            onError={(e) => {
              e.currentTarget.onerror = null // Prevent infinite loops
              e.currentTarget.src = 'TWBN Logo.png'
            }}
            alt="TWBN Logo"
            className="h-12 w-auto"
          />
          <h1 className="text-2xl font-bold tracking-tight">The World&apos;s Biggest Notebook</h1>
        </div>

        {/* Gray separator line */}
        <div className="h-14 w-px bg-gray-300 dark:bg-gray-800" />

        {/* Organization Section */}
        <div className="flex flex-col items-center gap-2">
          {orgLogoStatus === 'fallback' ? (
            <Building2 strokeWidth={1} className="h-12 w-auto" />
          ) : (
            <img
              src={orgLogoStatus === 'svg' ? 'Organization Logo.svg' : 'Organization Logo.png'}
              onError={() => {
                if (orgLogoStatus === 'svg') setOrgLogoStatus('png')
                else setOrgLogoStatus('fallback')
              }}
              alt="Organization Logo"
              className="h-12 w-auto"
            />
          )}
          <h2 className="text-2xl font-bold tracking-tight">{orgName}</h2>
        </div>
      </header>

      {/* Forms Area */}
      <main className="w-full sm:max-w-md">
        <Outlet />
      </main>
    </div>
  )
}
