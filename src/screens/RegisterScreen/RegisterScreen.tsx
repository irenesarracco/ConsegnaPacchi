import { useDispatch} from "react-redux"
import { useState, useEffect, useCallback} from "react"
import { Text ,TouchableOpacity, View, ScrollView} from "react-native"
import { showSuccess, showError } from "../../store/ui/uiSlice"
import { useNavigation } from "@react-navigation/native"
import styles from "./RegisterScreen.style"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList} from './RegisterScreen.models'
import { register } from "../../services/auth_services"
import AppInput from "../../components/AppInput/AppInput"
import AppButton from "../../components/AppButton/AppButton"
import { useSafeArea } from "../../utils/useSafeArea"
import { useTranslation } from "react-i18next"


type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>




const RegisterScreen = ()=> {
    const {t}= useTranslation()
    const dispatch= useDispatch()
    const[name, setName] = useState<string>('')
    const[surname, setSurname]= useState<string>('')
    const[email, setEmail] = useState<string >('')
    const[password, setPassword] = useState<string >('')
    const[password_confirmation, setPassword_confirmation]= useState<string>('')
    const[phone, setPhone] = useState<string>('')
    const[ address, setAddress]= useState<string>('')
    

    const [step, setStep]= useState(1)
    const {paddingTop, paddingBottom}= useSafeArea()


    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation<RegisterNavigationProp>()



useEffect(() => {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => {
        if (step === 2) {
          setStep(1)
        } else {
          navigation.goBack()
        }
      }}>
        <Text style={{ color: '#111827', fontSize: 20 }}> ←</Text>
      </TouchableOpacity>
    )
  })
}, [step])


    const postRegister = useCallback(()=> {
        
        if(!name || !surname || !email || !password || !password_confirmation || !phone || !address) {
            dispatch(showError('Tutti i campi sono obbligatori'))
            return
        }
        if(password !== password_confirmation) {
            dispatch(showError('Le password non coincidono'))
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
            dispatch(showError('Inserisci un indirizzo email valido'))
            return
            }
        setIsLoading(true)


        register({
                name,
                surname,
                email,
                password,
                password_confirmation,
                phone,
                address
            }).subscribe({
                next: (response) => {
                  dispatch(showSuccess(response.message || "Registrazione effettuata con successo"))
                    navigation.navigate('Login')
                    setIsLoading(false)  
                    },
                error:(err) => {
                    dispatch(showError(err.response?.data?.message || "Errore nella registrazione"))
                    setIsLoading(false)
                }
            
        })
    }, [name, surname, email, password, password_confirmation, phone, address])



    const goToStep2= ()=> {
        if (!name || !surname || !phone || !address) {
            dispatch(showError('Tutti i campi sono obbligatori'))
            return
        }

        setStep(2)
    }

    return(
       
            <View style={[styles.container, {paddingTop, paddingBottom}]}>
                <ScrollView>

               
                <Text style={styles.subtitle}> 
                    {step===1? t('register.personalData') : t('register.credentials')}
                </Text>

                {step===1 ? (
                    <View>
                    <AppInput
                    placeholder={t('register.name')}
                    value={name}
                    onChangeText={setName}
                />

                <AppInput
                    placeholder={t('register.surname')}
                    value={surname}
                    onChangeText={setSurname}
                />
                <AppInput
                    placeholder={t('register.phone')}
                    value={phone}
                    onChangeText={setPhone}
                />


                <AppInput
                    placeholder={t('register.address')}
                    value={address}
                    onChangeText={setAddress}
                />

                <AppButton title={t('register.next')} variant="primary" onPress={goToStep2} />
                </View>):(

                <View>
                <AppInput
                    placeholder={t('register.email')}
                    value={email}
                    onChangeText={setEmail}
                />
                
                <AppInput
                    placeholder={t('register.password')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <AppInput
                    placeholder={t('register.confirmPassword')}
                    value={password_confirmation}
                    onChangeText={setPassword_confirmation}
                    secureTextEntry
                />


                <AppButton 
                    title={t('register.button')}
                    variant="success" 
                    onPress={postRegister} 
                />




                <AppButton 
                    title={t('register.back')}
                    variant="secondary" 
                    onPress={() => setStep(1)} 
                />

                </View>)
}
                
                
                

                </ScrollView>

    </View>
  )
       
    
}


export default RegisterScreen