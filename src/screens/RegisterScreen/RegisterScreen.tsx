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
import React from 'react'


type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>




const RegisterScreen = ()=> {
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


    const postRegister = useCallback(async()=> {
        
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
        try {
            const response = await register({
                name,
                surname,
                email,
                password,
                password_confirmation,
                phone,
                address
            })
            dispatch(showSuccess(response.data.message || "Registrazione effettuata con successo"))
            navigation.navigate('Login')
            setIsLoading(false)
        }catch(error: any) {
            dispatch(showError(error.response?.data?.message || "Errore nella registrazione"))
            setIsLoading(false)
        }
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
                    {step===1? 'Dati personali' : 'Credenziali di accesso'}
                </Text>

                {step===1 ? (
                    <View>
                    <AppInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                />

                <AppInput
                    placeholder="Cognome"
                    value={surname}
                    onChangeText={setSurname}
                />
                <AppInput
                    placeholder="Telefono"
                    value={phone}
                    onChangeText={setPhone}
                />


                <AppInput
                    placeholder="Indirizzo"
                    value={address}
                    onChangeText={setAddress}
                />

                <AppButton title="Avanti →" variant="primary" onPress={goToStep2} />
                </View>):(

                <View>
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

                <AppInput
                    placeholder="Conferma Password"
                    value={password_confirmation}
                    onChangeText={setPassword_confirmation}
                    secureTextEntry
                />


                <AppButton 
                    title="Registrati" 
                    variant="success" 
                    onPress={postRegister} 
                />




                <AppButton 
                    title="← Indietro" 
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