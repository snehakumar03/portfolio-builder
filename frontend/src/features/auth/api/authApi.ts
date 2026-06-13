import { apiClient } from '@/lib/apiClient'
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types'

export async function register(credentials: RegisterCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', credentials)
  return response.data
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout')
}
