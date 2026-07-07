import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import { loginSuccess, loginError, loginStart } from '../../store/auth/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showError} from '../../store/ui/uiSlice'
import styles from './LoginScreen.style'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../RegisterScreen/RegisterScreen.models'
import { login } from '../../services/auth_services'
import AppInput from '../../components/AppInput/AppInput'
import AppButton from '../../components/AppButton/AppButton'
import { useSafeArea } from '../../utils/useSafeArea'

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>




const LoginScreen = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string >('')
  const [password, setPassword] = useState<string >('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<LoginNavigationProp>()
  const {paddingTop, paddingBottom}= useSafeArea()

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      dispatch(showError("Credenziali errate"))
      return
    }

    dispatch(loginStart())
    setLoading(true)

    try {
      

      const response = await login (
        email,
        password,
      )


      

      const { user, token} = response

      dispatch(loginSuccess({ user, token }))

      await AsyncStorage.setItem('token', token)

    } catch (error: any) {
      

      dispatch(
        loginError(error.response?.data?.message || 'Errore login')
      )

      dispatch(showError('Login fallito'))
    } finally {
      setLoading(false)
    }
  }, [email, password])

  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>

      <Text style={styles.header}>
        Login
      </Text>
      <Text style={styles.subtitle}> Benvenuto, inserisci le tue credenziali per accedere all'app!</Text>
       
      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

     <AppButton
        title={loading ? 'Loading...' : 'Accedi'}
        onPress={handleLogin}
      />



      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>Non sei ancora registrato?</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen


