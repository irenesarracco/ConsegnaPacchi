import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../store/auth/authSlice'
import { store } from '../store/store'
import { from, Observable } from 'rxjs'
import {map, catchError } from 'rxjs/operators'

const client = axios.create({
  baseURL: 'https://www.giovannapietricola.com/corrieri-be-test',
  headers: {
    accept: 'application/json',
  },
  timeout: 5000
})

client.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
      config.headers.Authorization = ' Bearer '+ token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


//per il token scaduto con 401

client.interceptors.response.use(
  response=> response,
  async error=> {
    if(error.response?.status=== 401){
      await AsyncStorage.removeItem('token')
      store.dispatch(logout())
    }
    return Promise.reject(error)
  }
)


export const getData = <T>(url: string) : Observable<T> => {
  return from(client.get(url)).pipe(
    map(response=> response.data as T),
    catchError(err => {throw err})
  )
}

export const putData = <T>(url: string, data?: any) : Observable<T> => {
  return from(client.put(url, data)).pipe(
    map(response=> response.data as T),
    catchError(err => {throw err})
  )
}
export const postData = <T>(url: string, data?: any) : Observable<T> => {
  return from(client.post(url, data)).pipe(
    map(response=> response.data as T),
    catchError(err => {throw err})
  )
}
export const deleteData = <T>(url: string) : Observable<T> => {
  return from(client.delete(url)).pipe(
    map(response=> response.data as T),
    catchError(err => {throw err})
  )
}

export default client