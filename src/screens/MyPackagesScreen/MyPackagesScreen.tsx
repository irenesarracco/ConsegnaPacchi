import { useState , useEffect} from "react"
import { useDispatch} from "react-redux"
import {Text, View, FlatList} from "react-native"
import { MyPackage } from "./MyPackagesScreen.models"
import { showError} from "../../store/ui/uiSlice"
import styles from "./MyPackagesScreen.style"
import { getMy } from "../../services/packages_services"
import AppCard from "../../components/AppCard/AppCard"
import { useSafeArea } from "../../utils/useSafeArea"
import AppButton from "../../components/AppButton/AppButton"
import {MyPackagesScreenNavigationProp } from "./MyPackagesScreen.models"
import { useNavigation } from "@react-navigation/native"
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import { useTranslation } from "react-i18next"
import Animated, {FadeInUp, ZoomIn, ZoomInEasyDown} from "react-native-reanimated"



const MyPackagesScreen = () => {
    const {t} = useTranslation()
    const [myPacchi, setMyPacchi] = useState<MyPackage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {paddingTop, paddingBottom}= useSafeArea()
    const navigation = useNavigation<MyPackagesScreenNavigationProp>()

    const dispatch= useDispatch()
    const [hasError, setHasError] = useState(false)
    const [messageError, setMessageError]= useState('')



    const getMyPackages = ()=> {
            getMy().subscribe({
            next:(response)=> {setIsLoading(false)
            setMyPacchi(response.data)
        } ,
        error :(err )=> {
            dispatch(showError(err.response?.data?.message || 'Errore nel caricamento'))
            setIsLoading(false)
            const status = err.response?.status
            if (status===404 ||status===500){
                setHasError(true)
                setMessageError('Servizio momentaneamente non disponibile')
            }
    }})}
    

     

    useEffect(() => {
        getMyPackages()
    }, [])


if (isLoading) return <Text>{t('common.loading')}</Text>

   
    if (hasError){
        return(
        <ErrorPage
        message={messageError}
        onRiprova={()=> {
            getMyPackages()
            setHasError(false)}}
        />)
    }

    return(
       <View style={[styles.container, {paddingTop, paddingBottom}]}>


            
        
               <FlatList 
               contentContainerStyle={styles.scrollContainer}
               data={myPacchi}
               keyExtractor= {item => item.id.toString()}
                ListHeaderComponent={
                    <View style={styles.header}>
                    <Text style={styles.titolo}>{t('packages.title')}</Text>
                    <Text style={styles.sottotitolo}>{myPacchi.length} {t('packages.withdrawn')}</Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.divider} />}
               renderItem= {({item}) => (
                <Animated.View entering={FadeInUp.delay(200).duration(400)}>
                   <AppCard>

                       <Animated.Text entering={ZoomIn.delay(400)} style={styles.trackingCode}>{item.tracking_code}</Animated.Text>
                       <Animated.Text entering={ZoomIn.delay(500)} style={styles.destinatario}>{item.recipient_name} {item.recipient_surname}</Animated.Text>
                       <Animated.Text entering={ZoomIn.delay(600)}  style={styles.puntoRitiro}>📍 {item.pickup_point.name}</Animated.Text>
                        <Animated.Text entering={ZoomIn.delay(700)}  style={styles.puntoRitiro}>{item.pickup_point.address}, {item.pickup_point.city}</Animated.Text>
                        <View style={styles.statusBadge}>
                            <Animated.Text entering={ZoomIn.delay(800)} style={styles.statusText}>{item.status=== 'collected' ? t('packages.collected') : t('packages.returnInitiated')}</Animated.Text>
                        </View>

                        {item.status === 'collected' && (
                              <AppButton
                                    onPress= {()=> navigation.navigate('Returns',  { packageId: item.id, status: item.status,trackingCode: item.tracking_code,
                                    courier: item.pickup_point.courier, collectedAt: item.collected_at } )}
                                    title={t('packages.return')}
                                    variant='secondary'
                                    
                                />
                        )}


                        {item.status === 'return_initiated' && (
                            <AppButton
                                onPress= {()=> navigation.navigate('Returns',  { packageId: item.id, status: item.status,trackingCode: item.tracking_code,
                                courier: item.pickup_point.courier, collectedAt: item.collected_at } )}
                                title= {t('packages.viewReturn')}/>
    )}
                   </AppCard>

                </Animated.View>
               )}
               />
               
       
               
       
             </View>
    )

}



export default MyPackagesScreen