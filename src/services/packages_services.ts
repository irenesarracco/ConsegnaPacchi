import client from "../api/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Buffer } from "buffer"
import { Observable, from } from "rxjs"
import { map , catchError, switchMap} from "rxjs/operators"
import { postData, getData } from "../api/client"


const check_url = '/api/packages/check'

const myPackages_url= '/api/my-packages'

const packages_url= '/api/packages/'

/*export const postPackages = async(
    data: {
        tracking_code: string,
        pickup_point_id: number
    }
)=> {
    const response= await client.post(check_url, data)
    return response.data
}*/


export const postPackages= (
   data: {
        tracking_code: string,
        pickup_point_id: number
    }
) : Observable<any> => {
    return postData<any>(check_url, data)

}


/*export const getMy= async()=> {
    const response= await client.get(myPackages_url)
    return response.data
}*/

export const getMy= (
) : Observable<any> => {
    return getData<any>(myPackages_url)
}




/*export const uploadReturnLabel = async (id: number, uri: string) => {
  const formData = new FormData()
  formData.append('label', {
    uri: uri,
    name: 'etichetta.jpg',
    type: 'image/jpeg'
  } as any)
  
  const response = await client.post(
    packages_url + id + '/return-label',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}*/



export const uploadReturnLabel = (id: number, uri: string): Observable<any> => {
  const formData = new FormData()
  formData.append('label', {
    uri: uri,
    name: 'etichetta.jpg',
    type: 'image/jpeg'
  } as any)

  return from(
    client.post(packages_url + id + '/return-label', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  ).pipe(
    map(response => response.data),
    catchError(err => {
      console.error('Errore:', err)
      throw err
    })
  )
}


/*export const getReturnLabel = async (id: number): Promise<string> => {
  const token = await AsyncStorage.getItem('token')
  
  const response = await client.get(
    packages_url + id + '/return-label',
    {
      responseType: 'arraybuffer'
      }
    
  )
  const buffer= Buffer.from(response.data, 'binary').toString('base64')
  return `data:${String(response?.headers['content-type'])?.toLowerCase()};base64,${buffer}`
}*/


export const getReturnLabel = (id: number): Observable<string> => {
  return from(AsyncStorage.getItem('token')).pipe(
    switchMap(() =>
      from(
        client.get(packages_url + id + '/return-label', {
          responseType: 'arraybuffer'
        })
      )
    ),
    map(response => {
      const buffer = Buffer.from(response.data, 'binary').toString('base64')
      return `data:${String(response?.headers['content-type'])?.toLowerCase()};base64,${buffer}`
    }),
    catchError(err => {
      console.error('Errore:', err)
      throw err
    })
  )
}
