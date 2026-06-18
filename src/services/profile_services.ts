import client from "../api/client"


const profile_url= '/api/profile'

export const getProfile = async()=>{
    const response = await client.get(profile_url)
    return response.data
}

export const updateProfile = async(
    data: any
) => {
    const response = await client.put(profile_url, data)
    return response.data
}