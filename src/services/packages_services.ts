import client from "../api/client"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Buffer } from "buffer"
const check_url = '/api/packages/check'

const myPackages_url= '/api/my-packages'

const packages_url= '/api/packages/'

export const postPackages = async(
    data: {
        tracking_code: string,
        pickup_point_id: number
    }
)=> {
    const response= await client.post(check_url, data)
    return response.data
}


export const getMy= async()=> {
    const response= await client.get(myPackages_url)
    return response.data
}


export const uploadReturnLabel = async (id: number, uri: string) => {
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
}


export const getReturnLabel = async (id: number): Promise<string> => {
  const token = await AsyncStorage.getItem('token')
  
  const response = await client.get(
    packages_url + id + '/return-label',
    {
      responseType: 'arraybuffer'
      }
    
  )
  const buffer= Buffer.from(response.data, 'binary').toString('base64')
  return `data:${String(response?.headers['content-type'])?.toLowerCase()};base64,${buffer}`
}


//rivedilo