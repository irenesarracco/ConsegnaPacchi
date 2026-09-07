import { useState, useEffect, useCallback } from "react"
import { User, UserProfile, UserUpdateData } from "../../store/auth/auth.types"
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
import { useTranslation } from "react-i18next"
import i18n from "../../i18n/index"
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

const ProfileScreen = ()=>{
    const { t} = useTranslation()
    const [profile, setProfile]= useState<UserProfile | null> (null)
    const [isLoading, setIsLoading]= useState(true)
    const dispatch= useDispatch()
    const [isEditing, setIsEditing]= useState(false)
    const [formData, setFormData] = useState<Partial<UserUpdateData>>({})
    const navigation= useNavigation<ProfileScreenNavigationProp>()
    const {paddingTop, paddingBottom}= useSafeArea()
    const [hasError, setHasError] = useState(false)
    const [messageError, setMessageError]= useState('')


    
    const cambiaLingua = () => {
        const nuovaLingua = i18n.language === 'it' ? 'en' : 'it'
        i18n.changeLanguage(nuovaLingua)
    }

    const get = () => {
         getProfile().subscribe({
            next:(response)=> {
                setIsLoading(false)
                setProfile(response)
                setFormData({
                    name: response.name,
                    surname: response.surname,
                    phone: response.phone,
                    address: response.address,
                    email: response.email
                })
            },
            error: (err)=> {
            console.error(err)
            setIsLoading(false)
            const status= err.response?.status
            if (status===404 ||status===500){
                setHasError(true)
                setMessageError('Servizio momentaneamente non disponibile')
            }
        }})
    }





            const updataProfile = ()=> {
                updateProfile(formData).subscribe({
                next:(response)=> {setProfile(response.data)
            setIsEditing(false)
            dispatch(showSuccess(response.message))},
               error: (err)=> {
            dispatch(showError(err.message || 'Errore, profilo non aggiornato'))

    }})

            }
            

    useEffect(()=> {
        get()
    }, [])



    const logOut= useCallback(async() => {
    await AsyncStorage.removeItem('token')
    dispatch(logout())
  }, [dispatch])


  const translateX = useSharedValue(0)

const formStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: withTiming(isEditing ? 0 : 300, { duration: 300 }) }],
  opacity: withTiming(isEditing ? 1 : 0, { duration: 300 })
}))

const infoStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: withTiming(isEditing ? -300 : 0, { duration: 300 }) }],
  opacity: withTiming(isEditing ? 0 : 1, { duration: 300 })
}))



if (isLoading) return <Text>{t('common.loading')}</Text>

   

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
                        title= {t('profile.logout')}
                        variant= 'danger'
                   />

                   <AppButton
                        onPress={cambiaLingua}
                        title={i18n.language === 'it' ? '🇬🇧 English' : '🇮🇹 Italiano'}
                        variant="secondary"
                    />
                </View>

                <View style={styles.divider}/>



                {isEditing ? (
                    <Animated.View style={formStyle}
                        >
                        <AppInput
                            placeholder={t('profile.name')}
                            value={formData.name || ''}
                            onChangeText={(text) => setFormData({...formData, name: text})}
                        />

                        <AppInput
                            placeholder={t('profile.surname')}
                            value={formData.surname || ''}
                            onChangeText={(text)=> setFormData({...formData, surname: text})}
                        />

                        <AppInput
                            placeholder={t('profile.email')}
                            value={formData.email || ''}
                            onChangeText={(text) => setFormData({...formData, email: text})}
                        />

                        <AppInput
                            placeholder={t('profile.phone')}
                            value={formData.phone || ''}
                            onChangeText={(text)=> setFormData({...formData, phone: text})}
                        />

                        <AppInput
                            placeholder={t('profile.address')}
                            value={formData.address || ''}
                            onChangeText={(text) => setFormData({...formData, address: text})}
                        />


                        <AppButton
                            onPress={updataProfile}
                            title={t('profile.save')}
                            variant="success"
                         />


                        <AppButton
                            onPress={()=> setIsEditing(false)}
                            title= {t('profile.cancel')}
                            variant="secondary"
                        />

                    </Animated.View>

                ) : (
                    <Animated.View style={infoStyle}
                        >
                        <InfoCard
                        label={t('profile.email')}
                        value={profile.email}/>


                        <InfoCard
                        label={t('profile.phone')}
                        value= {profile.phone}
                        />

                         <InfoCard
                        label={t('profile.address')}
                        value= {profile.address}
                         />
                        


                 <AppButton 
                    onPress={()=> navigation.navigate('MyPackages')}
                    title={t('profile.packages')}
                    variant="primary"
               />


                <AppButton
                    onPress={()=> navigation.navigate('Favorites')}
                    title={t('profile.favorites')}
                    variant="secondary"
                />


                <AppButton
                    onPress={()=> setIsEditing(true)}
                    title={t('profile.edit')}
                    variant="primary"

                />
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    )

}


export default ProfileScreen