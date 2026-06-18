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

const MyPackagesScreen = () => {
    const [myPacchi, setMyPacchi] = useState<MyPackage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {paddingTop, paddingBottom}= useSafeArea()
    const navigation = useNavigation<MyPackagesScreenNavigationProp>()

    const dispatch= useDispatch()
    const [hasError, setHasError] = useState(false)
    const [messageError, setMessageError]= useState('')

    const getMyPackages = async()=> {
        try{
            const response= await getMy()
            setIsLoading(false)
            setMyPacchi(response.data)
        } catch(error: any){
            dispatch(showError(error.response?.data?.message || 'Errore nel caricamento'))
            setIsLoading(false)
            const status = error.response?.status
            if (status===404 ||status===500){
                setHasError(true)
                setMessageError('Servizio momentaneamente non disponibile')
            }
        }
    }

     

    useEffect(() => {
        getMyPackages()
    }, [])


    if (isLoading) return <Text>Caricamento...</Text>

   
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
                    <Text style={styles.titolo}>📦 I miei pacchi</Text>
                    <Text style={styles.sottotitolo}>{myPacchi.length} pacchi ritirati</Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.divider} />}
               renderItem= {({item}) => (
                   <AppCard>

                       <Text style={styles.trackingCode}>{item.tracking_code}</Text>
                       <Text style={styles.destinatario}>{item.recipient_name} {item.recipient_surname}</Text>
                       <Text style={styles.puntoRitiro}>📍 {item.pickup_point.name}</Text>
                        <Text style={styles.puntoRitiro}>{item.pickup_point.address}, {item.pickup_point.city}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{item.status=== 'collected' ? 'Ritirato':'Procedura di reso attivata'}</Text>
                        </View>

                        {item.status === 'collected' && (
                              <AppButton
                                    onPress= {()=> navigation.navigate('Returns',  { packageId: item.id, status: item.status,trackingCode: item.tracking_code,
                                    courier: item.pickup_point.courier, collectedAt: item.collected_at } )}
                                    title='Reso'
                                    variant='secondary'
                                    
                                />
                        )}


                        {item.status === 'return_initiated' && (
                            <AppButton
                                onPress= {()=> navigation.navigate('Returns',  { packageId: item.id, status: item.status,trackingCode: item.tracking_code,
                                courier: item.pickup_point.courier, collectedAt: item.collected_at } )}
                                title= 'Visualizza dettagli reso'/>
    )}
                   </AppCard>
               )}
               />
               
       
               
       
             </View>
    )

}



export default MyPackagesScreen