export interface User {
  id: number
  name: string
  username: string
  email: string
  created_at: string
}

export interface AuthResponse {
  data: {
    user: User
    token: string
  }
}

export interface RegisterCredentials {
  name: string
  username: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginCredentials {
  email: string
  password: string
}
