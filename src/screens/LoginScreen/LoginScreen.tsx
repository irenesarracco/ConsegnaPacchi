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
import { useTranslation } from 'react-i18next'


type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>




const LoginScreen = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string >('')
  const [password, setPassword] = useState<string >('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<LoginNavigationProp>()
  const {paddingTop, paddingBottom}= useSafeArea()

  const handleLogin = useCallback( () => {
    if (!email || !password) {
      dispatch(showError("Credenziali errate"))
      return
    }

    dispatch(loginStart())
    setLoading(true)

    login(email, password).subscribe({
      next: (response)=> {
        const { user, token } = response
        dispatch(loginSuccess(response))
        AsyncStorage.setItem('token', token)
      },
      error:(err)=> {
        dispatch(loginError(err.response?.data?.message || 'Errore login'))
        dispatch(showError(t('login.error'))) 
        setLoading(false)
      }
    })
  },
       [email, password])

  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>

      <Text style={styles.header}>{t('login.title')}</Text>
      <Text style={styles.subtitle}>{t('login.subtitle')}</Text>

      <AppInput
        placeholder={t('login.email')}
        value={email}
        onChangeText={setEmail}
      />
      <AppInput
        placeholder={t('login.password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <AppButton
        title={loading ? t('login.loading') : t('login.button')}
        onPress={handleLogin}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text>{t('login.register')}</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen


