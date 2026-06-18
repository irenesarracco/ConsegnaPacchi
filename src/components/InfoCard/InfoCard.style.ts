import { StyleSheet } from "react-native"

const styles= StyleSheet.create({
    card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 6,

    elevation: 2,
  },

  label: {
    fontSize: 11,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
    fontWeight: '600',
  },

  value: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '600',
  }

})


export default styles