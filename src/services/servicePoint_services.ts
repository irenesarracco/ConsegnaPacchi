import client from "../api/client"

const servicePoint_url= '/api/pickup-points'

export const getListaServicePoints = async()=> {
    const response= await client.get(servicePoint_url)
    return response.data
}

export const getServicePointDetail = async (id: number) => {
    const response = await client.get(servicePoint_url + '/' + id)
    return response.data
}