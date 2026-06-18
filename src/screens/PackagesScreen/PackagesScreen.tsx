import React from 'react'
import {useState, useEffect} from 'react'
import { Package } from './PackagesScreen.models'
import client from '../../api/client'
import { Text, FlatList, View } from 'react-native'


const PackagesScreen = () => {
    const [pacchi, setPacchi] = useState<Package[]>([])
    const [isLoading, setIsLoading] = useState(true)


    const getPacchi = async()=> {
        try{
            const response= await client.get('/api/admin/packages')
            setIsLoading(false)
            setPacchi(response.data.data)
        } catch(error){
            console.error(error)
            setIsLoading(false)
        }
    }



    useEffect(()=>{
        getPacchi()
    }, [])

 
    if (isLoading) return <Text>Caricamento...</Text>

    return(
       
      <View>
        <FlatList 
        data={pacchi}
        keyExtractor= {item => item.id.toString()}
        renderItem= {({item}) => (
            <View>
                <Text>{item.tracking_code}</Text>
                <Text>{item.recipient_name} {item.recipient_surname}</Text>
            </View>
        )}
        />
        



      </View>
        
    )
}




export default PackagesScreen