import { StyleSheet } from "react-native"

const styles= StyleSheet.create({
      BottomSheetView: {
          flex: 1,
          padding: 24,
          backgroundColor:'#3b3a3a',
          opacity: 0.7
        },
        BottomShitText:{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 18
        },
        container:{ 
            padding: 20 
        },
        text:{ 
            marginBottom: 20,
            fontSize: 18
        },
        pressable:{
            backgroundColor: 'black',
            padding: 16,
            borderRadius: 8,
        },
        textPressable:{ 
            color: 'white', 
            textAlign: 'center', 
            fontSize: 18
        }


})



export default styles