import client from "../api/client"
import { Observable, from } from "rxjs"
import { map, catchError } from "rxjs/operators"
import { getData, postData, deleteData } from "../api/client"


const favorite_url= '/api/favorites'

/*export const getFavorites = async()=> {
    const response = await client.get(favorite_url)
    return response.data
}*/

export const getFavorites= () : Observable<any> => {
    return getData<any>(favorite_url)

}


/*export const addFavorites= async(
    data: {pickup_point_id: number}
)=> {
    const response = await client.post(favorite_url, data
        
    )
    return response.data
}*/

export const addFavorites= (
    data: {pickup_point_id: number}
) : Observable<any> => {
    return postData<any>(favorite_url, data)

}




/*export const deleteFavorites = async(
    id: number
)=> {
    const response = await client.delete(favorite_url + '/' +id)
    return response.data
}*/

export const deleteFavorites= (
    id: number
) : Observable<any> => {
    return deleteData<any>(favorite_url + '/' +id)

}