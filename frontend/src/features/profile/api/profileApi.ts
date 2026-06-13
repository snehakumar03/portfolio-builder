import { apiClient } from '@/lib/apiClient'
import type { PortfolioProfile, ProfileFormData } from '../types/profile.types'

export async function getProfile(): Promise<PortfolioProfile | null> {
  const response = await apiClient.get<{ data: PortfolioProfile | null }>('/profile')
  return response.data.data
}

export async function updateProfile(data: ProfileFormData): Promise<PortfolioProfile> {
  const response = await apiClient.put<{ data: PortfolioProfile }>('/profile', data)
  return response.data.data
}

export async function uploadProfilePicture(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const response = await apiClient.post<{ data: { profile_picture_url: string } }>('/profile/picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data.profile_picture_url
}
