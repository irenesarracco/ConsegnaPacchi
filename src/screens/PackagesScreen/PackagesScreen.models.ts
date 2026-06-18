export type Package ={
    id: number
      tracking_code: string
      recipient_name: string
      recipient_surname: string
      pickup_point_id: number
      user_id: number |null
      status: string
      collected_at: string |null
      created_at:string
      updated_at: string
      pickup_point: {
        id: number
        courier: string
        name: string
        address: string
        city: string
        province:string
      }
    
}