import React, { useCallback, useMemo } from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { useRoute} from '@react-navigation/native'
import {useState, useEffect} from 'react'
import { ServicePointDetail } from './ServicePointScreen.models'
import * as Location from 'expo-location'
import {getDistance} from 'geolib'
import { CameraView , useCameraPermissions, CameraType, FlashMode} from 'expo-camera'
import styles from './ServicePoint.Screen.style'
import { Linking } from 'react-native'
import { useDispatch } from 'react-redux'
import { showError, showSuccess } from '../../store/ui/uiSlice'
import { ServicePointRouteProp } from './ServicePointScreen.models'
import { addFavorites, deleteFavorites, getFavorites } from '../../services/favorites_services'
import { getServicePointDetail } from '../../services/servicePoint_services'
import { postPackages } from '../../services/packages_services'
import AppButton from '../../components/AppButton/AppButton'
import AppInput from '../../components/AppInput/AppInput'
import InfoCard from '../../components/InfoCard/InfoCard'
import { useSafeArea } from '../../utils/useSafeArea'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import { useNavigation } from '@react-navigation/native'
import { check, request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Platform } from 'react-native'
import { useTranslation } from 'react-i18next'


const ServicePointScreen = ()=>{
    const {t} = useTranslation()
    const route= useRoute<ServicePointRouteProp>()
    const {servicePoint} = route.params
    const [dettaglio, setDettaglio] = useState<ServicePointDetail | null> (null)
    const [isLoading, setIsLoading] = useState(true)
    const [isVicino, setIsVicino] = useState(false)
    const [permission, requestPermission]= useCameraPermissions()
    const [showScanner, setShowScanner] = useState(false)
    const [trackingCodeManuale, setTrackingCodeManuale]= useState('')
    const dispatch = useDispatch()
    const [scanned, setScanned] = useState(false)
    const [facing, setFacing]= useState<CameraType>('back')
    const [flash, setFlash] = useState<FlashMode>('off')
    const [isPreferito, setIsPreferito] = useState(false)
    const [favoritoId, setFavoritoId] = useState<number | null>(null)
    const {paddingTop, paddingBottom}= useSafeArea()
    const [hasError, setHasError] = useState(false)
    const [messageError, setMessageError]= useState('')
    const navigation= useNavigation()
    
 
    const getDetail = useCallback((id: number )=> {
         getServicePointDetail(id).subscribe({
            next:(response)=>{
            setDettaglio(response.data)
            setIsLoading(false)
        },
            error:(err)=>{
            console.log(err)
            setIsLoading(false)
            const status= err.response?.status
            if (status===404 || status===500){
                setHasError(true)
                setMessageError('Servizio momentaneamente non disponibile')
            }}})

        
    }, [])


   


    const checkPreferito = useCallback((id: number) => {
  getFavorites().subscribe({
    next:(response)=>{
    const found = response.data.find((f: any) => f.id === id)
    if (found) {
      setIsPreferito(true)
      setFavoritoId(found.id)
    }
  },
     error: (err)=>{
        console.error(err)
  }})
}, [])

    const checkPosizione= useCallback(async()=> {
        try{
            const {status}= await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                dispatch(showError("Permesso negato"))
            return
            }

            const location= await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low
            })
            const puntoA= {latitude:location.coords.latitude, longitude: location.coords.longitude};
            const puntoB= {latitude:dettaglio!.lat, longitude: dettaglio!.lon};
            const distanzaInMetri= getDistance(puntoA, puntoB)
            setIsVicino(distanzaInMetri <= 500000)
        } catch(error) {
            console.error(error)
        }


    }, [dettaglio])


    const checkQRCode= (trackingCode: string) => {
        postPackages( {
                tracking_code: trackingCode,
                pickup_point_id: dettaglio!.id
            }).subscribe({
                next:(response)=>{
            dispatch(showSuccess(response.message || 'Pacco ritirato'))
            

        }, 
        error:(err)=>{
            console.log('errore completo:', err.response?.data)
            const message=
            err.response?.data?.message || 'QR code non valido'
            dispatch(showError(message))}
        })
    }

    const openGoogleMaps= useCallback(()=> {
        const url= 'https://www.google.com/maps/dir/?api=1&destination=' + dettaglio!.lat + ',' + dettaglio!.lon 
        console.log('url:', url)
        Linking.openURL(url)    
    }   , [dettaglio])

    useEffect(()=> {
        getDetail(servicePoint.id)
        checkPreferito(servicePoint.id)
    }, [getDetail, checkPreferito])

    useEffect(() => {
        if(dettaglio) {
            checkPosizione()
        }
    }, [dettaglio])



    const addPreferito = useCallback( () => {
  addFavorites ({
      pickup_point_id: dettaglio!.id
    }).subscribe({
        next :()=>{
    setIsPreferito(true)
    dispatch(showSuccess('Aggiunto ai preferiti!'))
  },
  error:(err: any)=> {
    dispatch(showError(err.response?.data?.message || 'Errore'))}
  })
}, [dettaglio])

    const removePreferito = useCallback(() => {
    deleteFavorites( + dettaglio!.id).subscribe({
        next:()=>{
        setIsPreferito(false)
        setFavoritoId(null)
        dispatch(showSuccess('Rimosso dai preferiti!'))
    }, 
    error: (err: any)=> {
        dispatch(showError(err.response?.data?.message || 'Errore'))}
    })
    }, [dettaglio])


    const handleScannerOpen = useCallback(async ()=> {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

        const status = await check(permission)
        switch(status){
        case RESULTS.GRANTED:
            setShowScanner(true)
            break
        case RESULTS.BLOCKED:
            dispatch(showError('Permesso fotocamera negato- vai alle impostazioni'))
            await openSettings()
            break
        case RESULTS.DENIED:
        const result= await request(permission)
        switch(result){
        case RESULTS.GRANTED:
            setShowScanner(true)
            break
        case RESULTS.BLOCKED:
            dispatch(showError('Permesso negato — vai nelle impostazioni'))
            await openSettings()
            break
        case RESULTS.DENIED:
            const secondResult= await request(permission)
            if(secondResult=== RESULTS.GRANTED){
                setShowScanner(true)
            } else {
            navigation.goBack()
        
        } 
        break
    }
    break
        }
}, [navigation, dispatch])


