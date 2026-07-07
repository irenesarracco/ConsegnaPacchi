import { View, Text} from "react-native"
import { ErrorProps } from "./ErrorPage.models"
import AppButton from "../AppButton/AppButton"
import styles from "./ErrorPage.style"

const ErrorPage=({
    message,
    onRiprova,
    titleButton = 'Riprova'
}: ErrorProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style= {styles.message}>{message}</Text>
            {onRiprova && (
                <AppButton
                onPress={onRiprova}
                title= {titleButton}
                />
            )}
        </View>
    )
}


export default ErrorPage



//ciclo di vita di React (con relativi Hook principali (useState, useEffect, useReducer, useRef, useCallback, useMemo) e nuovi Hook (useLayoutEffect))
