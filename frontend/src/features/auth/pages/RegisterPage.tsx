import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/authApi'
import { useAuthStore } from '../stores/authStore'

export function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
      const response = await register(formData)
      setAuth(response.data.user, response.data.token)
      navigate('/dashboard')
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const apiErrors: Record<string, string> = {}
        Object.entries(err.response.data.errors).forEach(([key, value]) => {
          apiErrors[key] = Array.isArray(value) ? value[0] : String(value)
        })
        setErrors(apiErrors)
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
        <p className="text-gray-600 mb-6">Start building your portfolio today.</p>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errors.general}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
            { id: 'username', label: 'Username', type: 'text', placeholder: 'janedoe' },
            { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            { id: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id as keyof typeof formData]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                placeholder={field.placeholder}
              />
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
