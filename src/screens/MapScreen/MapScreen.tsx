import React, { useCallback } from 'react'
import MapView , {Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { TouchableOpacity, View , Text, ActivityIndicator} from 'react-native'
import {useState, useEffect} from 'react'
import { useNavigation} from '@react-navigation/native'
import {ServicePoint} from './MapScreen.models'
import styles from './MapScreen.style'
import { useDispatch } from 'react-redux'
import { MapScreenNavigationProp } from './MapScreen.models'
import { getListaServicePoints } from '../../services/servicePoint_services'
import { useSafeArea } from '../../utils/useSafeArea'
import ErrorPage from '../../components/ErrorPage/ErrorPage'

const MapScreen= () => {
  const [servicePoint, setServicePoint] = useState<ServicePoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation<MapScreenNavigationProp>()
  const dispatch= useDispatch()
  const {paddingTop, paddingBottom }= useSafeArea()
  const [hasError, setHasError] = useState(false)
  const [messageError, setMessageError] = useState('')



  const getServicePoints = async () => {
  try{
  const response =await getListaServicePoints()
  setServicePoint(response.data)
  setIsLoading(false)
} catch(error: any) {
  console.log(error)
  setIsLoading(false)
  const status= error.response?.status
  if (status===404 || status===500)
  {setHasError(true)
  setMessageError('Servizio momentaneamente non disponibile')}
}
}



useEffect(()=> {
  getServicePoints()
}, [])



if (hasError) {
  return (
    <ErrorPage 
      message={messageError} 
      onRiprova={() => { 
        setHasError(false)
        getServicePoints() 
      }} 
    />
  )
}


const markerPress = useCallback((point: ServicePoint) => {
  navigation.navigate('ServicePoint', { servicePoint: point })
}, [])

  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>

      <View style={styles.topPanelContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProfileScreen')}
          style={styles.profileButton}
          activeOpacity={0.8}
        >
          <Text style={styles.avatarIcon}>👤</Text>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.panelTitle}>Mappa Service Point</Text>
          <Text style={styles.panelSubtitle}>
            {isLoading ? 'Caricamento punti...' : servicePoint.length + 'punti disponibili'}
          </Text>
        </View>

        {isLoading && (
          <ActivityIndicator size="small" color="#111827" style={styles.loader} />
        )}
      </View>


      <MapView
      provider= {PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: 41.9028,
        longitude: 12.4964,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5

      }}>

        {servicePoint.map(point => (
          <Marker 
          key={point.id.toString()}
          coordinate={{latitude: point.lat, longitude: point.lon}}
          title= {point.name}
          description= {point.courier}
          onPress={()=> markerPress(point)}
          />
        ))}
    </MapView>




    </View>
  )
}

export default MapScreen


//customHook, utili per quando ci sono parrecchi useEffect/memo....Invece di scrivere in un unico componente crei tuo hook personalizzato
//homepage, dettagli reso...