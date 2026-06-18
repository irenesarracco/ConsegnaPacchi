import { ServicePoint } from '../MapScreen/MapScreen.models'

export type FavoriteResponse = {
  data: ServicePoint[]
  total: number
}