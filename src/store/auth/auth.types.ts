export type User = {
  id: number
  name: string
  surname: string
  email: string
  phone: string
  address: string
  created_at: string
  updated_at: string
}

export type AuthState = {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean
  error: string | null
}