import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useSelector } from 'react-redux'
import { store } from './src/store/store'
import { RootState } from './src/store/store'
import {useState, useEffect} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import MapScreen from './src/screens/MapScreen/MapScreen'
import ServicePointScreen from './src/screens/ServicePoint/ServicePointScreen'
import PackagesScreen from './src/screens/PackagesScreen/PackagesScreen'
import client from './src/api/client'
import { loginSuccess } from './src/store/auth/authSlice'
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen'
import MyPackagesScreen from './src/screens/MyPackagesScreen/MyPackagesScreen'
import ErrorPage from './src/components/ErrorPage/ErrorPage'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomSheet from './src/components/BottomSheetModal/BottomSheetModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
import FavoriteScreen from './src/screens/FavoriteScreen/FavoriteScreen'
import ReturnsScreen from './src/screens/ReturnsScreen/ReturnsScreen'
import useNetworkStatus from './src/utils/useNetInfo'



const AuthStack = createNativeStackNavigator()
const AppStack = createNativeStackNavigator()

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name='Register' component={RegisterScreen} options={{ headerShown: true, title: 'Registrazione',  headerTitleAlign: 'center', }}/>
  </AuthStack.Navigator>
)

const AppNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name='Map' component={MapScreen}/>
    <AppStack.Screen name='ServicePoint' component={ServicePointScreen}/>
    <AppStack.Screen name= 'ProfileScreen' component={ProfileScreen}/>
    <AppStack.Screen name='Lista' component={PackagesScreen}/>
    <AppStack.Screen name='MyPackages' component={MyPackagesScreen}/>
    <AppStack.Screen name='Favorites' component={FavoriteScreen}/>
    <AppStack.Screen name='Returns' component={ReturnsScreen}/>
  </AppStack.Navigator>
)

const RootNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const isOffline= useSelector((state: RootState) => state.ui.isOffline)

  useNetworkStatus()

  if(isOffline) {
    return(
      <ErrorPage
      message= 'Nessuna connesione internet'
      onRiprova={()=> {}}
      />
    )
  }

  return isLoggedIn ? <AppNavigator /> : <AuthNavigator />
}


export default function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token')

        if(!token) {
          setIsAuthenticating(false)
          return
        }

        const refresh = await client.post('/api/auth/refresh', {},{
          headers:{
            Authorization: 'Bearer ' + token
                    }
        })

        const newToken= refresh.data.token
        await AsyncStorage.setItem('token', newToken)

        
          const response = await client.get('/api/auth/me', {
            headers: {
              Authorization: 'Bearer ' + newToken
            }
          })
          
          store.dispatch(loginSuccess({
            user: response.data,
            token: newToken
          }))
          setIsAuthenticating(false)

        
      } catch (error) {
        await AsyncStorage.removeItem('token')
        setIsAuthenticating(false)
      }
      
    }

    initAuth()
  }, [])
 

//PER PERMETTERE DI ADATTARSI
  useEffect(() => {
  ScreenOrientation.unlockAsync()
}, [])


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          { isAuthenticating? null: (
            <>

          <RootNavigator />
          <BottomSheet/>
            </>
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}