import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import { ProtectedRoute } from './features/auth/components/ProtectedRoute'
import { DashboardLayout } from './features/dashboard/components/DashboardLayout'
import { DashboardPage } from './features/dashboard/pages/DashboardPage'
import { ProfileBuilderPage } from './features/profile/pages/ProfileBuilderPage'
import { SkillsPage } from './features/skills/pages/SkillsPage'
import { useAuthStore } from './features/auth/stores/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Portfolio Builder</h1>
      <p className="text-lg text-gray-600 mb-8">Create Stunning Portfolio Websites in Minutes.</p>
      <Link
        to="/register"
        className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
      >
        Get Started — Free
      </Link>
    </div>
  )
}

function AppInitializer({ children }: { children: React.ReactNode }) {
  const hydrate = useAuthStore((state) => state.hydrate)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInitializer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/profile" element={<ProfileBuilderPage />} />
                <Route path="/dashboard/skills" element={<SkillsPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AppInitializer>
    </QueryClientProvider>
  )
}

export default App
