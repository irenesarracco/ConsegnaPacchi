import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useSafeArea = () => {
  const insets = useSafeAreaInsets()
  
  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
  }
}

//non definibile custom hook
//preferibilmente usarlo nel componente