import { useState, useEffect, useCallback } from "react"
import { User } from "../../store/auth/auth.types"
import { Text , View, ScrollView} from "react-native"
import styles from "./ProfileScreen.style"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth/authSlice'
import { showError, showSuccess } from '../../store/ui/uiSlice'
import { useNavigation } from "@react-navigation/native"
import { ProfileScreenNavigationProp } from "./ProfileScreen.models"
import { getProfile, updateProfile } from "../../services/profile_services"
import AppInput from "../../components/AppInput/AppInput"
import AppButton from "../../components/AppButton/AppButton"
import InfoCard from "../../components/InfoCard/InfoCard"
import { useSafeArea } from "../../utils/useSafeArea"
import ErrorPage from '../../components/ErrorPage/ErrorPage'

const ProfileScreen = ()=>{
    const [profile, setProfile]= useState<User | null> (null)
    const [isLoading, setIsLoading]= useState(true)
    const dispatch= useDispatch()
    const [isEditing, setIsEditing]= useState(false)
    const [nome, setNome] = useState('')
    const [cognome, setCognome]=useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [indirizzo, setIndirizzo] = useState('')
    const navigation= useNavigation<ProfileScreenNavigationProp>()
    const {paddingTop, paddingBottom}= useSafeArea()
    const [hasError, setHasError] = useState(false)
    const [messageError, setMessageError]= useState('')


    const get = async() => {
       try {
         const response = await getProfile()
            setIsLoading(false)
            setProfile(response.data)
            setNome(response.data.name)
            setCognome(response.data.surname)
            setTelefono(response.data.phone)
            setIndirizzo(response.data.address)
            setEmail(response.data.email)
        }catch(error: any){
            console.error(error)
            setIsLoading(false)
            const status= error.response?.status
            if (status===404 ||status===500){
                setHasError(true)
                setMessageError('Servizio momentaneamente non disponibile')
            }
        }
    }





    const updataProfile= async()=>{
        try{
            const response= await updateProfile({
                name: nome,
                surname: cognome,
                phone: telefono,
                address: indirizzo,
                email: email
            })
            setProfile(response.data)
            setIsEditing(false)
            dispatch(showSuccess(response.message))
        } catch(error: any) {
            dispatch(showError(error.message || 'Errore, profilo non aggiornato'))

    }}

    useEffect(()=> {
        get()
    }, [])



    const logOut= useCallback(async() => {
    await AsyncStorage.removeItem('token')
    dispatch(logout())
  }, [dispatch])



    if(isLoading ) return <Text>Caricamento dati...</Text>
    

   

    if(hasError) {
        return(
        <ErrorPage
        message={messageError}
        onRiprova= {()=> {
            get()
            setHasError(false)
        }}/>)
    }
    
    if(!profile) return <Text>Profilo inesistente</Text>


    return (
        <View style={[styles.container, {paddingTop, paddingBottom}]}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}> 

                <View style={styles.headerContainer}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarEmoji}>👤</Text>
                    </View>
                    <Text style={styles.userName}>{profile.name} {profile.surname}</Text>
                    
                    
                    <AppButton
                        onPress={logOut}
                        title= '🚪 Logout'
                        variant= 'danger'
                   />
                </View>

                <View style={styles.divider}/>



                {isEditing ? (
                    <View>
                        <AppInput
                            placeholder="Nome"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <AppInput
                            placeholder="Cognome"
                            value={cognome}
                            onChangeText={setCognome}
                        />

                        <AppInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <AppInput
                            placeholder="Telefono"
                            value={telefono}
                            onChangeText={setTelefono}
                        />

                        <AppInput
                            placeholder="Indirizzo"
                            value={indirizzo}
                            onChangeText={setIndirizzo}
                        />


                        <AppButton
                            onPress={updataProfile}
                            title='Salva'
                            variant="success"
                         />


                        <AppButton
                            onPress={()=> setIsEditing(false)}
                            title= 'Annulla'
                            variant="secondary"
                        />

                    </View>

                ) : (
                    <View>
                        <InfoCard
                        label="Indirizzo email"
                        value={profile.email}/>


                        <InfoCard
                        label="Telefono"
                        value= {profile.phone}
                        />

                         <InfoCard
                        label="Indirizzo"
                        value= {profile.address}
                         />
                        


                 <AppButton 
                    onPress={()=> navigation.navigate('MyPackages')}
                    title='Lista pacchi ritirati'
                    variant="primary"
               />


                <AppButton
                    onPress={()=> navigation.navigate('Favorites')}
                    title='Service Point Preferiti'
                    variant="secondary"
                />


                <AppButton
                    onPress={()=> setIsEditing(true)}
                    title='Modifica Profilo'
                    variant="primary"

                />
                    </View>
                )}
            </ScrollView>
        </View>
    )

}


export default ProfileScreen