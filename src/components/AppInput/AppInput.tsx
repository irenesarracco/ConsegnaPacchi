import styles from "./AppInput.style";
import { Props } from "./AppInput.models";

import { TextInput } from 'react-native'

const AppInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#d1d5db"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default AppInput