import { User } from "../../store/auth/auth.types"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from "../MapScreen/MapScreen.models"

export type ProfileResponse ={
    data: User
}

export type UpdateProfileRequest = {
  name: string
  surname: string
  phone: string
  address: string
}

export type UpdateProfileResponse = {
  message: string
  data: User
}


export type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileScreen'>