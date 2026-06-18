import { ServicePoint } from "../MapScreen/MapScreen.models"
import { RouteProp } from '@react-navigation/native' 


export type QRValidation ={
    success: boolean
    message: string
}

export type ServicePointRoutParams= {
    ServicePoint: {servicePoint: ServicePoint}
}


export type ServicePointDetail ={
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
    active: boolean
    created_at: string
    updated_at: string


}

export type PackageCheckRequest = {
    tracking_code: string
    pickup_point_id: number

}

export type PackageCheckResponse = {
    message: string
}


export type ServicePointRouteProp = RouteProp<ServicePointRoutParams, 'ServicePoint'>



export type FavoriteRequest = {
  pickup_point_id: number
}

export type FavoriteActionResponse = {
  message: string
}


