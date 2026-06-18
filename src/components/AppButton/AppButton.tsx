import { TouchableOpacity, Text, ActivityIndicator, View} from 'react-native'
import styles from './AppButton.style'
import { Props } from './AppButton.models'

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled= false,
  flex= false
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], disabled && {opacity:0.5}, flex && { flex: 1 } ]}
      onPress={onPress}
      disabled={disabled}
    >
       {disabled ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export default AppButton