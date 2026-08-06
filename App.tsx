import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider, useSelector } from 'react-redux'
import { store } from './src/store/store'
import { RootState } from './src/store/store'
import {useState, useEffect} from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Notifications from 'expo-notifications'
import './src/i18n/index'

import LoginScreen from './src/screens/LoginScreen/LoginScreen'
import MapScreen from './src/screens/MapScreen/MapScreen'
import ServicePointScreen from './src/screens/ServicePoint/ServicePointScreen'
import client from './src/api/client'
import { loginSuccess } from './src/store/auth/authSlice'
import RegisterScreen from './src/screens/RegisterScreen/RegisterScreen'
import MyPackagesScreen from './src/screens/MyPackagesScreen/MyPackagesScreen'
import ErrorPage from './src/components/ErrorPage/ErrorPage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from './src/screens/MapScreen/MapScreen.models'
import { useNavigation } from '@react-navigation/native'


import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomSheet from './src/components/BottomSheetModal/BottomSheetModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen'
import * as ScreenOrientation from 'expo-screen-orientation'
import FavoriteScreen from './src/screens/FavoriteScreen/FavoriteScreen'
import ReturnsScreen from './src/screens/ReturnsScreen/ReturnsScreen'
import useNetworkStatus from './src/utils/useNetInfo'
import { createNavigationContainerRef } from '@react-navigation/native'



export const navigationRef = createNavigationContainerRef()



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
    <AppStack.Screen name='MyPackages' component={MyPackagesScreen}/>
    <AppStack.Screen name='Favorites' component={FavoriteScreen}/>
    <AppStack.Screen name='Returns' component={ReturnsScreen}/>

  </AppStack.Navigator>
)

const RootNavigator = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const isOffline= useSelector((state: RootState) => state.ui.isOffline)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [notificationError, setNotificationError] = useState(false)

  useNetworkStatus()

  
   useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data
      const navigationState = navigationRef.getState()
      const routes= navigationState.routeNames
      if (!data) return
      if (!routes.includes(data.screen as any)) {
        setNotificationError(true)  // ← mostra ErrorPage
        return
      }
        navigation.navigate(data.screen as any, data.params )     
    })
    return () => subscription.remove()
  }, [])


  if(isOffline) {
    return(
      <ErrorPage
      message= 'Nessuna connesione internet'
      //onRiprova={()=> {}}
      />
    )
  }

   if (notificationError) {
    return <ErrorPage 
      message='Schermata non trovata' 
      onRiprova={() => setNotificationError(false)}
      titleButton='Vai alla Home'
    />
  }

 // return isLoggedIn ? <AppNavigator /> : <AuthNavigator 
 return <AppNavigator/>
}



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

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




  async function registraPerNotifiche() {
  const permesso = await Notifications.requestPermissionsAsync()
  
 
  if (permesso.status !== 'granted') {
    console.log('utente ha negato il permesso')
    return
  }
  
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: "b7190716-069b-422a-ada5-4b8f83359653"
  })
 
  console.log('TOKEN:', token.data)
}


useEffect(() => {
  registraPerNotifiche()
}, [])






  

 

//PER PERMETTERE DI ADATTARSI
  useEffect(() => {
  ScreenOrientation.unlockAsync()
}, [])


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
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


//javascript/typescript
//capire cosa fa typescript sotto (per imparare ad individuare problemi, capire cosa succede ad app quando viene buildata)
//typescript aggiunge layer al codice per convertire codice
//capire:
//come funziona, come viene gestite a livello di dipendenze,
//interface, type, multitype, (any, enum, var, let, const)
//leggi anche come javascript va poi effettivamente ad interpretare
//packagejson=> capire cosa serve a typescript: dipendenze...


//VEDI SEMPRE SU TYPESCRIPT:
//concetto di classe IMPORTANTE
//un'applicazione della classe è: singletone pattern
//modulo

//nel mio progetto:
//modulo per i favorite, classe non puoi(ma rimane concetto teorico),


//roberto ciancia  senior manager


//Cose da vedere per progetto
//observable pattern
//rxjs (generalmente usata su angular (framework per react programmiing)) applicatosu observable
//
