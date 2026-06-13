import { useEffect, useState } from 'react'
import { getProfile, updateProfile, uploadProfilePicture } from '../api/profileApi'
import type { ProfileFormData, SocialLink } from '../types/profile.types'

const PLATFORM_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'website', label: 'Website' },
  { value: 'twitter', label: 'Twitter' },
]

const INITIAL_FORM: ProfileFormData = {
  full_name: '',
  role: '',
  headline: '',
  about: '',
  email: '',
  phone: '',
  location: '',
  social_links: [],
}

export function ProfileBuilderPage() {
  const [formData, setFormData] = useState<ProfileFormData>(INITIAL_FORM)
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true)
      try {
        const profile = await getProfile()
        if (profile) {
          setFormData({
            full_name: profile.full_name || '',
            role: profile.role || '',
            headline: profile.headline || '',
            about: profile.about || '',
            email: profile.email || '',
            phone: profile.phone || '',
            location: profile.location || '',
            social_links: profile.social_links || [],
          })
          setProfilePicture(profile.profile_picture_url)
        }
      } catch (err) {
        console.error('Failed to load profile', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSocialChange(index: number, field: keyof SocialLink, value: string) {
    setFormData((prev) => {
      const links = [...prev.social_links]
      links[index] = { ...links[index], [field]: value }
      return { ...prev, social_links: links }
    })
  }

  function addSocialLink() {
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: 'linkedin', url: '' }],
    }))
  }

  function removeSocialLink(index: number) {
    setFormData((prev) => ({
      ...prev,
      social_links: prev.social_links.filter((_, i) => i !== index),
    }))
  }

  async function handlePictureUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await uploadProfilePicture(file)
      setProfilePicture(url)
      setMessage('Profile picture updated.')
    } catch (err) {
      setErrors({ picture: 'Failed to upload profile picture.' })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    setErrors({})
    setMessage('')

    try {
      await updateProfile(formData)
      setMessage('Profile saved successfully.')
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const apiErrors: Record<string, string> = {}
        Object.entries(err.response.data.errors).forEach(([key, value]) => {
          apiErrors[key] = Array.isArray(value) ? value[0] : String(value)
        })
        setErrors(apiErrors)
      } else {
        setErrors({ general: 'Failed to save profile.' })
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Builder</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>
      )}

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{errors.general}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow-sm p-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureUpload}
              className="text-sm text-gray-600"
            />
          </div>
          {errors.picture && <p className="mt-1 text-sm text-red-600">{errors.picture}</p>}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'full_name', label: 'Full Name *', type: 'text' },
            { id: 'role', label: 'Role / Title', type: 'text' },
            { id: 'headline', label: 'Headline', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'phone', label: 'Phone', type: 'text' },
            { id: 'location', label: 'Location', type: 'text' },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={formData[field.id as keyof ProfileFormData] as string}
                onChange={handleChange}
                required={field.id === 'full_name'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              {errors[field.id] && <p className="mt-1 text-sm text-red-600">{errors[field.id]}</p>}
            </div>
          ))}
        </div>

        {/* About */}
        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
            About
          </label>
          <textarea
            id="about"
            name="about"
            rows={5}
            value={formData.about}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
          />
          {errors.about && <p className="mt-1 text-sm text-red-600">{errors.about}</p>}
        </div>

        {/* Social Links */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Social Links</label>
            <button
              type="button"
              onClick={addSocialLink}
              className="text-sm text-primary-600 hover:underline"
            >
              + Add Link
            </button>
          </div>

          <div className="space-y-3">
            {formData.social_links.map((link, index) => (
              <div key={index} className="flex gap-3 items-start">
                <select
                  value={link.platform}
                  onChange={(e) => handleSocialChange(index, 'platform', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                >
                  {PLATFORM_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}
