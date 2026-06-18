import styles from "./AppCard.style"
import { Props } from "./AppCard.models"
import { View } from "react-native"

const AppCard = ({ children }: Props) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

export default AppCard