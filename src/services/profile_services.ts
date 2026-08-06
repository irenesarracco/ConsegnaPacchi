import client, {getData, putData} from "../api/client"
import { from, Observable } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { User, UserProfile, UserUpdateData } from "../store/auth/auth.types"


const profile_url= '/api/profile'

/*export const getProfile = async()=>{
    const response = await client.get(profile_url)
    return response.data
}

export const updateProfile = async(
    data: any
) => {
    const response = await client.put(profile_url, data)
    return response.data
}*/



export const getProfile= (
) : Observable<UserProfile> => {
    return getData<UserProfile>(profile_url)

}

export const updateProfile= 
    (data: Partial<UserUpdateData>): Observable<any> => {
    return putData<any>(profile_url, data)

}