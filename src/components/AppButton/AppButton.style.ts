import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12
  },

  primary: {
    backgroundColor: '#111827',
  },

  secondary: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  success: {
    backgroundColor: '#10b981',
  },

  danger: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },

  text: {
    fontWeight: '600',
    fontSize: 15
  },

  primaryText: {
    color: '#ffffff',
  },

  secondaryText: {
    color: '#374151',
  },

  successText: {
    color: '#ffffff',
  },

  dangerText: {
    color: '#ef4444'
  },
})

export default styles