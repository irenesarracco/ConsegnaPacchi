import { RouteProp } from "@react-navigation/native"

export type ReturnLabel = {
  uri: string
  name: string
  mimeType?: string
  size?: number
}

export type Return = {
  id: number
  label: ReturnLabel
  createdAt: string
}

export type ReturnsScreenParams = {
  Returns: {
    packageId: number
    status: string
    trackingCode: string
    courier: string 
    collectedAt: string
  }
}

export type ReturnsScreenRouteProp = RouteProp<ReturnsScreenParams, 'Returns'>