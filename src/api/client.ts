import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../store/auth/authSlice'
import { store } from '../store/store'

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

export default client