import styles from "./InfoCard.style"
import { InfoCardProps } from "./InfoCard.models"
import { View, Text } from "react-native"


const InfoCard = ({ label, value }: InfoCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

export default InfoCard