import { useEffect, useState } from 'react'
import NetInfo, { NetInfoState } from '@react-native-community/netinfo'

export interface NetworkStatus {
  isConnected: boolean | null
  type: string
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({ isConnected: null, type: 'unknown' })

  useEffect(() => {
    const handleChange = (state: NetInfoState) => {
      setStatus({ isConnected: state.isConnected, type: state.type })
    }

    NetInfo.fetch().then(handleChange)
    const unsubscribe = NetInfo.addEventListener(handleChange)

    return () => unsubscribe()
  }, [])

  return status
}
