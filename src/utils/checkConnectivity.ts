import axios from 'axios'

export const checkRealConnectivity = async (): Promise<boolean> => {
  try {
    await axios.head('https://www.google.com', {
      timeout: 5000
    })
    console.log('Google raggiungibile')
    return true
  } catch {
    console.log('Google non raggiungibile')
    return false
  }
}