const indirizzo = useMemo(() => {
     return '📍' + dettaglio?.address + ', ' + dettaglio?.city
}, [dettaglio?.address, dettaglio?.city])



const provincia = useMemo(() => {
  return dettaglio?.province + ' - ' + dettaglio?.postal_code
}, [dettaglio?.province, dettaglio?.postal_code])

    
  if (isLoading) return <Text>{t('common.loading')}</Text>
if (!dettaglio) return <Text>{t('common.noData')}</Text>

    if (hasError) {
        return (
        <ErrorPage
        message= {messageError}
        onRiprova= {()=> {
            setHasError(false)
            getDetail(servicePoint.id)
        }} />)
    }


  
    return (
        <View style={[styles.container, {paddingTop, paddingBottom}]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            

           <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
                <Text style={styles.nome}>{dettaglio.name}</Text>
                <Text style={styles.corriere}>{dettaglio.courier}</Text>
            </View>
            
            <TouchableOpacity 
                style={[styles.favoriteRoundButton, isPreferito && styles.favoriteRoundButtonActive]} 
                onPress={isPreferito ? removePreferito : addPreferito}
                activeOpacity={0.7}
            >
                <Text style={styles.favoriteIcon}>{isPreferito ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

            <View style={styles.divider}/>
            
            

                <InfoCard
                    label={t('servicePoint.address')} 
                    value= {indirizzo}
                />
                <InfoCard
                    label={t('servicePoint.province')}
                    value= {provincia}
                />
                <InfoCard
                    label={t('servicePoint.phone')}
                    value= {dettaglio.phone}
                />
                 <InfoCard
                    label={t('servicePoint.hours')}
                    value={ '🕐' + dettaglio.opening_hours}
                />


            <View style={styles.divider} />

            <AppButton
                onPress={openGoogleMaps}
               title= {t('servicePoint.openMaps')}
               variant='primary'
           />

            <View style={styles.divider} />


             <View>
        <Text style={[styles.statusTesto, { color: isVicino ? '#10b981' :'#ef4444' }]}>
          {isVicino ? t('servicePoint.nearby') : t('servicePoint.farAway')}
        </Text>
      </View>

             {isVicino && (
               <AppButton
                    title={t('servicePoint.scanQR')}
                    variant="primary"
                    onPress={handleScannerOpen}
                />
            )}

            {isVicino &&(
                <View>
                <AppInput
                placeholder={t('servicePoint.manualCode')}
                value = {trackingCodeManuale}
                onChangeText={setTrackingCodeManuale}
                />
                <AppButton
                    title={t('servicePoint.sendCode')}
                    variant="success"
                    onPress={() => {
                        if (trackingCodeManuale) {
                            checkQRCode(trackingCodeManuale)
                            setTrackingCodeManuale('')
                        }
                    }}
                />
                </View>
            )}

    </ScrollView>


            {showScanner && (
                <>

                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
                        <Text style={styles.buttonCamera}>🔄</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFlash(flash === 'off' ? 'on' : 'off')}>
                        <Text style={styles.buttonCamera}>{flash === 'off' ? '🔦' : '💡'}</Text>
                    </TouchableOpacity>

                </View >
                    <View style={styles.containerButton2}>
                        <AppButton
                        title={t('servicePoint.closeCamera')}
                        variant="danger"
                        onPress={() => {
                            setShowScanner(false)
                            setScanned(false)
                        }}
                    />
                    </View>
                    <CameraView
                        facing={facing}
                        flash={flash}
                        style={ styles.camera}
                        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                        onBarcodeScanned={!scanned ? ({ data }) => {
                            setScanned(true)
                            setShowScanner(false)
                            checkQRCode(data)
                        } : undefined}
                    />

                <View style={styles.quadratoQrCode}>
                    <View style={styles.angoloTopLeft}></View>
                    <View style={styles.angoloTopRight}></View>
                    <View style={styles.angoloBottomLeft}></View>
                    <View style={styles.angoloBottomRight}></View>
                </View>


                
                </>
            )}

            {scanned && (
                <AppButton
                    title={t('servicePoint.scanAgain')}
                    variant="primary"
                    onPress={async () => {
                        if (!permission?.granted) {
                            await requestPermission()
                        }

                        setScanned(false)
                        setShowScanner(true)
                    }}
                />
            )}
        </View>
    )
}


export default ServicePointScreen





