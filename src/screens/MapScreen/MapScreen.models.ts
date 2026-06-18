import { NativeStackNavigationProp } from '@react-navigation/native-stack'


export type ServicePoint ={
    id: number
    name: string
    lat: number
    lon: number
    courier: string
    address: string
    city: string
    province: string
    postal_code: string
    phone: string
    opening_hours: string


}

export type RootStackParamList = {
    Map: undefined
    ServicePoint: {servicePoint: ServicePoint}
    ProfileScreen : undefined
    Lista: undefined
    MyPackages: undefined
    Favorites: undefined
    Returns: { packageId: number , status: string, trackingCode: string, courier: string,
    collectedAt: string}
}

export type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>