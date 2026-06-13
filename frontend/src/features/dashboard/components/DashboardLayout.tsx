import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/stores/authStore'

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/dashboard/profile', label: 'Profile' },
]

export function DashboardLayout() {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Portfolio Builder
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-3 truncate">{user?.email}</div>
          <button
            onClick={() => {
              logout()
              window.location.href = '/login'
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
