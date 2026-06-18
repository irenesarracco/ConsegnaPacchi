import client from "../api/client"
import { LoginResponse } from "../screens/LoginScreen/LoginScreen.models"
import { RegisterRequest } from "../screens/RegisterScreen/RegisterScreen.models"

const auth_url = '/api/auth'


export const login= async( 
    email: string,
    password: string
) : Promise<LoginResponse> => {
    const response = await client.post<LoginResponse>(
    auth_url + '/login',
    {
      email,
      password,
    }
  )

  return response.data
}


export const register = async(
    data: RegisterRequest
) => {
    const response = await client.post(
        auth_url + '/register', data
        
    )
    return response.data
}