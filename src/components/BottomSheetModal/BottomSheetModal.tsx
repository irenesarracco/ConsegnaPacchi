import React, { useEffect, useRef } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { clearUI } from '../../store/ui/uiSlice'
import { BottomSheetModal, BottomSheetView} from '@expo/ui/community/bottom-sheet'
import styles from './BottomSheetModal.style'


const BottomSheet = () => {
  const dispatch = useDispatch()

  const { message, type } = useSelector((state: RootState) => state.ui)

  const sheetRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (message) {
      sheetRef.current?.present()
    }
  }, [message])

  const close = () => {
    sheetRef.current?.dismiss()
    setTimeout(()=> {dispatch(clearUI()), 2000})
  }

  //sarebbe meglio un service: a run time tramite service vai a creare una nuova ref per bottomsheet

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={['50%']}
      enablePanDownToClose
    >
      <BottomSheetView
        style={styles.BottomSheetView}
      >
      <View style={styles.container}>
        
        <Text style={[styles.BottomShitText, 
          {color: type === 'error' ? 'red' : 'green'}
        ]}>
          {type === 'error' ? 'Errore' : 'Successo'}
        </Text>

        <Text style={styles.text}>
          {message}
        </Text>

        <Pressable
          onPress={close}
          style={styles.pressable}
        >
          <Text style={styles.textPressable}>
            Chiudi
          </Text>
        </Pressable>

      </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default BottomSheet