import client from "../api/client"
import { LoginResponse } from "../screens/LoginScreen/LoginScreen.models"
import { RegisterRequest, RegisterResponse} from "../screens/RegisterScreen/RegisterScreen.models"
import { from, Observable , of} from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { postData } from "../api/client";


const auth_url = '/api/auth'


export const login= ( 
    email: string,
    password: string
) : Observable<LoginResponse> => {
    return postData<LoginResponse>(auth_url + '/login',{ email, password})
}

export const register= ( 
     data: RegisterRequest
) : Observable<RegisterResponse> => {
    return postData<RegisterResponse>(
auth_url + '/register', data
    )

}

/*
export const register = async(
    data: RegisterRequest
) => {
    const response = await client.post(
        auth_url + '/register', data
        
    )
    return response.data
}*/