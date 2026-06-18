import { useState , useEffect} from "react"
import { Text, View, FlatList} from "react-native"
import { useDispatch} from "react-redux"
import { showError} from "../../store/ui/uiSlice"
import { ServicePoint } from "../MapScreen/MapScreen.models"
import styles from "./FavoriteScreen.style"
import { getFavorites } from "../../services/favorites_services"
import AppCard from "../../components/AppCard/AppCard"
import { useSafeArea } from "../../utils/useSafeArea"
import ErrorPage from '../../components/ErrorPage/ErrorPage'


const FavoriteScreen = () => {
    const [isLoading, setIsLoading]= useState(true)
    const [preferiti, setPreferiti] = useState<ServicePoint[]>([])
    const {paddingTop, paddingBottom}= useSafeArea()

    const dispatch= useDispatch()
    const [hasError, setHasError]= useState(false)
    const [messageError, setMessageError]= useState('')



    const getPreferiti = async() => {
        try{
            const response = await getFavorites()
            setIsLoading(false)
            setPreferiti(response.data)
        } catch(error: any){
            dispatch(showError(error.response?.data?.message || 'Errore nel caricamento'))
            setIsLoading(false)
            const status= error.response?.status
            if(status===404 ||status===500){
                setHasError(true)
                setMessageError('La risorsa non è attualmente non è disponibile')
            }
        }
    }
     

    useEffect(()=> {
        getPreferiti()

    }, [])



    if (isLoading) return <Text>Caricamento...</Text>

  


    if(hasError) {
        return(
        <ErrorPage
        message={messageError}
        onRiprova={()=> {
            getPreferiti()
            setHasError(false)}}
        />
        )
    }


    return (
        <View style={[styles.container, {paddingTop, paddingBottom}]}>
            {preferiti.length=== 0 ? (
                <AppCard>
                    <Text style={styles.titolo}>Non hai ancora aggiunto preferiti</Text>
                </AppCard>
            ):(<FlatList 
            contentContainerStyle={styles.scrollContainer}
            data= {preferiti}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.titolo}>📍 Service Point Preferiti</Text>
                    <Text style={styles.sottotitolo}>{preferiti.length} Service Point preferiti</Text>
                </View>
            }
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            renderItem= {({item}) => (
                   <AppCard>

                       <Text style={styles.trackingCode}>{item.name}</Text>
                       <Text style={styles.value}>📍 {item.courier}</Text>
                       <Text style={styles.value}>{item.address}, {item.city}, {item.province}</Text>
                       <Text style={styles.value}>Tel:  {item.phone}</Text>
                       <Text style={styles.value}>Orari d'apertura:  {item.opening_hours}</Text>
                   </AppCard>
               )}
            
            />
            )}

        </View>)
    
}



export default FavoriteScreen