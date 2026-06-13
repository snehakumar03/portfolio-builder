import { useAuthStore } from '@/features/auth/stores/authStore'

export function DashboardPage() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome back, <strong>{user?.name}</strong>!
        </p>
        <p className="text-sm text-gray-500 mb-6">Username: {user?.username}</p>

        <button
          onClick={() => {
            logout()
            window.location.href = '/login'
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
