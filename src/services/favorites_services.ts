import client from "../api/client"

const favorite_url= '/api/favorites'

export const getFavorites = async()=> {
    const response = await client.get(favorite_url)
    return response.data
}

export const addFavorites= async(
    data: {pickup_point_id: number}
)=> {
    const response = await client.post(favorite_url, data
        
    )
    return response.data
}


export const deleteFavorites = async(
    id: number
)=> {
    const response = await client.delete(favorite_url + '/' +id)
    return response.data
}