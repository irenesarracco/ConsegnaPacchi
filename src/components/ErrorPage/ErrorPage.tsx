import { View, Text} from "react-native"
import { ErrorProps } from "./ErrorPage.models"
import AppButton from "../AppButton/AppButton"
import styles from "./ErrorPage.style"

const ErrorPage=({
    message,
    onRiprova
}: ErrorProps) => {
    return(
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style= {styles.message}>{message}</Text>
            {onRiprova && (
                <AppButton
                onPress={onRiprova}
                title='Riprova'
                />
            )}
        </View>
    )
}


export default ErrorPage