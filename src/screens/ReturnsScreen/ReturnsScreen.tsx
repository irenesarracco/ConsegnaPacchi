import { useState , useEffect, useMemo} from "react"
import { ReturnLabel } from "./ReturnsScreen.models"
import { Text , View, ScrollView, Image, TouchableOpacity, ActivityIndicator} from "react-native"
import AppButton from "../../components/AppButton/AppButton"
import * as ImagePicker from 'expo-image-picker';
import { showError , showSuccess} from "../../store/ui/uiSlice";
import { useDispatch } from "react-redux"
import * as DocumentPicker from 'expo-document-picker'
import { useSafeArea } from "../../utils/useSafeArea"
import AppCard from "../../components/AppCard/AppCard"
import InfoCard from "../../components/InfoCard/InfoCard";
import styles from "./ReturnsScreen.style"
import { useRoute } from "@react-navigation/native"
import { ReturnsScreenRouteProp} from "./ReturnsScreen.models"
import { getReturnLabel, uploadReturnLabel } from "../../services/packages_services"
import { useNavigation } from "@react-navigation/native"
import { check, request, openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Platform } from 'react-native'


const ReturnsScreen=()=> {
    const [selectedFile, setSelectedFile]= useState<ReturnLabel | null>(null)
    const dispatch= useDispatch()
    const{ paddingTop, paddingBottom} = useSafeArea()
    const route = useRoute<ReturnsScreenRouteProp>()
    const {id : packageId, status, trackingCode, courier, collectedAt } = route.params
    const [currentStatus, setCurrentStatus] = useState(status)
    const [labelImage, setLabelImage] = useState<string | null>(null)
    const navigation= useNavigation()
    const [isLoading, setIsLoading]= useState(false)

   

 

    /*const pickImage= async()=> {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.PHOTO_LIBRARY

        const status = await check(permission)
        switch(status){
          case RESULTS.GRANTED :
            await apriGalleria()
            break
          case RESULTS.BLOCKED :
            dispatch(showError('Permesso accesso alla galleria negato - vai nelle impostazioni'))
            await openSettings()
            break
          case RESULTS.DENIED:
              const result= await request(permission)
              switch(result){
                case RESULTS.GRANTED:
                  await apriGalleria()
                  break
                case RESULTS.BLOCKED: 
                  dispatch(showError('Permesso negato — vai nelle impostazioni'))
                  await openSettings()
                  break
                
                case RESULTS.DENIED:
                  const secondResult = await request(permission)
                  if (secondResult === RESULTS.GRANTED){
                    await apriGalleria()
                  } else{
                    dispatch(showError('Permesso galleria negato'))
                  }
                  break
        } 
      break
    }
  }
*/


const pickImage= async()=> {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.PHOTO_LIBRARY

        const result = await request(permission)
        switch(result){
          case RESULTS.GRANTED:
            await apriGalleria()
            break
          case RESULTS.BLOCKED :
             await openSettings()
             dispatch(showError('Permesso negato — vai nelle impostazioni'))
             break

        }
      }



    const apriGalleria= async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    })

    if (!result.canceled) {
        setSelectedFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName || 'immagine.jpg',
            mimeType: result.assets[0].mimeType || 'image/jpeg',
            size: result.assets[0].fileSize
  })


    }
    }


   /* const pickDocument = async () => {

     const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.MEDIA_LIBRARY

        const status = await check(permission)
console.log('permission:', permission)
console.log('status:', status)
        switch(status){
        case RESULTS.GRANTED:
          await apriDocumenti()
          break
        
        case RESULTS.BLOCKED:
          console.log('blocked1')
          dispatch(showError('Permesso accesso ai documenti negato - vai nelle impostazioni'))
          await openSettings()
          break
        

        case RESULTS.DENIED:
          console.log('entrato in DENIED')
  const result = await request(permission)
  console.log('result dopo request:', result)
          switch(result){
            case RESULTS.GRANTED:
              await apriDocumenti()
              break
            case RESULTS.BLOCKED:
              console.log('blocked2')
              dispatch(showError('Permesso negato — vai nelle impostazioni'))
              await openSettings()
              break
            case RESULTS.DENIED:
                const secondResult = await request(permission)
                if (secondResult === RESULTS.GRANTED){
                  await apriDocumenti()
                } else{
                  dispatch(showError('Permesso documenti negato'))
                }
                break
              } 
              break
            }

    }

    */


    const pickDocument= async()=> {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.MEDIA_LIBRARY
         const result = await request(permission)
            switch(result){
              case RESULTS.GRANTED:
                await apriDocumenti()
                break
              case RESULTS.BLOCKED :
                await openSettings()
                dispatch(showError('Permesso negato — vai nelle impostazioni'))
                break

            }
          }

      const apriDocumenti= async()=>{
        let result = await DocumentPicker.getDocumentAsync({
          type: ['image/jpeg', 'image/jpg'],
          multiple: false,
          copyToCacheDirectory: true,
  })
  console.log(result)
  if (!result.canceled) {
    setSelectedFile({
      uri: result.assets[0].uri,
      name: result.assets[0].name,
      mimeType: result.assets[0].mimeType,
      size: result.assets[0].size
    })
  }
}



  /*const takePhoto= async()=> {
     const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

        const status = await check(permission)
        switch(status){
        case RESULTS.GRANTED:
          await apriCamera()
          break
        case RESULTS.BLOCKED:
          dispatch(showError('Permesso accesso alla fotocamera negato - vai nelle impostazioni'))
          await openSettings()
          break
          case RESULTS.DENIED: 
          const result= await request(permission)
          switch(result){
            case RESULTS.GRANTED:
              await apriCamera()
              break
            case  RESULTS.BLOCKED:
              dispatch(showError('Permesso negato — vai nelle impostazioni'))
              await openSettings()
              break
            case RESULTS.DENIED:
            const secondResult = await request(permission)
            if (secondResult === RESULTS.GRANTED){
              await apriCamera()
            } else{
              dispatch(showError('Permesso fotocamera negato'))
            }
            break
          } 
        break
        }
      }*/


    const takePhoto= async()=> {
     const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA

     const result = await request(permission)
        switch(result){
          case RESULTS.GRANTED:
            await apriCamera()
            break
          case RESULTS.BLOCKED :
             await openSettings()
             dispatch(showError('Permesso negato — vai nelle impostazioni'))
             break

        }
      }

    const apriCamera = async()=> {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.5,
      allowsEditing: true
    })

    if (!result.canceled) {
      setSelectedFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName || 'immagine.jpg',
            mimeType: result.assets[0].mimeType || 'image/jpeg',
            size: result.assets[0].fileSize
  })

    }
  }
  


  const handleUploadLabel= async()=> {
    if (!selectedFile) {
      dispatch(showError('Seleziona un file prima di confermare'))
      return
      
    }
    {/*const maxSize= 2* 1024*1024
    if (selectedFile.size && selectedFile.size > maxSize) {
      dispatch(showError('Il file è troppo grande, ridurre a max 2MB'))
    }*/}
    try{
      const response = await uploadReturnLabel(packageId, selectedFile.uri)
      dispatch(showSuccess(response.message))
      setSelectedFile(null)
      setCurrentStatus('return_initiated')
      setIsLoading(false)
        
    } catch(error: any) {
        const errors = error.response?.data?.errors
        if (errors?.label) {
          const errorCode= errors.label[0]

          const errorMessages: {[key: string]: string}= {
            'validation.max.file': 'Il file è troppo grande- max 2MB'
          }

          const message= errorMessages[errorCode] || 'File non valido'
          dispatch(showError(message))
        } else {
          dispatch(showError(error.response?.data?.message || 'Errore nel caricamento'))
          setIsLoading(false)
        }
      }
  }



  const handleViewLabel= async()=> {
    setIsLoading(true)
    try{
      const response= await getReturnLabel(packageId)
      setLabelImage(response)
      setIsLoading(false)
    } catch(error: any){
      dispatch(showError('Errore nel caricamento etichetta'))
      setIsLoading(false)
    }
  }

  useEffect(() => {
  if (currentStatus === 'return_initiated') {
    handleViewLabel()
  }
}, [])


