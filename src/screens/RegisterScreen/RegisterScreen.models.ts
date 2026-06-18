import { User } from "../../store/auth/auth.types"

export type RegisterRequest = {
  name: string
  surname: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  address: string
}

export type RegisterResponse = {
  message: string
  user: User
  token: string
  type: string
}


export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

