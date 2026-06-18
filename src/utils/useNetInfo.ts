import { useNetInfo } from "@react-native-community/netinfo"
import { checkRealConnectivity } from "./checkConnectivity"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setOffline } from "../store/ui/uiSlice"

export const useNetworkStatus = () => {
  const netInfo = useNetInfo()

  const isConnected = netInfo.isConnected
  const isInternetReachable = netInfo.isInternetReachable
  const connectionType = netInfo.type
  const [hasRealInternet, setHasRealInternet] = useState(true)

  const dispatch= useDispatch()


  useEffect(() => {
    const check = async () => {
      const result = await checkRealConnectivity()
      setHasRealInternet(result)

      //
      const offline= isConnected !== null && isInternetReachable !== null? !isConnected || !result : false
      dispatch(setOffline(offline))
    }
    check()
  }, [netInfo.isConnected])

  

  return {
    isConnected,
    isInternetReachable,
    connectionType,
    hasRealInternet,
    isOffline: isConnected !== null && isInternetReachable !== null ? !isConnected || !isInternetReachable: false
  }
}

export default useNetworkStatus