const dataFormattata = useMemo(() => {
  return new Date(collectedAt).toLocaleDateString('it-IT')
}, [collectedAt])


   return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>
      {currentStatus=== 'collected' ? (

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.titolo}>Nuovo reso</Text>
            <Text style={styles.sottotitolo}>Carica l'etichetta</Text>
          </View>


        <TouchableOpacity 
          style={styles.uploadArea}
          onPress={pickDocument}
        >
          {selectedFile ? (
            
            <AppCard>
              <InfoCard label="File selezionato" value={selectedFile.name} />
              <InfoCard label="Tipo" value={selectedFile.mimeType} />
            </AppCard>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadIcon}>📁</Text>
              <Text style={styles.uploadText}>Tocca per scegliere un file</Text>
              <Text style={styles.uploadSubtext}>JPG o JPEG • max 2 MB</Text>
            </View>
          )}
        </TouchableOpacity>


        {/*Prova2 */}
        <TouchableOpacity 
          style={styles.uploadArea}
          onPress={pickImage}
        >
          {selectedFile ? (
            
            <AppCard>
              <InfoCard label="File selezionato" value={selectedFile.name} />
              <InfoCard label="Tipo" value={selectedFile.mimeType} />
            </AppCard>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadIcon}>🎞️</Text>
              <Text style={styles.uploadText}>Tocca per scegliere nella tua galleria</Text>
              <Text style={styles.uploadSubtext}>JPG o JPEG • max 2 MB</Text>
            </View>
          )}
        </TouchableOpacity>

        {/*Prova3 */}
        <TouchableOpacity 
          style={styles.uploadArea}
          onPress={takePhoto}
        >
          {selectedFile ? (
            
            <AppCard>
              <InfoCard label="File selezionato" value={selectedFile.name} />
              <InfoCard label="Tipo" value={selectedFile.mimeType} />
            </AppCard>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Tocca per scattare la tua foto</Text>
              <Text style={styles.uploadSubtext}>JPG o JPEG • max 2 MB</Text>
            </View>
          )}
        </TouchableOpacity>

          {/*<View style={styles.containerRow}>
              <AppButton
                onPress={pickDocument}
                title='Scegli file'
                variant='primary'
                flex
              />

              <AppButton
                onPress={pickImage}
                title= 'Scegli dalla galleria'
                variant='secondary'
                flex
              />

              <AppButton
              onPress={takePhoto}
              title= 'Scatta foto'
              variant= 'secondary'
              flex
              />

          </View>*/}

          {selectedFile && (
            <AppCard>
              <InfoCard label="File selezionato" value={selectedFile.name} />
              <InfoCard label="Tipo" value={selectedFile.mimeType} />
            </AppCard>
          )}



          <View style={styles.divider}></View>

          {selectedFile && (
            <AppButton
            onPress={handleUploadLabel}
            title= 'Salva'
            variant='success'
            disabled={isLoading}
          />)}

          <AppButton
            onPress={()=> navigation.goBack()}
            title= 'Annulla'
            variant='danger'
          />

        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.header}>
            <Text style={styles.titolo}>Reso avviato</Text>
            <Text style= {styles.sottotitolo}> La tua etichetta è stata caricata</Text>

          </View>

          <AppCard>
            <InfoCard label="Tracking_code" value={trackingCode} />
            <InfoCard label="Corriere" value={courier} />
            <InfoCard label="Data" value={ dataFormattata} />
          </AppCard>

        <View style={styles.divider}/>
        
         {labelImage ? (
          

              <AppCard>
                <Text style={styles.labelTitle}>🏷️ Etichetta di reso</Text>
              <Image 
                source={{ uri: labelImage }} 
                style={styles.image} 
                resizeMode='contain'
              />

              </AppCard>

              
            ) : (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#111827" />
                <Text style={styles.sottotitolo}>Caricamento etichetta...</Text>
              </View>
            
            )}
  
        </ScrollView>
      )}
    </View>
  )
}

export default ReturnsScreen