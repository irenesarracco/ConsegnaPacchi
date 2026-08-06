import { Observable} from "rxjs"
import { getData } from "../api/client"
const servicePoint_url= '/api/pickup-points'

/*export const getListaServicePoints = async()=> {
    const response= await client.get(servicePoint_url)
    return response.data
}

export const getServicePointDetail = async (id: number) => {
    const response = await client.get(servicePoint_url + '/' + id)
    return response.data
}*/

export const getListaServicePoints=(): Observable<any> => {
    return getData<any>(servicePoint_url)
    
}

export const getServicePointDetail = (
    id: number
) : Observable<any> => {
    return getData<any>(servicePoint_url + '/' + id)
   
}