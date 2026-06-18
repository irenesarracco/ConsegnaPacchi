import { User } from "../../store/auth/auth.types"

export type LoginRequest ={
    email: string
    password: string
}

export type LoginResponse={
    message:string
    user: User
    token: string
    type: string
}