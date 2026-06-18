import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../MapScreen/MapScreen.models"

export type MyPackage = {
  id: number
  tracking_code: string
  recipient_name: string
  recipient_surname: string
  pickup_point_id: number
  user_id: number
  status: 'pending' | 'collected' | 'return_initiated' | 'expired'
  collected_at: string
  created_at: string
  updated_at: string
  pickup_point: {
    id: number
    courier: string
    name: string
    address: string
    city: string
    province: string
  }
}

export type MyPackagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Returns'>